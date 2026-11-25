import { PageHero } from "@/components/Page";
import { CtaBand } from "@/components/Shell";

export const metadata = { title: "About | QuoteBench" };

const VALUES = [
  ["Evidence over leverage", "Every recommendation shows its math, its assumptions and its confidence."],
  ["Speed as an advantage", "Renewals are won in the weeks before the deadline. The AI compresses analysis from days to minutes."],
  ["Outcomes you can measure", "Each negotiation is tracked to a recorded final price, so savings are reported, not estimated."],
  ["Fair markets", "Informed buyers and willing suppliers close better deals faster."],
  ["Built for cross-functional teams", "Procurement, finance and IT all evaluate software. The workspace serves all three."],
  ["Precision in the details", "From rounding to wording, accuracy is part of the product."],
];

export default function About() {
  return (
    <>
      <PageHero eyebrow="About QuoteBench" title="We build the AI that gives software buyers the upper hand." body="QuoteBench equips procurement, finance and IT teams with the benchmarks, contract intelligence and negotiation planning to stop overpaying for software." />
      <section className="mx-auto max-w-[760px] px-5 pb-20">
        <div className="eyebrow">Our mission</div>
        <h2 className="h2 mt-3">Buyers deserve the same playbook suppliers have</h2>
        <p className="mt-5 text-lg leading-relaxed">Software suppliers negotiate with pricing playbooks, discount matrices and years of deal experience. Most buyers arrive with a quote and a deadline. That asymmetry costs businesses millions in avoidable spend.</p>
        <p className="mt-4 text-lg leading-relaxed">QuoteBench closes the gap with an AI agent that benchmarks each quote, audits each contract and prepares each negotiation, turning software buying from a negotiation of instinct into one of evidence.</p>
      </section>
      <section className="bg-soft py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="eyebrow text-center">Principles</div><h2 className="h2 mt-3 text-center">What we hold ourselves to</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {VALUES.map(([t, p], i) => <div key={t} className="card p-7"><div className="text-sm text-brand">0{i + 1}</div><h3 className="mt-3 text-xl font-medium text-ink">{t}</h3><p className="mt-2 text-[15px] leading-relaxed">{p}</p></div>)}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
