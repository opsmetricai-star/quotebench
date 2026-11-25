import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

const body = z.object({ name: z.string().min(1).max(120), email: z.string().email(), company: z.string().max(120).optional(), message: z.string().max(2000).optional() });

export async function POST(req: Request) {
  const p = body.safeParse(await req.json().catch(() => null));
  if (!p.success) return NextResponse.json({ error: "Please enter a name and a valid email." }, { status: 400 });
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return NextResponse.json({ error: "Demo requests are not configured yet." }, { status: 503 });
  const { error } = await createAdminClient().from("demo_requests").insert(p.data);
  if (error) return NextResponse.json({ error: "Could not save your request." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
