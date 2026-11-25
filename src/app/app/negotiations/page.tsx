import { NegotiationTool, StatusControl } from "@/components/NegotiationTool";
import { createClient } from "@/lib/supabase/server";

type Plan = { strategy: string; steps: { title: string; detail: string }[]; concessionsToAsk: string[]; fallback: string; emailDraft: { subject: string; body: string } };

export default async function Negotiations({ searchParams }: { searchParams: Promise<{ benchmark?: string }> }) {
  const { benchmark } = await searchParams;
  const supabase = await createClient();
  let pre: { supplier: string; current: number; target: number } | null = null;
  if (benchmark && /^[0-9a-f-]{36}$/.test(benchmark)) {
    const { data } = await supabase.from("benchmarks").select("supplier,quoted_total,result").eq("id", benchmark).maybeSingle();
    if (data) pre = { supplier: data.supplier, current: Number(data.quoted_total), target: (data.result as { targetTotal: number }).targetTotal };
  }
  const { data } = await supabase.from("negotiations").select("*").order("created_at", { ascending: false });
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-medium tracking-tight text-ink">Negotiations</h1>
      <NegotiationTool benchmarkId={pre ? benchmark : undefined} supplier={pre?.supplier} current={pre?.current} target={pre?.target} />
      {(data ?? []).map((n) => {
        const p = n.plan as Plan;
        return (
          <details key={n.id} className="card p-6">
            <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-3">
              <span className="text-lg font-medium text-ink">{n.supplier} <span className="text-sm font-normal text-muted">${Math.round(n.current_price).toLocaleString()} → ${Math.round(n.target_price).toLocaleString()}{n.final_price ? ` · closed at $${Math.round(n.final_price).toLocaleString()}` : ""}</span></span>
            </summary>
            <div className="mt-4 space-y-4">
              <StatusControl id={n.id} status={n.status} current={n.current_price} />
              <p>{p.strategy}</p>
              <ol className="list-decimal space-y-2 pl-5">{p.steps.map((s) => <li key={s.title}><b className="text-ink">{s.title}.</b> {s.detail}</li>)}</ol>
              {p.concessionsToAsk.length > 0 && <div><div className="eyebrow mb-1">Also ask for</div><ul className="list-disc pl-5">{p.concessionsToAsk.map((c) => <li key={c}>{c}</li>)}</ul></div>}
              <p><b className="text-ink">If they hold:</b> {p.fallback}</p>
              <div className="rounded-xl bg-soft p-4 text-[15px]"><div className="font-medium text-ink">Subject: {p.emailDraft.subject}</div><pre className="mt-2 whitespace-pre-wrap font-sans">{p.emailDraft.body}</pre></div>
            </div>
          </details>
        );
      })}
    </div>
  );
}
