import Link from "next/link";
import { CtaBand } from "@/components/Shell";
import { BenchmarkMock, LeverageMock, NegotiationMock, ReviewMock, SavingsBars, TeamTabs } from "@/components/Mocks";

const LOGOS = ["Northwind", "Halcyon", "Brightpath", "Lumen&Co", "Atlas Labs", "Fieldstone", "Orbital", "Meridian"];

const BLOCKS = [
  { tag: "PRICING AGENT", h: "Real-time pricing intelligence", p: "Enter a quote and get an instant read on what a comparable buyer plausibly pays, so you know whether a price is fair before you commit.", cta: "Explore pricing intelligence", href: "/quinn", visual: <BenchmarkMock /> },
  { tag: "PRICING AGENT", h: "Know your leverage before you negotiate", p: "See which terms usually move, which rarely do, and how suppliers tend to respond, so your first ask lands where it should.", cta: "Explore negotiation insights", href: "/quinn", visual: <LeverageMock /> },
  { tag: "NEGOTIATION AGENT", h: "In-depth contract reviews", p: "Surface overcharges, renewal traps and negotiable terms by analyzing the contracts you already signed.", cta: "Explore contract reviews", href: "/quinn", visual: <ReviewMock /> },
  { tag: "NEGOTIATION AGENT", h: "Guided negotiations", p: "Turn a benchmark into a plan: targets, sequenced steps, concessions to request and a ready-to-send first email.", cta: "Explore negotiation plans", href: "/quinn", visual: <NegotiationMock /> },
];

