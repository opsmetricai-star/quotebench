import Link from "next/link";
import { COMPARE, STEPS, USE_CASES } from "@/lib/content";
import { Check } from "./Icons";

export function Steps() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-24">
      <div className="mb-14 text-center">
        <div className="eyebrow">How it works</div>
        <h2 className="h2 mt-3">From quote to closed deal in five steps</h2>
      </div>
      <ol className="grid gap-5 md:grid-cols-5">
        {STEPS.map(([t, p], i) => (
          <li key={t} className="card p-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">{i + 1}</div>
            <h3 className="mt-4 text-lg font-medium leading-snug text-ink">{t}</h3>
            <p className="mt-2 text-[15px] leading-relaxed">{p}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function UseCases() {
  return (
    <section className="bg-soft py-24">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="mb-12 text-center">
          <div className="eyebrow">Use cases</div>
          <h2 className="h2 mt-3">One engine for every software buying decision</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map(([t, p]) => (
            <div key={t} className="card p-7">
              <h3 className="text-xl font-medium text-ink">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Compare() {
  return (
    <section className="mx-auto max-w-[1000px] px-5 py-24">
      <div className="mb-10 text-center">
        <div className="eyebrow">The difference</div>
        <h2 className="h2 mt-3">Buying with an AI engine, and without</h2>
      </div>
      <div className="overflow-hidden rounded-2xl border border-line">
        <div className="grid grid-cols-[1fr_1fr_1.2fr] bg-soft text-xs font-semibold uppercase tracking-wider text-muted">
          <div className="p-4" /> <div className="p-4">Without</div> <div className="p-4 text-brand">With QuoteBench</div>
        </div>
        {COMPARE.map(([k, a, b]) => (
          <div key={k} className="grid grid-cols-[1fr_1fr_1.2fr] border-t border-line text-[15px]">
            <div className="p-4 font-medium text-ink">{k}</div>
            <div className="p-4 text-muted">{a}</div>
            <div className="flex gap-2 p-4 text-ink"><Check />{b}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Faq({ items, title = "Frequently asked questions" }: { items: string[][]; title?: string }) {
  return (
    <section className="mx-auto max-w-[760px] px-5 py-24">
      <h2 className="h2 mb-8 text-center">{title}</h2>
      {items.map(([q, a]) => (
        <details key={q} className="border-b border-line py-5">
          <summary className="cursor-pointer list-none text-lg font-medium text-ink">{q}</summary>
          <p className="mt-3 leading-relaxed">{a}</p>
        </details>
      ))}
    </section>
  );
}

export function SolutionsTeaser() {
  const items = [
    ["Procurement", "/solutions/procurement", "Challenge every renewal, not only the largest."],
    ["Finance", "/solutions/finance", "Forecast spend and report savings you can audit."],
    ["IT and operations", "/solutions/it", "Buy fast, price right and read the contract."],
  ];
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-24">
      <div className="mb-12 text-center">
        <div className="eyebrow">Solutions</div>
        <h2 className="h2 mt-3">Built for each team that owns software spend</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {items.map(([t, h, p]) => (
          <Link key={t} href={h} className="card group p-8 transition hover:-translate-y-0.5 hover:border-brand">
            <h3 className="text-2xl font-medium text-ink">{t}</h3>
            <p className="mt-3 text-[15px] leading-relaxed">{p}</p>
            <div className="mt-5 text-sm font-medium text-brand">See the {t} solution</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
