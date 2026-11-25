import { PageHero } from "@/components/Page";
import { CtaBand } from "@/components/Shell";

export const metadata = { title: "Enablement — Quinn trial guide | QuoteBench" };

export default function Enablement() {
  return (
    <>
      <PageHero eyebrow="Quinn enablement" title="Trial guide for Quinn, your AI pricing agent." primary={["Start the trial", "/signup"]} secondary={null} />
      <section className="mx-auto max-w-[860px] space-y-14 px-5 pb-24">
        <div><div className="eyebrow">Trial overview</div><h2 className="h2 mt-3">What is included in the trial?</h2>
          <p className="mt-4 text-lg leading-relaxed">Each account can benchmark up to five suppliers, review one contract and build one negotiation plan each month. Benchmarks use your own seat counts, product mix and term, and combine exact arithmetic with an AI market estimate.</p></div>
        <div><div className="eyebrow">Prompting</div><h2 className="h2 mt-3">What should I enter?</h2>
          <p className="mt-4 text-lg leading-relaxed">The more complete the line items, the better the benchmark. Include every SKU, its quantity and its quoted annual unit price, plus the term length and whether it is a new purchase or a renewal.</p>
          <div className="card mt-6 p-6"><div className="eyebrow">Example</div><p className="mt-3 font-mono text-sm leading-relaxed text-ink">Supplier: Datadog · Renewal · 12 months<br />Infrastructure Pro / 120 hosts / $276 each<br />Log Management / 40 units / $1,200 each<br />Notes: considering a switch to a competitor</p></div></div>
        <div><div className="eyebrow">Coverage</div><h2 className="h2 mt-3">Which suppliers work best?</h2>
          <p className="mt-4 text-lg leading-relaxed">Quinn is strongest on widely used products where public pricing is well documented. For niche suppliers, confidence will be shown as low. Treat low-confidence results as a starting point and verify with a competing quote.</p></div>
        <div><div className="eyebrow">Contracts</div><h2 className="h2 mt-3">Reviewing a contract</h2>
          <p className="mt-4 text-lg leading-relaxed">Upload the file for safekeeping and paste the contract text for analysis. Plain-text uploads are read automatically; PDF text extraction is not supported yet. Quinn flags risks with severity and quotes the relevant clause.</p></div>
      </section>
      <CtaBand />
    </>
  );
}
