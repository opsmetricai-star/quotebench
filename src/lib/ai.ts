import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

// All math (totals, per-seat price, savings) is computed deterministically in code.
// The model only supplies market judgement, which is validated with zod and labelled
// as an estimate: QuoteBench does not hold a proprietary transaction dataset.

export class AiConfigError extends Error {}

async function generateJson<T>(prompt: string, schema: z.ZodType<T>): Promise<T> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new AiConfigError("GEMINI_API_KEY is not configured on the server.");
  const model = new GoogleGenerativeAI(key).getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-3.8-flash",
    generationConfig: { responseMimeType: "application/json", temperature: 0.3 },
  });
  let lastErr: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await model.generateContent(prompt);
      return schema.parse(JSON.parse(res.response.text()));
    } catch (e) {
      lastErr = e;
    }
  }
  throw new Error(`AI response failed validation: ${lastErr instanceof Error ? lastErr.message : "unknown"}`);
}

export const lineItemSchema = z.object({
  name: z.string().min(1).max(120),
  quantity: z.number().positive().max(1_000_000),
  unitPrice: z.number().nonnegative().max(100_000_000),
});
export type LineItem = z.infer<typeof lineItemSchema>;

export const benchmarkInputSchema = z.object({
  supplier: z.string().min(1).max(120),
  purchaseType: z.enum(["new", "renewal"]),
  termMonths: z.number().int().min(1).max(60),
  lineItems: z.array(lineItemSchema).min(1).max(25),
  notes: z.string().max(1000).optional(),
});
export type BenchmarkInput = z.infer<typeof benchmarkInputSchema>;

const marketSchema = z.object({
  marketUnitPriceLow: z.number().nonnegative(),
  marketUnitPriceHigh: z.number().nonnegative(),
  typicalDiscountPctLow: z.number().min(0).max(90),
  typicalDiscountPctHigh: z.number().min(0).max(90),
  confidence: z.enum(["low", "medium", "high"]),
  leverage: z.array(z.string()).min(1).max(6),
  alternatives: z.array(z.object({ name: z.string(), note: z.string() })).max(4),
  summary: z.string(),
});

export async function runBenchmark(input: BenchmarkInput) {
  const quotedTotal = input.lineItems.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const units = input.lineItems.reduce((s, i) => s + i.quantity, 0);
  const quotedBlended = quotedTotal / units;
  const market = await generateJson(
    `You are a SaaS procurement analyst. Estimate market pricing for this ${input.purchaseType} purchase from "${input.supplier}".
Term: ${input.termMonths} months. Items (name, quantity, quoted unit price per unit per year): ${JSON.stringify(input.lineItems)}.
Notes: ${input.notes ?? "none"}.
Return JSON with keys: marketUnitPriceLow, marketUnitPriceHigh (blended per-unit annual price a comparable buyer plausibly pays, same currency as the quote),
typicalDiscountPctLow, typicalDiscountPctHigh (off list price suppliers commonly give at this size), confidence (low|medium|high; use low if you are unsure of this supplier),
leverage (3-5 concrete negotiation levers), alternatives (up to 3 competing products with a short note), summary (2 sentences).
Be honest about uncertainty. Do not invent precise statistics.`,
    marketSchema,
  );
  const low = Math.min(market.marketUnitPriceLow, market.marketUnitPriceHigh);
  const high = Math.max(market.marketUnitPriceLow, market.marketUnitPriceHigh);
  const mid = (low + high) / 2;
  const targetTotal = Math.round(mid * units);
  return {
    quotedTotal,
    units,
    quotedBlendedUnitPrice: quotedBlended,
    marketLow: low,
    marketHigh: high,
    marketMid: mid,
    targetTotal,
    potentialSavings: Math.max(0, Math.round(quotedTotal - targetTotal)),
    savingsPct: quotedTotal > 0 ? Math.max(0, ((quotedTotal - targetTotal) / quotedTotal) * 100) : 0,
    verdict: quotedBlended > high ? "above_market" : quotedBlended < low ? "below_market" : "in_range",
    ...market,
    disclaimer: "AI-estimated market range. Not based on verified transaction data.",
  };
}

const reviewSchema = z.object({
  supplier: z.string().nullable(),
  annualValue: z.number().nullable(),
  renewalDate: z.string().nullable(),
  autoRenews: z.boolean().nullable(),
  noticePeriodDays: z.number().nullable(),
  risks: z.array(z.object({ severity: z.enum(["high", "medium", "low"]), title: z.string(), detail: z.string(), clause: z.string().nullable() })).max(12),
  negotiables: z.array(z.string()).max(8),
  summary: z.string(),
});
export type ContractReview = z.infer<typeof reviewSchema>;

export async function reviewContract(text: string) {
  return generateJson(
    `You review SaaS contracts for the buyer. Analyze the contract text below and return JSON with keys:
supplier, annualValue (number or null), renewalDate (YYYY-MM-DD or null), autoRenews (bool or null), noticePeriodDays (number or null),
risks (array of {severity: high|medium|low, title, detail, clause: short quote or null}) covering overcharges, auto-renewal traps, uplift caps, termination, liability, data terms,
negotiables (terms worth pushing on), summary (2-3 sentences). Use null when the text does not say. Never guess values.
CONTRACT TEXT:
"""${text.slice(0, 60_000)}"""`,
    reviewSchema,
  );
}

const planSchema = z.object({
  strategy: z.string(),
  steps: z.array(z.object({ title: z.string(), detail: z.string() })).min(3).max(7),
  concessionsToAsk: z.array(z.string()).max(6),
  fallback: z.string(),
  emailDraft: z.object({ subject: z.string(), body: z.string() }),
});

export async function buildNegotiationPlan(args: {
  supplier: string; currentPrice: number; targetPrice: number; leverage: string[]; context?: string;
}) {
  return generateJson(
    `You are a procurement negotiation coach. Build a plan to move "${args.supplier}" from ${args.currentPrice} to about ${args.targetPrice} (annual total).
Known leverage: ${JSON.stringify(args.leverage)}. Extra context: ${args.context ?? "none"}.
Return JSON: strategy (short paragraph), steps (3-6 of {title, detail}), concessionsToAsk (non-price terms), fallback (what to do if they hold), emailDraft ({subject, body} first outreach, professional, no invented facts, use [Your Name] placeholder).`,
    planSchema,
  );
}
