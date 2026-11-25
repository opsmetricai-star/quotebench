import Link from "next/link";
import { CtaBand } from "@/components/Shell";
import { Check } from "@/components/Icons";
import { BenchmarkMock, LeverageMock, NegotiationMock, ReviewMock, SavingsBars, TeamTabs } from "@/components/Mocks";
import { Compare, Faq, SolutionsTeaser, Steps, UseCases } from "@/components/Sections";
import { HOME_FAQ } from "@/lib/content";

const ENGINE = [
  ["Analyzes", "Reads every quote line by line and prices it against the market for your seat count, term and deal type."],
  ["Predicts", "Estimates where the supplier will move, which levers carry weight and how far a counter can realistically go."],
  ["Decides", "Sets a target price and a negotiation sequence, ranked by expected savings."],
  ["Automates", "Drafts the outreach, tracks every negotiation and records the final price against the plan."],
];

const BLOCKS = [
  { tag: "PRICING AGENT", h: "Know the market price before the supplier names theirs", p: "Quinn, the QuoteBench AI agent, analyzes each line item and returns a blended unit price, an estimated market range and the savings gap in dollars. Overpayment becomes a number your CFO can act on.", visual: <BenchmarkMock /> },
  { tag: "PRICING AGENT", h: "Walk into every negotiation with the leverage already mapped", p: "The model predicts which terms move for your supplier, from commitment length to quarter-end timing to competing quotes, and ranks them. Your first ask lands where the supplier is most likely to concede.", visual: <LeverageMock /> },
  { tag: "CONTRACT AGENT", h: "Find the clauses that cost you money before renewal does", p: "Quinn audits signed contracts for uplift caps, auto-renewal traps, overage pricing and weak termination rights, and quotes the clause behind every flag. Risk is surfaced at signing, not at the invoice.", visual: <ReviewMock /> },
  { tag: "NEGOTIATION AGENT", h: "From benchmark to a negotiation you can run today", p: "Quinn turns the benchmark into a target, a sequenced plan, the non-price concessions to request and a ready-to-send first email. Each negotiation is tracked to a closed price so savings are measured, not assumed.", visual: <NegotiationMock /> },
];

