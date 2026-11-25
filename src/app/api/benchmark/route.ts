import { NextResponse } from "next/server";
import { AiConfigError, benchmarkInputSchema, runBenchmark } from "@/lib/ai";
import { checkQuota, recordUsage, requireUser } from "@/lib/usage";

export async function POST(req: Request) {
  const { supabase, user } = await requireUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  const parsed = benchmarkInputSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Check the supplier and line items.", details: parsed.error.flatten() }, { status: 400 });
  const blocked = await checkQuota(user.id, "benchmark");
  if (blocked) return NextResponse.json({ error: blocked }, { status: 402 });
  try {
    const result = await runBenchmark(parsed.data);
    const { data, error } = await supabase.from("benchmarks").insert({
      user_id: user.id, supplier: parsed.data.supplier, purchase_type: parsed.data.purchaseType,
      line_items: parsed.data.lineItems, quoted_total: result.quotedTotal, result,
    }).select("id").single();
    if (error) throw new Error(error.message);
    await recordUsage(user.id, "benchmark");
    return NextResponse.json({ id: data.id, result });
  } catch (e) {
    const status = e instanceof AiConfigError ? 503 : 502;
    return NextResponse.json({ error: e instanceof Error ? e.message : "Benchmark failed." }, { status });
  }
}
