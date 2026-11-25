// Plan prices are inferred from the Selar link slugs (47plan / 97plan) the owner supplied.
// Confirm they match the prices configured on Selar before launch.
export type PlanId = "trial" | "plan47" | "plan97";

export type Plan = {
  id: PlanId;
  name: string;
  price: number;
  blurb: string;
  benchmarksPerMonth: number;
  contractReviewsPerMonth: number;
  negotiationPlansPerMonth: number;
  features: string[];
  checkoutUrl: string | null;
};

export const PLANS: Record<PlanId, Plan> = {
  trial: {
    id: "trial", name: "Trial", price: 0, blurb: "Test QuoteBench on up to five suppliers.",
    benchmarksPerMonth: 5, contractReviewsPerMonth: 1, negotiationPlansPerMonth: 1,
    features: ["5 supplier benchmarks", "1 contract review", "1 negotiation plan", "Community support"],
    checkoutUrl: null,
  },
  plan47: {
    id: "plan47", name: "Starter", price: 47, blurb: "For small teams buying software every month.",
    benchmarksPerMonth: 50, contractReviewsPerMonth: 10, negotiationPlansPerMonth: 15,
    features: ["50 benchmarks / month", "10 contract reviews / month", "15 negotiation plans / month", "Renewal calendar", "Email support"],
    checkoutUrl: "https://selar.com/47plan?currency=USD",
  },
  plan97: {
    id: "plan97", name: "Growth", price: 97, blurb: "For finance and procurement teams managing a full stack.",
    benchmarksPerMonth: 250, contractReviewsPerMonth: 50, negotiationPlansPerMonth: 75,
    features: ["250 benchmarks / month", "50 contract reviews / month", "75 negotiation plans / month", "Renewal calendar and alerts", "Priority support"],
    checkoutUrl: "https://selar.com/97plan?currency=USD",
  },
};

export type UsageKind = "benchmark" | "contract_review" | "negotiation_plan";
export const LIMIT_KEY = {
  benchmark: "benchmarksPerMonth",
  contract_review: "contractReviewsPerMonth",
  negotiation_plan: "negotiationPlansPerMonth",
} as const satisfies Record<UsageKind, keyof Plan>;
