// Content for solutions, categories, supplier pages, steps and FAQ.
// Category guidance is general buying guidance, not claims about any supplier's actual pricing.
import { SUPPLIERS } from "./suppliers";

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const STEPS = [
  ["Bring the quote", "Enter line items with quantities and annual unit prices, or add the contract. Quinn needs only the numbers you already have."],
  ["Quinn analyzes and predicts", "The agent computes your blended unit price, estimates the market range, scores supplier leverage and flags contract risk."],
  ["Set the target", "A target price and a ranked list of levers are produced, with a confidence rating so you know how hard to push."],
  ["Run the negotiation", "Use the sequenced plan and the drafted first email. Move the negotiation from draft to approved to closed."],
  ["Measure the result", "Record the final price. The dashboard reports realized savings against the original quote."],
];

export const USE_CASES = [
  ["Renewals", "Challenge every uplift before the notice window closes, and walk in with a target instead of a reaction."],
  ["New purchases", "Price a first-time purchase against the market before the supplier sets the anchor."],
  ["Contract audits", "Find auto-renewal traps, uplift caps and overage pricing in agreements already signed."],
  ["Stack consolidation", "Compare overlapping tools and surface the competing alternatives that create leverage."],
  ["Multi-year commitments", "Test whether a longer term is earning a real discount or only locking in a price."],
  ["Budget planning", "Forecast savings by renewal date so finance plans spend with the negotiation already priced in."],
];

export const COMPARE = [
  ["Pricing context", "A quote and a deadline", "A market range, a target and a confidence rating"],
  ["Leverage", "Instinct and past experience", "Ranked levers for the supplier and deal shape"],
  ["Contract risk", "Found at the invoice", "Flagged by severity, with the clause quoted"],
  ["Negotiation prep", "Days of manual research", "A sequenced plan and first email in minutes"],
  ["Savings reporting", "Estimated after the fact", "Tracked to a recorded final price"],
];

export const HOME_FAQ = [
  ["What does the AI actually do?", "Quinn prices each quote against the market for your seat count, term and deal type, predicts which levers a supplier will respond to, audits contract language, and drafts the negotiation plan and first email. Totals and savings are calculated in code, and the model's output is validated before you see it."],
  ["Is the pricing data verified?", "No. Benchmarks combine exact arithmetic on your numbers with an AI market estimate. Every result carries a confidence rating and is labeled as an estimate. Treat low-confidence results as a starting position and confirm with a competing quote."],
  ["Does QuoteBench contact suppliers for us?", "No. Quinn prepares the strategy and the drafts. Your team approves and sends everything, and nothing reaches a supplier without your sign-off."],
  ["Who is it built for?", "Procurement, finance and IT teams that own software spend, including companies without a dedicated procurement function."],
  ["How is our data protected?", "Each workspace is isolated at the database layer, contracts are stored privately per user, and AI calls run only on the server. Read the security overview for detail."],
  ["How do plans and billing work?", "Start on the trial. Paid plans are purchased through Selar and activated once the payment is verified. See the pricing page for limits."],
];

