import { PageHero } from "@/components/Page";
import { CtaBand } from "@/components/Shell";

export const metadata = { title: "Guide: getting results from Quinn | QuoteBench" };

export default function Enablement() {
  return (
    <>
      <PageHero eyebrow="Guide" title="Get the most accurate output from Quinn." body="How to structure a quote, what the trial covers and how contract audits work." />
      <section className="mx-auto max-w-[860px] space-y-14 px-5 pb-24">
        <div><div className="eyebrow">Trial</div><h2 className="h2 mt-3">What the trial includes</h2>
          <p className="mt-4 text-lg leading-relaxed">Each account can benchmark five suppliers, audit one contract and build one negotiation plan every month. Benchmarks use your own seat counts, product mix and term, combining exact arithmetic with an AI market estimate.</p></div>
        <div><div className="eyebrow">Input</div><h2 className="h2 mt-3">What to enter for a benchmark</h2>
          <p className="mt-4 text-lg leading-relaxed">Accuracy rises with completeness. Enter every SKU with its quantity and quoted annual unit price, the term length and whether the deal is new or a renewal. Add notes on competitors or deadlines to sharpen the leverage analysis.</p>
          <div className="card mt-6 p-6"><div className="eyebrow">Example</div><p className="mt-3 font-mono text-sm leading-relaxed text-ink">Supplier: Datadog, renewal, 12 months<br />Infrastructure Pro: 120 hosts at $276 each<br />Log Management: 40 units at $1,200 each<br />Notes: evaluating a competitor</p></div></div>
        <div><div className="eyebrow">Confidence</div><h2 className="h2 mt-3">Reading the confidence rating</h2>
          <p className="mt-4 text-lg leading-relaxed">Quinn is strongest on widely deployed products with well-documented pricing. When a supplier is niche, the confidence rating drops to low. Treat low-confidence results as a starting position and confirm with a competing quote.</p></div>
        <div><div className="eyebrow">Contracts</div><h2 className="h2 mt-3">Auditing a contract</h2>
          <p className="mt-4 text-lg leading-relaxed">Paste the contract text, or upload a plain-text file, and Quinn extracts the renewal date, notice period and annual value, then ranks each risk by severity with the supporting clause. PDF and Word files can be stored with the audit; paste their text for analysis.</p></div>
      </section>
      <CtaBand />
    </>
  );
}
