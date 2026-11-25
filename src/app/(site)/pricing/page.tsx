import Link from "next/link";
import { PageHero } from "@/components/Page";
import { Check } from "@/components/Icons";
import { CtaBand } from "@/components/Shell";
import { PLANS } from "@/lib/plans";

export const metadata = { title: "Pricing | QuoteBench" };

const FAQ = [
  ["How does payment work?", "Create an account, then pay for your plan through the secure Selar checkout on the Billing page. Use the same email as your QuoteBench account. Your plan is activated once the payment is verified, normally within one business day. Returning from checkout alone does not unlock a plan."],
  ["Can I change plans?", "Yes. Purchase the other plan from the Billing page and your account is switched once the payment is verified."],
  ["Are benchmarks verified transaction data?", "No. Benchmarks combine exact arithmetic on your own numbers with an AI market estimate, and every result carries a confidence rating and a clear label."],
  ["What happens when I reach a limit?", "The action pauses until the next month or until you move to a higher plan. Nothing is charged automatically."],
];

export default function Pricing() {
  return (
    <>
      <PageHero eyebrow="Pricing" title="One negotiated renewal covers the year" body="Start on the trial, then move to a plan sized to your software spend." cta={false} />
      <section className="mx-auto grid max-w-[1100px] gap-6 px-5 pb-20 md:grid-cols-3">
        {Object.values(PLANS).map((p) => (
          <div key={p.id} className={`card flex flex-col p-8 ${p.id === "plan47" ? "!border-brand ring-2 ring-brand/20" : ""}`}>
            <div className="eyebrow">{p.name}</div>
            <div className="mt-4 text-5xl font-medium tracking-tight text-ink">{p.price === 0 ? "Free" : `$${p.price}`}{p.price > 0 && <span className="text-base font-normal text-muted"> / month</span>}</div>
            <p className="mt-3 text-[15px]">{p.blurb}</p>
            <ul className="mt-6 flex-1 space-y-2.5">{p.features.map((f) => <li key={f} className="flex gap-2.5 text-[15px] text-ink"><Check />{f}</li>)}</ul>
            <Link href={p.id === "trial" ? "/signup" : `/signup?plan=${p.id}`} className={`btn mt-8 justify-center ${p.id === "plan47" ? "btn-dark" : "btn-line"}`}>Sign up</Link>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-[760px] px-5 pb-24">
        <h2 className="h2 mb-8 text-center">Billing questions</h2>
        {FAQ.map(([q, a]) => (
          <details key={q} className="group border-b border-line py-5">
            <summary className="cursor-pointer list-none text-lg font-medium text-ink">{q}</summary>
            <p className="mt-3 leading-relaxed">{a}</p>
          </details>
        ))}
      </section>
      <CtaBand />
    </>
  );
}