export default function Home() {
  return (
    <>
      <section className="hero-bg px-5 pb-24 pt-24 text-center">
        <div className="eyebrow fade-up">The AI engine for software spend</div>
        <h1 className="h1 fade-up mx-auto mt-6 max-w-[800px]">
          Cut software costs with an AI that prices, audits and negotiates every deal.
        </h1>
        <p className="mx-auto mt-6 max-w-[620px] text-lg leading-relaxed">
          QuoteBench analyzes every quote, predicts supplier leverage, decides your target price and automates the negotiation workflow, so procurement, finance and IT teams stop overpaying at renewal.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/signup" className="btn btn-dark">Sign up</Link>
          <Link href="/login" className="btn btn-line">Log in</Link>
        </div>
      </section>

      <section className="border-y border-line bg-white" aria-label="What the AI does">
        <div className="mx-auto grid max-w-[1200px] gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {ENGINE.map(([t, p]) => (
            <div key={t} className="bg-white p-8">
              <div className="text-2xl font-medium tracking-tight text-ink">{t}</div>
              <p className="mt-3 text-[15px] leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] space-y-24 px-5 py-24">
        {BLOCKS.map((b, i) => (
          <div key={b.h} className={`grid items-center gap-12 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div>
              <div className="eyebrow">{b.tag}</div>
              <h2 className="h2 mt-4 max-w-[500px]">{b.h}</h2>
              <p className="mt-5 max-w-[480px] text-lg leading-relaxed">{b.p}</p>
              <Link href="/signup" className="btn btn-dark mt-8">Sign up</Link>
            </div>
            <div className="rounded-[28px] bg-soft p-6 md:p-10">{b.visual}</div>
          </div>
        ))}
      </section>

      <section className="bg-soft py-24">
        <div className="mx-auto max-w-[900px] px-5 text-center">
          <h2 className="h2">Negotiate from evidence. Every time.</h2>
          <p className="mx-auto mt-6 max-w-[700px] text-xl leading-relaxed text-ink/80">
            Suppliers run on pricing playbooks and discount matrices. QuoteBench gives the buying side the same machinery: a model that benchmarks, forecasts and drafts at the speed of your renewal calendar.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-24 text-center">
        <div className="eyebrow">Time to value</div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[["Minutes", "From quote to benchmarked target price"], ["3 workflows", "Benchmark, contract audit, negotiation plan"], ["100%", "Of savings tracked to a recorded final price"]].map(([n, l]) => (
            <div key={l} className="card p-8"><div className="text-4xl font-medium tracking-tight text-ink md:text-5xl">{n}</div><div className="mt-2 text-muted">{l}</div></div>
          ))}
        </div>
      </section>

      <SolutionsTeaser />
      <Steps />

      <section className="mx-auto max-w-[1200px] px-5 pb-24">
        <div className="mb-10 text-center">
          <h2 className="h2">Built for the teams that own software spend</h2>
          <p className="mx-auto mt-4 max-w-[600px] text-lg">With or without a dedicated procurement function, QuoteBench supplies the analysis and the execution.</p>
        </div>
        <TeamTabs />
      </section>

      <section className="bg-soft py-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 md:grid-cols-2">
          <div>
            <h2 className="h2 max-w-[480px]">Every number is auditable by your finance team</h2>
            <p className="mt-5 max-w-[480px] text-lg leading-relaxed">Totals, blended unit prices and savings gaps are calculated deterministically in code. The AI contributes the market judgment, scored with a confidence rating, so the output is both fast and defensible.</p>
            <Link href="/signup" className="btn btn-dark mt-8">Sign up</Link>
          </div>
          <SavingsBars />
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 py-24 md:grid-cols-2">
        <div className="md:order-2">
          <h2 className="h2 max-w-[480px]">Your team approves. The AI does the preparation.</h2>
          <p className="mt-5 max-w-[480px] text-lg leading-relaxed">Review the target and the strategy, then move each negotiation from draft to approved to closed. Nothing reaches a supplier without your sign-off, and every outcome feeds your savings report.</p>
          <Link href="/signup" className="btn btn-dark mt-8">Sign up</Link>
        </div>
        <div className="rounded-[28px] bg-soft p-6 md:order-1 md:p-10"><NegotiationMock /></div>
      </section>

      <section className="bg-soft py-24 text-center">
        <div className="mx-auto max-w-[900px] px-5">
          <div className="eyebrow">Workflow</div>
          <h2 className="h2 mt-4">Plugs into how procurement already works</h2>
          <p className="mx-auto mt-5 max-w-[600px] text-lg">Bring contracts and quotes as they are. Take the output straight into your supplier conversations.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {["Quote line items", "Contract upload and audit", "Email drafts", "Renewal tracking", "JSON endpoint"].map((t) => (
              <span key={t} className="rounded-full border border-line bg-white px-4 py-2 text-sm text-ink">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <div className="eyebrow">Infrastructure</div>
            <h2 className="h2 mt-4 max-w-[480px]">Pricing intelligence as a callable service</h2>
            <p className="mt-5 max-w-[480px] text-lg">The benchmark engine behind the dashboard is a structured JSON endpoint: line items in, validated market analysis out.</p>
            <Link href="/signup" className="btn btn-dark mt-8">Sign up</Link>
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

      <UseCases />
      <Compare />
      <Faq items={HOME_FAQ} />

      <section className="band-bg py-24 text-white">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 md:grid-cols-2">
          <div>
            <div className="eyebrow !text-white/60">Security and governance</div>
            <h2 className="mt-4 text-[clamp(1.9rem,3.4vw,2.6rem)] font-medium leading-[1.12] tracking-tight">Enterprise controls on every account</h2>
            <p className="mt-5 max-w-[480px] text-lg text-white/70">Each workspace is isolated at the database layer, contracts sit in private storage, and AI calls run only on the server. Usage limits are enforced where users cannot alter them.</p>
            <Link href="/legal/security" className="mt-8 inline-block text-white underline underline-offset-4">Read the security overview</Link>
          </div>
          <ul className="space-y-3">
            {["Owner-only data access enforced by row level security", "Private contract storage, one folder per user", "AI keys never exposed to the browser", "Server-enforced usage limits"].map((t) => (
              <li key={t} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-[15px]"><Check className="text-brand2" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
