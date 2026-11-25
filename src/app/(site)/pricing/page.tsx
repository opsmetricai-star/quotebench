import Link from "next/link";
import { PageHero } from "@/components/Page";
import { CtaBand } from "@/components/Shell";
import { PLANS } from "@/lib/plans";

export const metadata = { title: "Pricing | QuoteBench" };

const FAQ = [
  ["How does payment work?", "Checkout happens on Selar. After you pay, an administrator verifies the payment and activates your plan, usually within one business day. Returning from checkout alone does not unlock anything."],
  ["Can I change plans?", "Yes. Buy the other plan on Selar and send us the order reference; we switch your account."],
  ["Are the benchmarks verified transaction data?", "No. They are AI-generated market estimates, clearly labelled, combined with exact math on your own numbers."],
  ["What happens when I hit a limit?", "The action is blocked until next month or until you upgrade. Nothing is billed automatically."],
];

export default function Pricing() {
  return (
    <>
      <PageHero eyebrow="Pricing" title="Simple plans that pay for themselves" body="Start free on the trial. Upgrade when you are buying software every month." primary={null} secondary={null} />
      <section className="mx-auto grid max-w-[1100px] gap-6 px-5 pb-20 md:grid-cols-3">
        {Object.values(PLANS).map((p) => (
          <div key={p.id} className={`card flex flex-col p-8 ${p.id === "plan47" ? "!border-brand ring-2 ring-brand/20" : ""}`}>
            <div className="eyebrow">{p.name}</div>
            <div className="mt-4 text-5xl font-medium tracking-tight text-ink">{p.price === 0 ? "Free" : `$${p.price}`}{p.price > 0 && <span className="text-base font-normal text-muted"> / mo</span>}</div>
            <p className="mt-3 text-[15px]">{p.blurb}</p>
            <ul className="mt-6 flex-1 space-y-2.5">{p.features.map((f) => <li key={f} className="flex gap-2.5 text-[15px] text-ink"><span className="text-brand">✓</span>{f}</li>)}</ul>
            {p.checkoutUrl ? (
              <a href={p.checkoutUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-8 justify-center">Buy {p.name}</a>
            ) : (
              <Link href="/signup" className="btn btn-line mt-8 justify-center">Start free trial</Link>
            )}
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-[760px] px-5 pb-24">
        <h2 className="h2 mb-8 text-center">Questions</h2>
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
