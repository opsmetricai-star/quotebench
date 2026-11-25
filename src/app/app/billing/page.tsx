import { Check } from "@/components/Icons";
import { createAdminClient } from "@/lib/supabase/admin";
import { LIMIT_KEY, PLANS, type UsageKind } from "@/lib/plans";
import { createClient } from "@/lib/supabase/server";
import { getPlanId, getUsage } from "@/lib/usage";

export default async function Billing({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const { plan: want } = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const planId = await getPlanId(user!.id);
  const plan = PLANS[planId];
  const used = await getUsage(user!.id);
  const { data: sub } = await createAdminClient().from("subscriptions").select("status,current_period_end,payment_reference").eq("user_id", user!.id).maybeSingle();
  const kinds: [UsageKind, string][] = [["benchmark", "Benchmarks"], ["contract_review", "Contract audits"], ["negotiation_plan", "Negotiation plans"]];
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-medium tracking-tight text-ink">Billing</h1>
      <div className="card p-6">
        <div className="eyebrow">Current plan</div>
        <div className="mt-2 text-3xl font-medium text-ink">{plan.name}{plan.price > 0 && <span className="text-base font-normal text-muted"> · ${plan.price}/mo</span>}</div>
        {sub?.current_period_end && <p className="mt-2 text-sm">Paid through {new Date(sub.current_period_end).toLocaleDateString()}</p>}
        <div className="mt-5 grid gap-2 sm:grid-cols-3">{kinds.map(([k, l]) => <div key={k} className="rounded-xl bg-soft p-3 text-sm">{l}: <b className="text-ink">{used[k]} / {plan[LIMIT_KEY[k]]}</b></div>)}</div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {([PLANS.plan47, PLANS.plan97]).map((p) => (
          <div key={p.id} className={`card flex flex-col p-6 ${want === p.id ? "!border-brand ring-2 ring-brand/20" : ""}`}>
            <div className="eyebrow">{p.name}</div><div className="mt-2 text-3xl font-medium text-ink">${p.price}<span className="text-base font-normal text-muted"> / mo</span></div>
            <ul className="mt-4 flex-1 space-y-1.5 text-[15px]">{p.features.map((f) => <li key={f} className="flex gap-2"><Check />{f}</li>)}</ul>
            {planId === p.id ? <div className="mt-5 text-sm text-brand">Your current plan</div> :
              <a href={p.checkoutUrl!} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-5 justify-center"><span aria-hidden>Sign up</span><span className="sr-only">{planId === "trial" ? "Upgrade" : "Switch"} to {p.name} on Selar</span></a>}
          </div>
        ))}
      </div>
      <div className="card p-6 text-[15px] leading-relaxed">
        <div className="eyebrow mb-2">How activation works</div>
        Pay on Selar using the <b className="text-ink">same email as your QuoteBench account</b>. An administrator verifies the payment and activates your plan, normally within one business day. Coming back from checkout does not change your plan by itself. Your plan and limits update on this page as soon as it is verified.
      </div>
    </div>
  );
}
