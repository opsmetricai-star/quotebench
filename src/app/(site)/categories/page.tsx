import Link from "next/link";
import { PageHero } from "@/components/Page";
import { SUPPLIERS } from "@/lib/suppliers";
import { slugify } from "@/lib/content";

export const metadata = { title: "Categories | QuoteBench" };

export default function Categories() {
  const cats = [...new Set(SUPPLIERS.map((s) => s[1]))].sort();
  return (
    <>
      <PageHero eyebrow="Categories" title="Browse software by category" cta={false} />
      <section className="mx-auto grid max-w-[1200px] gap-5 px-5 pb-24 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map((c) => {
          const items = SUPPLIERS.filter((s) => s[1] === c).map((s) => s[0]);
          return (
            <Link key={c} href={`/categories/${slugify(c)}`} className="card p-7 transition hover:border-brand">
              <h2 className="text-xl font-medium text-ink">{c}</h2>
              <p className="mt-2 text-[15px]">{items.join(", ")}</p>
            </Link>
          );
        })}
      </section>
    </>
  );
}
