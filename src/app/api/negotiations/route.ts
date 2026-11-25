import { NextResponse } from "next/server";
import { z } from "zod";
import { AiConfigError, buildNegotiationPlan } from "@/lib/ai";
import { checkQuota, recordUsage, requireUser } from "@/lib/usage";

const body = z.object({
  benchmarkId: z.string().uuid().optional(),
  supplier: z.string().min(1).max(120),
  currentPrice: z.number().positive(),
  targetPrice: z.number().positive(),
  context: z.string().max(1000).optional(),
});

export async function POST(req: Request) {
  const { supabase, user } = await requireUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  const blocked = await checkQuota(user.id, "negotiation_plan");
  if (blocked) return NextResponse.json({ error: blocked }, { status: 402 });
  let leverage: string[] = [];
  if (parsed.data.benchmarkId) {
    const { data } = await supabase.from("benchmarks").select("result").eq("id", parsed.data.benchmarkId).maybeSingle();
    leverage = (data?.result as { leverage?: string[] } | null)?.leverage ?? [];
  }
  try {
    const plan = await buildNegotiationPlan({ ...parsed.data, leverage });
    const { data, error } = await supabase.from("negotiations").insert({
      user_id: user.id, benchmark_id: parsed.data.benchmarkId ?? null, supplier: parsed.data.supplier,
      current_price: parsed.data.currentPrice, target_price: parsed.data.targetPrice, plan,
    }).select("id").single();
    if (error) throw new Error(error.message);
    await recordUsage(user.id, "negotiation_plan");
    return NextResponse.json({ id: data.id, plan });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Plan failed." }, { status: e instanceof AiConfigError ? 503 : 502 });
  }
}

export async function PATCH(req: Request) {
  const { supabase, user } = await requireUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  const p = z.object({ id: z.string().uuid(), status: z.enum(["draft", "approved", "in_progress", "closed"]), finalPrice: z.number().positive().optional() })
    .safeParse(await req.json().catch(() => null));
  if (!p.success) return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  const { error } = await supabase.from("negotiations").update({ status: p.data.status, final_price: p.data.finalPrice ?? null }).eq("id", p.data.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
