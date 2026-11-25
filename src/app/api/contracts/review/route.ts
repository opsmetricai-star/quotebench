import { NextResponse } from "next/server";
import { AiConfigError, reviewContract } from "@/lib/ai";
import { checkQuota, recordUsage, requireUser } from "@/lib/usage";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { supabase, user } = await requireUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  const form = await req.formData().catch(() => null);
  const title = String(form?.get("title") ?? "").trim();
  const pasted = String(form?.get("text") ?? "").trim();
  const file = form?.get("file");
  if (!title) return NextResponse.json({ error: "Give the contract a title." }, { status: 400 });

  let text = pasted;
  let filePath: string | null = null;
  if (file instanceof File && file.size > 0) {
    if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "File is larger than 5 MB." }, { status: 400 });
    filePath = `${user.id}/${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
    const up = await supabase.storage.from("contracts").upload(filePath, file, { contentType: file.type || "application/octet-stream" });
    if (up.error) return NextResponse.json({ error: `Upload failed: ${up.error.message}` }, { status: 500 });
    // Text extraction is supported for plain-text files. PDF/DOCX are stored but need pasted text.
    if (!text && (file.type.startsWith("text/") || /\.(txt|md)$/i.test(file.name))) text = await file.text();
  }
  if (text.length < 200) {
    return NextResponse.json({ error: "Paste the contract text (or upload a .txt file). PDF text extraction is not supported yet." }, { status: 400 });
  }
  const blocked = await checkQuota(user.id, "contract_review");
  if (blocked) return NextResponse.json({ error: blocked }, { status: 402 });
  try {
    const review = await reviewContract(text);
    const { data, error } = await supabase.from("contracts").insert({
      user_id: user.id, title, supplier: review.supplier, file_path: filePath, contract_text: text.slice(0, 100_000),
      review, renewal_date: review.renewalDate && /^\d{4}-\d{2}-\d{2}$/.test(review.renewalDate) ? review.renewalDate : null,
      annual_value: review.annualValue,
    }).select("id").single();
    if (error) throw new Error(error.message);
    await recordUsage(user.id, "contract_review");
    return NextResponse.json({ id: data.id, review });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Audit failed." }, { status: e instanceof AiConfigError ? 503 : 502 });
  }
}
