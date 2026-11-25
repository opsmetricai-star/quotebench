"use client";
import Link from "next/link";
import { useState } from "react";
import { SUPPLIERS } from "@/lib/suppliers";

export function Marketplace() {
  const [q, setQ] = useState("");
  const list = SUPPLIERS.filter(([n, c]) => (n + c).toLowerCase().includes(q.toLowerCase()));
  return (
    <section className="mx-auto max-w-[1200px] px-5 pb-24">
      <div className="mx-auto mb-12 max-w-[560px]">
        <input className="input !rounded-full !py-3.5 !px-6" placeholder="Search suppliers or categories" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search marketplace" />
      </div>
      <div className="eyebrow mb-5">Popular suppliers</div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map(([n, c, d]) => (
          <Link key={n} href={`/signup`} className="card group p-6 transition hover:-translate-y-0.5 hover:border-brand">
            <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f4effc] font-semibold text-brand">{n[0]}</span>
              <div><div className="font-medium text-ink">{n}</div><div className="text-xs text-muted">{c}</div></div></div>
            <p className="mt-4 text-[15px] leading-relaxed">{d}</p>
            <div className="mt-4 text-sm font-medium text-brand">Benchmark a quote →</div>
          </Link>
        ))}
        {list.length === 0 && <p className="text-muted">No matches. Any supplier can still be benchmarked inside the app.</p>}
      </div>
    </section>
  );
}
