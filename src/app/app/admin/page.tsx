import { notFound } from "next/navigation";
import { AdminForm } from "@/components/AdminForm";
import { createClient } from "@/lib/supabase/server";

export default async function Admin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const admins = (process.env.ADMIN_EMAILS ?? "").split(",").map((s) => s.trim().toLowerCase());
  if (!user?.email || !admins.includes(user.email.toLowerCase())) notFound();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-medium tracking-tight text-ink">Admin: activate a plan</h1>
      <p className="max-w-[560px]">Confirm the payment in your Selar dashboard first, then record its order reference here. The reference is stored on the subscription for audit.</p>
      <AdminForm />
    </div>
  );
}
