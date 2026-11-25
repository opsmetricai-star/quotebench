import { PageHero } from "@/components/Page";

export const metadata = { title: "Buyer guides | QuoteBench" };

const G = ["CRM buyer guide", "Security tools buyer guide", "Collaboration software buyer guide", "Observability buyer guide", "Design tools buyer guide", "HR software buyer guide"];

export default function Guides() {
  return (
    <>
      <PageHero eyebrow="Buyer guides" title="Know what to ask before you buy" primary={null} secondary={null} />
      <section className="mx-auto grid max-w-[1000px] gap-5 px-5 pb-24 sm:grid-cols-2 md:grid-cols-3">
        {G.map((g) => <div key={g} className="card p-7"><h2 className="text-lg font-medium text-ink">{g}</h2><p className="mt-3 text-xs text-muted">Coming soon</p></div>)}
      </section>
    </>
  );
}
