import Link from "next/link";
import { CtaBand } from "@/components/Shell";
import { PageHero, Split } from "@/components/Page";
import { BenchmarkMock, LeverageMock, NegotiationMock, ReviewMock } from "@/components/Mocks";

export const metadata = { title: "Quinn — AI procurement agent | QuoteBench" };

const PILLARS = [
  ["SEE THE FAIR PRICE", "Know what comparable buyers plausibly pay before you engage a supplier.", "Instant market ranges across software products, computed against your own seat counts and term."],
  ["UNDERSTAND YOUR LEVERAGE", "Know what usually moves and where suppliers hold the line.", "Supplier-specific levers: timing, term length, competitors and payment structure."],
  ["SURFACE SAVINGS AND STRATEGY", "Find savings, renewal risk and negotiation levers in your contracts.", "Quinn reads your agreements for overcharges, uplift clauses and auto-renewal traps."],
  ["SUPPORT OR EXECUTION", "Get a full playbook you can run yourself.", "Targets, sequenced steps and a drafted first email, saved to your negotiation tracker."],
];

export default function Quinn() {
  return (
    <>
      <PageHero eyebrow="Meet Quinn" title="Quinn does the homework. You close the deal." body="Quinn benchmarks your quotes, reviews your contracts and builds the negotiation plan, so you walk in prepared." primary={["Try for free", "/signup"]} />
      <section className="mx-auto grid max-w-[1200px] gap-5 px-5 pb-20 sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map(([t, h, p]) => (
          <div key={t} className="card p-6">
            <div className="eyebrow">{t}</div>
            <h3 className="mt-4 text-xl font-medium leading-snug text-ink">{h}</h3>
            <p className="mt-3 text-[15px] leading-relaxed">{p}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-[1200px] space-y-24 px-5 py-16">
        <div className="text-center"><div className="eyebrow">Features</div><h2 className="h2 mt-3">How Quinn works</h2><p className="mx-auto mt-4 max-w-[520px] text-lg">From contract analysis to negotiation planning, Quinn supports each stage.</p></div>
        <Split tag="TRANSPARENT MATH" title="Every number is traceable" body="Totals, blended unit prices and savings gaps are calculated in code, not guessed by a model. The AI only supplies the market judgement, and it is labelled as an estimate." bullets={["Deterministic totals and savings", "Validated structured AI output", "Confidence rating on every benchmark"]}><BenchmarkMock /></Split>
        <Split flip tag="YOU STAY IN CONTROL" title="Approve the plan before anything goes out" body="Review strategy and target price, edit them, then mark the negotiation approved. Nothing is sent to a supplier on your behalf." bullets={["Review strategy before you start", "Track draft, approved, in progress and closed", "Record the final price to measure savings"]}><NegotiationMock /></Split>
        <Split tag="SIMPLE TO START" title="Paste a contract or describe the deal" body="Enter quote line items, or upload a contract and paste its text. No lengthy setup." bullets={["Start from a quote or a contract", "Files stored in a private bucket", "Reviews saved to your workspace"]}><ReviewMock /></Split>
        <Split flip tag="LEVERAGE" title="Know which levers to pull" body="Each benchmark returns the concrete negotiation levers most relevant to your supplier and deal shape." bullets={["Timing and term leverage", "Competing alternatives", "Non-price concessions to request"]}><LeverageMock /></Split>
      </section>
      <section className="bg-soft py-24">
        <div className="mx-auto max-w-[1000px] px-5 text-center">
          <h2 className="h2">Choose your negotiation approach</h2>
          <div className="mt-10 grid gap-5 text-left md:grid-cols-2">
            <div className="card p-8"><div className="eyebrow">Negotiation advisory</div><h3 className="mt-3 text-2xl font-medium text-ink">Your negotiation, powered by data</h3><p className="mt-3">You receive a strategy, targets and an email draft. You run the conversation and keep the supplier relationship.</p><p className="mt-4 text-sm text-muted">Best for teams that want expert structure but prefer to talk to suppliers themselves. Available now.</p></div>
            <div className="card p-8"><div className="eyebrow">Autonomous negotiations</div><h3 className="mt-3 text-2xl font-medium text-ink">Hands-off execution</h3><p className="mt-3">Automated supplier outreach and counters.</p><p className="mt-4 text-sm text-muted">Not available yet. QuoteBench does not send messages to suppliers on your behalf.</p></div>
          </div>
          <Link href="/pricing" className="btn btn-dark mt-10">View pricing</Link>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
