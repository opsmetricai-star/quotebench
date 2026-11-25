import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireUser } from "@/lib/usage";

// Trusted administrative activation: an admin confirms the Selar payment, then activates the plan.
// A redirect back from Selar is never treated as proof of payment.
export async function POST(req: Request) {
  const { user } = await requireUser();
  const admins = (process.env.ADMIN_EMAILS ?? "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (!user?.email || !admins.includes(user.email.toLowerCase())) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  const p = z.object({
    email: z.string().email(),
    plan: z.enum(["trial", "plan47", "plan97"]),
    reference: z.string().min(3).max(120),
    months: z.number().int().min(1).max(24).default(1),
  }).safeParse(await req.json().catch(() => null));
  if (!p.success) return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  const admin = createAdminClient();
  const { data: prof } = await admin.from("profiles").select("id").eq("email", p.data.email).maybeSingle();
  if (!prof) return NextResponse.json({ error: "No user with that email." }, { status: 404 });
  const end = new Date(); end.setMonth(end.getMonth() + p.data.months);
  const { error } = await admin.from("subscriptions").upsert({
    user_id: prof.id, plan: p.data.plan, status: "active", activated_by: user.email,
    payment_reference: p.data.reference, current_period_end: p.data.plan === "trial" ? null : end.toISOString(), updated_at: new Date().toISOString(),
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  await admin.from("notifications").insert({ user_id: prof.id, title: "Plan activated", body: `Your ${p.data.plan} plan is now active.` });
  return NextResponse.json({ ok: true });
}
