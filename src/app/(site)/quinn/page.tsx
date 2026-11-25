import { CtaBand } from "@/components/Shell";
import { PageHero, Split } from "@/components/Page";
import { BenchmarkMock, LeverageMock, NegotiationMock, ReviewMock } from "@/components/Mocks";

export const metadata = { title: "Quinn: the AI procurement agent | QuoteBench" };

const PILLARS = [
  ["PRICE", "Establish the fair price before you engage a supplier.", "Quinn prices every line item against the market for your seat count, term and deal type, and quantifies the gap in dollars."],
  ["LEVERAGE", "Predict where the supplier will move.", "Timing, term length, competing products and payment structure are scored so your first counter targets the lever most likely to land."],
  ["RISK", "Surface cost hidden in the contract.", "Quinn audits agreements for uplift clauses, auto-renewal traps and overage pricing, and quotes the language behind each flag."],
  ["EXECUTION", "Move from analysis to a negotiation plan.", "Targets, a sequenced playbook, non-price concessions and a drafted first email are generated and tracked to a closed price."],
];

export default function Quinn() {
  return (
    <>
      <PageHero eyebrow="Quinn, the QuoteBench AI agent" title="Quinn does the analysis. Your team closes the deal." body="One agent that benchmarks quotes, audits contracts and builds the negotiation plan, so every purchase is decided on evidence and every renewal is challenged." />
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
        <div className="text-center"><div className="eyebrow">Capabilities</div><h2 className="h2 mt-3">How Quinn works</h2><p className="mx-auto mt-4 max-w-[560px] text-lg">Four workflows on one engine, from first quote to closed deal.</p></div>
        <Split tag="TRANSPARENT MATH" title="Every number is traceable" body="Totals, blended unit prices and savings gaps are computed in code. The model supplies the market judgment and a confidence rating, and its output is validated before it reaches your dashboard." bullets={["Deterministic totals and savings", "Schema-validated AI output", "Confidence rating on every benchmark"]}><BenchmarkMock /></Split>
        <Split flip tag="HUMAN APPROVAL" title="Your team approves before anything moves" body="Review the strategy and target, then advance each negotiation from draft to approved to in progress to closed. Record the final price and the dashboard reports realized savings." bullets={["Four-stage negotiation tracker", "Final price recorded against the plan", "Realized savings reported on the dashboard"]}><NegotiationMock /></Split>
        <Split tag="CONTRACT AUDIT" title="Audit the contract behind the quote" body="Add a contract and Quinn extracts the renewal date, notice period and annual value, then ranks every risk by severity and quotes the clause." bullets={["Renewal dates feed your calendar", "Risks ranked high, medium and low", "Negotiable terms listed per contract"]}><ReviewMock /></Split>
        <Split flip tag="LEVERAGE" title="Know which levers to pull" body="Each benchmark returns the concrete levers for your supplier and deal shape, plus competing alternatives and the non-price terms worth requesting." bullets={["Timing and term leverage", "Competing alternatives", "Non-price concessions to request"]}><LeverageMock /></Split>
      </section>
      <CtaBand />
    </>
  );
}
