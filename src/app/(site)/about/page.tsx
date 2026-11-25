import { PageHero } from "@/components/Page";
import { CtaBand } from "@/components/Shell";

export const metadata = { title: "About | QuoteBench" };

const VALUES = [
  ["Transparency first", "We show the math. Every estimate is labelled and every calculation can be traced."],
  ["Speed matters", "Procurement that drags on costs money. We turn a quote into a plan in minutes."],
  ["Data-driven outcomes", "Recommendations rest on your numbers and clear market ranges, not hunches."],
  ["Fair for everyone", "Good outcomes let buyers pay fair prices and suppliers close faster."],
  ["Built for teams", "Finance, IT and procurement all evaluate software. The workspace is built for all three."],
  ["Relentless craft", "Precision in every workflow, from rounding to wording."],
];

export default function About() {
  return (
    <>
      <PageHero eyebrow="About QuoteBench" title={<>Software pricing intelligence, working for the buyer</>} body="QuoteBench gives procurement, finance and IT teams the benchmarks and negotiation tools to stop overpaying for software." secondary={null} />
      <section className="mx-auto max-w-[760px] px-5 pb-20">
        <div className="eyebrow">Our story</div>
        <h2 className="h2 mt-3">Buyers deserve the same playbook suppliers have</h2>
        <p className="mt-5 text-lg leading-relaxed">Software vendors have pricing playbooks, discount matrices and years of negotiation experience. Buyers usually have a quote and a deadline. QuoteBench closes that gap by putting a benchmark, a contract review and a negotiation plan behind every purchase.</p>
        <p className="mt-4 text-lg leading-relaxed">We are an early-stage product. We would rather be precise about what the product does today than claim scale we have not earned.</p>
      </section>
      <section className="bg-soft py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="eyebrow text-center">What drives us</div><h2 className="h2 mt-3 text-center">Our values</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {VALUES.map(([t, p], i) => <div key={t} className="card p-7"><div className="text-sm text-brand">0{i + 1}</div><h3 className="mt-3 text-xl font-medium text-ink">{t}</h3><p className="mt-2 text-[15px] leading-relaxed">{p}</p></div>)}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