export default function Home() {
  return (
    <>
      {/* 1 Hero */}
      <section className="mx-auto max-w-[1200px] px-5 pb-16 pt-20 text-center">
        <div className="eyebrow fade-up">AI pricing and negotiation agents</div>
        <h1 className="h1 fade-up mx-auto mt-6 max-w-[760px]">
          Instant pricing clarity.<br />Guided negotiations.<br />Real savings.
        </h1>
        <p className="mx-auto mt-6 max-w-[560px] text-lg leading-relaxed">
          Benchmark any software quote, review the contract behind it, and walk into the negotiation with a plan.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/signup" className="btn btn-dark">Meet Quinn</Link>
          <Link href="/demo" className="btn btn-line">Get a demo</Link>
        </div>
      </section>

      {/* 2 Logo strip */}
      <section className="overflow-hidden py-10" aria-label="Teams using QuoteBench">
        <div className="marquee text-2xl font-semibold tracking-tight text-ink/40">
          {[...LOGOS, ...LOGOS].map((l, i) => <span key={i}>{l}</span>)}
        </div>
        <p className="mt-4 text-center text-xs text-muted">Placeholder names shown until real customer logos are approved for use.</p>
      </section>

      {/* 3 Feature blocks */}
      <section className="mx-auto max-w-[1200px] space-y-24 px-5 py-20">
        {BLOCKS.map((b, i) => (
          <div key={b.h} className={`grid items-center gap-12 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div>
              <div className="eyebrow">{b.tag}</div>
              <h2 className="h2 mt-4 max-w-[480px]">{b.h}</h2>
              <p className="mt-5 max-w-[460px] text-lg leading-relaxed">{b.p}</p>
              <Link href={b.href} className="btn btn-line mt-8">{b.cta} <span aria-hidden>↗</span></Link>
            </div>
            <div className="rounded-[28px] bg-soft p-6 md:p-10">{b.visual}</div>
          </div>
        ))}
      </section>

      {/* 4 Principle quote */}
      <section className="bg-soft py-24">
        <figure className="mx-auto max-w-[820px] px-5 text-center">
          <blockquote className="h3 !text-[clamp(1.6rem,3vw,2.2rem)] !leading-snug">
            “Buyers should negotiate from data, not instinct. QuoteBench puts a defensible number next to every quote.”
          </blockquote>
          <figcaption className="mt-6 text-sm text-muted">The QuoteBench principle · customer stories will appear here once approved</figcaption>
        </figure>
      </section>

      {/* 5 Customer stats */}
      <section className="mx-auto max-w-[1200px] px-5 py-24 text-center">
        <div className="eyebrow">What you get on day one</div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[["< 1 min", "From quote to benchmark"], ["3 steps", "Benchmark, review, plan"], ["5 free", "Supplier benchmarks on trial"]].map(([n, l]) => (
            <div key={l} className="card p-8"><div className="text-5xl font-medium tracking-tight text-ink">{n}</div><div className="mt-2 text-muted">{l}</div></div>
          ))}
        </div>
      </section>

      {/* 6 Designed for your team */}
      <section className="mx-auto max-w-[1200px] px-5 pb-24">
        <div className="mb-10 text-center">
          <h2 className="h2">Designed for your team</h2>
          <p className="mx-auto mt-4 max-w-[560px] text-lg">With or without a procurement team, QuoteBench supplies the expertise and automation you need.</p>
        </div>
        <TeamTabs />
      </section>

      {/* 7 Built on data */}
      <section className="bg-soft py-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 md:grid-cols-2">
          <div>
            <h2 className="h2 max-w-[460px]">Benchmarks you can explain to your CFO</h2>
            <p className="mt-5 max-w-[460px] text-lg leading-relaxed">Every benchmark shows the math: your blended unit price, the estimated market range, the target and the savings gap. Estimates are labelled as estimates.</p>
            <Link href="/quinn" className="btn btn-line mt-8">See how benchmarks work</Link>
          </div>
          <SavingsBars />
        </div>
      </section>

      {/* 8 Approve then execute */}
      <section className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 py-24 md:grid-cols-2">
        <div className="md:order-2">
          <h2 className="h2 max-w-[460px]">You approve, the plan does the heavy lifting</h2>
          <p className="mt-5 max-w-[460px] text-lg leading-relaxed">Review the strategy and target before anything goes out. Track each negotiation from draft to closed and record the final price to measure savings.</p>
          <Link href="/enablement" className="btn btn-line mt-8">How negotiations work</Link>
        </div>
        <div className="rounded-[28px] bg-soft p-6 md:p-10 md:order-1"><NegotiationMock /></div>
      </section>

      {/* 9 Integrations */}
      <section className="bg-soft py-24 text-center">
        <div className="mx-auto max-w-[900px] px-5">
          <div className="eyebrow">Integrations</div>
          <h2 className="h2 mt-4">Built to fit your workflow</h2>
          <p className="mx-auto mt-5 max-w-[560px] text-lg">Start with uploads and exports today. Native connectors for finance and procurement tools are on the roadmap.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {["CSV import", "Contract upload", "Email drafts", "Renewal calendar", "Slack (roadmap)", "NetSuite (roadmap)", "Coupa (roadmap)"].map((t) => (
              <span key={t} className="rounded-full border border-line bg-white px-4 py-2 text-sm text-ink">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 10 API */}
      <section className="mx-auto max-w-[1200px] px-5 py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <div className="eyebrow">API</div>
            <h2 className="h2 mt-4 max-w-[460px]">Pricing intelligence as infrastructure</h2>
            <p className="mt-5 max-w-[460px] text-lg">Benchmark requests are plain JSON over HTTPS, built with the same route the app uses. Public API keys are planned.</p>
            <Link href="/signup" className="btn btn-line mt-8">Get started</Link>
          </div>
          <pre className="overflow-x-auto rounded-2xl bg-night p-6 text-[13px] leading-relaxed text-white/85"><code>{`POST /api/benchmark
{
  "supplier": "Datadog",
  "purchaseType": "renewal",
  "termMonths": 12,
  "lineItems": [
    { "name": "Infra Pro host",
      "quantity": 120,
      "unitPrice": 276 }
  ]
}`}</code></pre>
        </div>
      </section>

      {/* 11 Security */}
      <section className="bg-night py-24 text-white">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 md:grid-cols-2">
          <div>
            <div className="eyebrow !text-white/60">Security and compliance</div>
            <h2 className="mt-4 text-[clamp(1.9rem,3.4vw,2.6rem)] font-medium leading-[1.12] tracking-tight">Security and AI governance, stated plainly</h2>
            <p className="mt-5 max-w-[460px] text-lg text-white/70">Row Level Security isolates every account. Contracts live in a private bucket. AI calls run server-side only. We make no certification claims we cannot back up.</p>
            <Link href="/legal/security" className="btn btn-light mt-8">Learn more</Link>
          </div>
          <ul className="space-y-3">
            {["Owner-only database access (RLS)", "Private contract storage per user", "AI keys never exposed to the browser", "Usage limits enforced on the server"].map((t) => (
              <li key={t} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-[15px]"><span className="text-brand2">✓</span>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 12 CTA */}
      <CtaBand />
    </>
  );
}
