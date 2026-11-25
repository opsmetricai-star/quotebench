import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/Shell";
import { PageHero } from "@/components/Page";
import { Check } from "@/components/Icons";
import { CATEGORY_INFO, slugify, supplierBySlug } from "@/lib/content";
import { SUPPLIERS } from "@/lib/suppliers";

export function generateStaticParams() { return SUPPLIERS.map(([n]) => ({ slug: slugify(n) })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = supplierBySlug(slug);
  return { title: s ? `${s.name} pricing and negotiation | QuoteBench` : "Marketplace | QuoteBench" };
}

export default async function Supplier({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = supplierBySlug(slug);
  if (!s) notFound();
  const info = CATEGORY_INFO[s.category];
  const peers = SUPPLIERS.filter(([n, c]) => c === s.category && n !== s.name);
  return (
    <>
      <PageHero eyebrow={s.category} title={`Benchmark and negotiate your ${s.name} contract`} body={s.blurb} />
      <section className="mx-auto grid max-w-[1000px] gap-6 px-5 pb-20 md:grid-cols-2">
        <div className="card p-8">
          <div className="eyebrow">What Quinn analyzes</div>
          <p className="mt-3 text-[15px] leading-relaxed">{s.category} contracts are typically priced on {info.measures}. Enter each line item and Quinn returns a blended unit price, an estimated market range and the savings gap in dollars.</p>
        </div>
        <div className="card p-8">
          <div className="eyebrow">Levers to test in {s.category} deals</div>
          <ul className="mt-3 space-y-2.5">{info.levers.map((l) => <li key={l} className="flex gap-2.5 text-[15px] text-ink"><Check />{l}</li>)}</ul>
        </div>
      </section>
      <section className="mx-auto max-w-[1000px] px-5 pb-24">
        <p className="rounded-2xl bg-soft p-6 text-[15px] leading-relaxed">General buying guidance for the category. Quinn tailors the analysis to the quote you enter, and every benchmark is an AI estimate with a confidence rating, not verified transaction data.</p>
        {peers.length > 0 && (
          <div className="mt-12">
            <div className="eyebrow mb-4">Related {s.category} suppliers</div>
            <div className="flex flex-wrap gap-3">{peers.map(([n]) => <Link key={n} href={`/marketplace/${slugify(n)}`} className="rounded-full border border-line px-4 py-2 text-sm text-ink hover:border-brand">{n}</Link>)}</div>
          </div>
        )}
      </section>
      <CtaBand />
    </>
  );
}
