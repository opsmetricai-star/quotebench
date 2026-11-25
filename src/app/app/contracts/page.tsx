import { ContractTool } from "@/components/ContractTool";
import type { ContractReview } from "@/lib/ai";
import { createClient } from "@/lib/supabase/server";

const sev = { high: "bg-red-50 text-red-700", medium: "bg-amber-50 text-amber-700", low: "bg-soft text-muted" } as const;

export default async function Contracts() {
  const supabase = await createClient();
  const { data } = await supabase.from("contracts").select("id,title,supplier,renewal_date,annual_value,review,created_at").order("created_at", { ascending: false }).limit(20);
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-medium tracking-tight text-ink">Contracts</h1>
      <ContractTool />
      {(data ?? []).map((c) => {
        const r = c.review as ContractReview | null;
        return (
          <details key={c.id} className="card p-6" open={data?.[0]?.id === c.id}>
            <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-2 text-lg font-medium text-ink">
              <span>{c.title}</span><span className="text-sm font-normal text-muted">{c.renewal_date ? `Renews ${c.renewal_date}` : "No renewal date found"}</span>
            </summary>
            {r && (<div className="mt-4 space-y-4">
              <p>{r.summary}</p>
              <div className="grid gap-3 text-sm sm:grid-cols-3">
                <div className="rounded-xl bg-soft p-3">Auto-renews: <b className="text-ink">{r.autoRenews === null ? "unknown" : r.autoRenews ? "yes" : "no"}</b></div>
                <div className="rounded-xl bg-soft p-3">Notice: <b className="text-ink">{r.noticePeriodDays ?? "unknown"} days</b></div>
                <div className="rounded-xl bg-soft p-3">Annual value: <b className="text-ink">{r.annualValue ? `$${r.annualValue.toLocaleString()}` : "unknown"}</b></div>
              </div>
              {r.risks.map((k, i) => (<div key={i} className="flex gap-3 border-t border-line pt-3"><span className={`h-fit rounded-full px-2 py-0.5 text-[11px] font-medium ${sev[k.severity]}`}>{k.severity}</span>
                <div><div className="font-medium text-ink">{k.title}</div><div className="text-[15px]">{k.detail}</div>{k.clause && <blockquote className="mt-1 border-l-2 border-line pl-3 text-sm italic text-muted">{k.clause}</blockquote>}</div></div>))}
              {r.negotiables.length > 0 && <div><div className="eyebrow mb-1">Worth negotiating</div><ul className="list-disc pl-5">{r.negotiables.map((n) => <li key={n}>{n}</li>)}</ul></div>}
            </div>)}
          </details>
        );
      })}
    </div>
  );
}
