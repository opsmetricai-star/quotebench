import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { LIMIT_KEY, PLANS, type PlanId, type UsageKind } from "@/lib/plans";

export async function requireUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return { supabase, user: data.user };
}

export async function getPlanId(userId: string): Promise<PlanId> {
  const admin = createAdminClient();
  const { data } = await admin.from("subscriptions").select("plan,status,current_period_end").eq("user_id", userId).maybeSingle();
  if (!data || data.status !== "active") return "trial";
  if (data.current_period_end && new Date(data.current_period_end) < new Date()) return "trial";
  return data.plan as PlanId;
}

function monthStart() {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)).toISOString();
}

export async function getUsage(userId: string) {
  const admin = createAdminClient();
  const { data } = await admin.from("usage_events").select("kind").eq("user_id", userId).gte("created_at", monthStart());
  const used: Record<UsageKind, number> = { benchmark: 0, contract_review: 0, negotiation_plan: 0 };
  (data ?? []).forEach((r) => { used[r.kind as UsageKind]++; });
  return used;
}

/** Returns null when allowed, or an error message when the monthly limit is hit. */
export async function checkQuota(userId: string, kind: UsageKind) {
  const planId = await getPlanId(userId);
  const limit = PLANS[planId][LIMIT_KEY[kind]];
  const used = (await getUsage(userId))[kind];
  return used >= limit
    ? `You have used ${used} of ${limit} ${{ benchmark: "benchmarks", contract_review: "contract audits", negotiation_plan: "negotiation plans" }[kind]} this month on the ${PLANS[planId].name} plan. Upgrade on the Billing page.`
    : null;
}

export async function recordUsage(userId: string, kind: UsageKind) {
  await createAdminClient().from("usage_events").insert({ user_id: userId, kind });
}