export const SOLUTIONS: Record<string, {
  slug: string; name: string; headline: string; lead: string; pains: [string, string][]; flows: [string, string][];
}> = {
  procurement: {
    slug: "procurement", name: "Procurement",
    headline: "Give every buyer an AI analyst on every deal.",
    lead: "Procurement teams own more renewals than they can research. Quinn benchmarks each quote and prepares each negotiation, so the whole portfolio is challenged, not only the largest contracts.",
    pains: [
      ["The long tail renews untouched", "Smaller renewals pass without scrutiny because research takes longer than the deal is worth."],
      ["Suppliers anchor first", "Without a market view, the first number on the table sets the negotiation."],
      ["Leverage is rebuilt every time", "Each negotiation starts from a blank page and tribal knowledge."],
    ],
    flows: [
      ["Benchmark every quote", "Line-item pricing with a market range and savings gap."],
      ["Rank the levers", "Timing, term and competitive alternatives scored per supplier."],
      ["Track every negotiation", "Draft, approved, in progress and closed, with final price recorded."],
    ],
  },
  finance: {
    slug: "finance", name: "Finance",
    headline: "Turn software spend into a forecastable, defensible number.",
    lead: "Finance leaders need to explain every uplift and plan every renewal. QuoteBench shows the math behind each price and reports savings against recorded outcomes.",
    pains: [
      ["Uplifts arrive as a surprise", "Contract clauses permit increases that finance only sees on the invoice."],
      ["Savings claims are hard to audit", "Estimated savings rarely tie back to a final signed price."],
      ["Renewal dates are scattered", "Notice windows live in documents, not in a calendar finance can plan against."],
    ],
    flows: [
      ["Audit contracts for cost clauses", "Uplift caps, overage pricing and auto-renewal terms, with the clause quoted."],
      ["See renewals by date", "Extracted renewal dates and annual values feed the dashboard."],
      ["Report realized savings", "Final prices are recorded so the savings figure is measured, not estimated."],
    ],
  },
  it: {
    slug: "it", name: "IT and operations",
    headline: "Buy the right tools at the right price without a procurement queue.",
    lead: "IT leaders often buy and renew software directly. Quinn supplies the market context and the negotiation plan, so purchases move fast and still hold up to scrutiny.",
    pains: [
      ["Buying decisions need speed", "Waiting on research delays tool rollouts and gives suppliers the timing advantage."],
      ["Overlapping tools accumulate", "Teams adopt similar products without a price comparison."],
      ["Contract terms go unread", "Renewal and termination language is rarely reviewed before signature."],
    ],
    flows: [
      ["Price a purchase before approval", "A market range and target in minutes, not days."],
      ["Compare alternatives", "Competing products surfaced with each benchmark."],
      ["Audit the order form", "Risk flagged by severity before you sign."],
    ],
  },
};

export const CATEGORY_INFO: Record<string, { measures: string; levers: string[] }> = {
  CRM: { measures: "seats by edition, add-on modules, and support tiers", levers: ["Commitment length against annual price", "Edition mix: only buy the tier each role needs", "Bundling add-ons at renewal rather than mid-term", "Quarter-end and fiscal-year-end timing"] },
  Collaboration: { measures: "active seats, plan tier, and storage or recording limits", levers: ["Right-sizing seats to active usage", "Annual prepayment against monthly pricing", "Competitive alternatives with feature overlap", "Locking multi-year price caps"] },
  "Dev tools": { measures: "developer seats, usage tiers, and enterprise security features", levers: ["Seat true-ups on a fixed calendar", "Tier downgrades for non-core teams", "Bundled products across one supplier", "Price protection on renewal uplift"] },
  Security: { measures: "protected users or endpoints, feature modules, and support level", levers: ["Per-user pricing against modular pricing", "Co-terming multiple products to one date", "Competing quotes from adjacent suppliers", "Capped renewal uplift"] },
  Design: { measures: "editor seats against viewer seats, plan tier and admin controls", levers: ["Editor and viewer seat mix", "Annual commitment discount", "Consolidating teams onto one contract", "Renewal uplift caps"] },
  Support: { measures: "agent seats, automation and AI add-ons, and channel packages", levers: ["Agent count against ticket volume", "AI add-on pricing separated from base seats", "Multi-year term trade-offs", "Implementation and onboarding fee concessions"] },
  Observability: { measures: "hosts, ingested data volume, retention, and per-product usage", levers: ["Committed use against on-demand pricing", "Retention and ingestion limits", "Overage rates in the order form", "Consolidating products onto one commit"] },
  Legal: { measures: "envelopes or agreements, seats, and integration packages", levers: ["Volume commitments against per-envelope pricing", "Bundle scope across e-signature and workflow", "Overage and true-up terms", "Auto-renewal and notice windows"] },
  Productivity: { measures: "workspace seats, plan tier, and admin or security add-ons", levers: ["Active seat reconciliation", "Annual against monthly billing", "Enterprise feature necessity", "Price lock across the term"] },
  Data: { measures: "compute credits, storage, and edition features", levers: ["Capacity commitment against pay-as-you-go", "Credit rollover and expiry terms", "Edition features actually used", "Discount tiers at higher commitment"] },
  HR: { measures: "employee counts, module selection, and implementation scope", levers: ["Headcount-based pricing and true-up terms", "Module scoping at signature", "Implementation fee concessions", "Multi-year price protection"] },
};

export function supplierBySlug(slug: string) {
  const s = SUPPLIERS.find(([n]) => slugify(n) === slug);
  return s ? { name: s[0], category: s[1], blurb: s[2] } : null;
}
export const CATEGORIES = [...new Set(SUPPLIERS.map((s) => s[1]))].sort();
