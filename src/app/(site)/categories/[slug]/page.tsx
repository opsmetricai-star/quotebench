import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/Shell";
import { PageHero } from "@/components/Page";
import { Check } from "@/components/Icons";
import { CATEGORIES, CATEGORY_INFO, slugify } from "@/lib/content";
import { SUPPLIERS } from "@/lib/suppliers";

export function generateStaticParams() { return CATEGORIES.map((c) => ({ slug: slugify(c) })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = CATEGORIES.find((x) => slugify(x) === slug);
  return { title: `${c ?? "Category"} software pricing | QuoteBench` };
}

export default async function Category({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = CATEGORIES.find((x) => slugify(x) === slug);
  if (!cat) notFound();
  const info = CATEGORY_INFO[cat];
  const list = SUPPLIERS.filter((s) => s[1] === cat);
  return (
    <>
      <PageHero eyebrow="Category" title={`${cat} software: price it before you sign it`} body={`${cat} contracts are typically priced on ${info.measures}.`} />
      <section className="mx-auto grid max-w-[1000px] gap-6 px-5 pb-20 md:grid-cols-2">
        <div className="card p-8"><div className="eyebrow">Levers to test</div>
          <ul className="mt-3 space-y-2.5">{info.levers.map((l) => <li key={l} className="flex gap-2.5 text-[15px] text-ink"><Check />{l}</li>)}</ul></div>
        <div className="card p-8"><div className="eyebrow">Suppliers in this category</div>
          <div className="mt-3 space-y-2">{list.map(([n, , d]) => <Link key={n} href={`/marketplace/${slugify(n)}`} className="block rounded-xl border border-line p-4 hover:border-brand"><div className="font-medium text-ink">{n}</div><div className="text-sm text-muted">{d}</div></Link>)}</div></div>
      </section>
      <CtaBand />
    </>
  );
}
