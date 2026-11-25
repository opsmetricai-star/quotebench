import { PageHero } from "@/components/Page";

export const metadata = { title: "Blog | QuoteBench" };

const POSTS = [
  ["Negotiation", "Six levers that move a SaaS renewal", "Term length, timing, seat true-ups and four more levers worth testing before you accept an uplift."],
  ["Contracts", "The auto-renewal clause checklist", "What to look for in notice periods, uplift caps and termination language."],
  ["Benchmarking", "How to read a price benchmark", "Why blended unit price beats list price, and what a confidence rating really tells you."],
  ["Finance", "Building a renewal calendar that works", "Ninety days is the minimum. Here is a lightweight process."],
];

export default function Blog() {
  return (
    <>
      <PageHero eyebrow="Blog" title="Practical writing on software buying" primary={null} secondary={null} />
      <section className="mx-auto grid max-w-[1000px] gap-5 px-5 pb-24 md:grid-cols-2">
        {POSTS.map(([t, h, p]) => (
          <article key={h} className="card p-7"><div className="eyebrow">{t}</div><h2 className="mt-3 text-xl font-medium text-ink">{h}</h2><p className="mt-2 text-[15px] leading-relaxed">{p}</p><p className="mt-4 text-xs text-muted">Article coming soon</p></article>
        ))}
      </section>
    </>
  );
}
