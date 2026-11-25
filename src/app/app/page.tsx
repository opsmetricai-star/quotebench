import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PLANS, LIMIT_KEY, type UsageKind } from "@/lib/plans";
import { getPlanId, getUsage } from "@/lib/usage";

const money = (n: number) => `$${Math.round(n).toLocaleString()}`;

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const planId = await getPlanId(user!.id);
  const plan = PLANS[planId];
  const used = await getUsage(user!.id);
  const [{ data: benchmarks }, { data: negs }, { data: contracts }] = await Promise.all([
    supabase.from("benchmarks").select("id,supplier,quoted_total,result,created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("negotiations").select("current_price,final_price,status"),
    supabase.from("contracts").select("id,title,renewal_date,annual_value").not("renewal_date", "is", null).order("renewal_date").limit(5),
  ]);
  const identified = (benchmarks ?? []).reduce((s, b) => s + ((b.result as { potentialSavings?: number }).potentialSavings ?? 0), 0);
  const realized = (negs ?? []).filter((n) => n.status === "closed" && n.final_price).reduce((s, n) => s + (Number(n.current_price) - Number(n.final_price)), 0);
  const kinds: [UsageKind, string][] = [["benchmark", "Benchmarks"], ["contract_review", "Contract audits"], ["negotiation_plan", "Negotiation plans"]];
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3"><h1 className="text-3xl font-medium tracking-tight text-ink">Dashboard</h1>
        <Link href="/app/benchmarks" className="btn btn-dark" aria-label="New benchmark">Sign up</Link></div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card p-6"><div className="eyebrow">Savings identified (last 5)</div><div className="mt-2 text-3xl font-medium text-ink">{money(identified)}</div></div>
        <div className="card p-6"><div className="eyebrow">Savings realized</div><div className="mt-2 text-3xl font-medium text-ink">{money(realized)}</div></div>
        <div className="card p-6"><div className="eyebrow">Plan</div><div className="mt-2 text-3xl font-medium text-ink">{plan.name}</div></div>
      </div>
      <div className="card p-6">
        <div className="eyebrow mb-4">Usage this month</div>
        <div className="grid gap-5 sm:grid-cols-3">
          {kinds.map(([k, l]) => { const lim = plan[LIMIT_KEY[k]]; return (
            <div key={k}><div className="flex justify-between text-sm"><span>{l}</span><span className="text-ink">{used[k]} / {lim}</span></div>
              <div className="mt-2 h-2 rounded-full bg-soft"><div className="h-2 rounded-full bg-brand" style={{ width: `${Math.min(100, (used[k] / lim) * 100)}%` }} /></div></div>); })}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-6"><div className="eyebrow mb-3">Recent benchmarks</div>
          {(benchmarks ?? []).length === 0 ? <p className="text-sm text-muted">None yet. <Link className="text-brand" href="/app/benchmarks">Run your first.</Link></p> :
            (benchmarks ?? []).map((b) => <Link key={b.id} href={`/app/benchmarks?open=${b.id}`} className="flex justify-between border-b border-line py-2.5 text-[15px] last:border-0"><span className="text-ink">{b.supplier}</span><span>{money(Number(b.quoted_total))}</span></Link>)}</div>
        <div className="card p-6"><div className="eyebrow mb-3">Upcoming renewals</div>
          {(contracts ?? []).length === 0 ? <p className="text-sm text-muted">Review a contract to populate renewals.</p> :
            (contracts ?? []).map((c) => <div key={c.id} className="flex justify-between border-b border-line py-2.5 text-[15px] last:border-0"><span className="text-ink">{c.title}</span><span>{c.renewal_date}</span></div>)}</div>
      </div>
    </div>
  );
}
