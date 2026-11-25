import { notFound } from "next/navigation";
import { CtaBand } from "@/components/Shell";
import { PageHero } from "@/components/Page";
import { Check } from "@/components/Icons";
import { Faq } from "@/components/Sections";
import { HOME_FAQ, SOLUTIONS } from "@/lib/content";

export function generateStaticParams() { return Object.keys(SOLUTIONS).map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: `${SOLUTIONS[slug]?.name ?? "Solutions"} | QuoteBench` };
}

export default async function Solution({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SOLUTIONS[slug];
  if (!s) notFound();
  return (
    <>
      <PageHero eyebrow={`Solution for ${s.name}`} title={s.headline} body={s.lead} />
      <section className="bg-soft py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="mb-12 text-center"><div className="eyebrow">The problem</div><h2 className="h2 mt-3">What costs {s.name.toLowerCase()} teams money</h2></div>
          <div className="grid gap-5 md:grid-cols-3">
            {s.pains.map(([t, p]) => <div key={t} className="card p-7"><h3 className="text-xl font-medium text-ink">{t}</h3><p className="mt-2 text-[15px] leading-relaxed">{p}</p></div>)}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1000px] px-5 py-24">
        <div className="mb-10 text-center"><div className="eyebrow">The workflow</div><h2 className="h2 mt-3">How Quinn works for {s.name.toLowerCase()}</h2></div>
        <div className="space-y-4">
          {s.flows.map(([t, p]) => (
            <div key={t} className="card flex gap-4 p-6"><Check /><div><h3 className="text-lg font-medium text-ink">{t}</h3><p className="mt-1 text-[15px]">{p}</p></div></div>
          ))}
        </div>
      </section>
      <Faq items={HOME_FAQ.slice(0, 4)} />
      <CtaBand />
    </>
  );
}
