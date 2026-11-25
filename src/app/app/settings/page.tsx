import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function save(form: FormData) {
  "use server";
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from("profiles").update({
    full_name: String(form.get("full_name") ?? "").slice(0, 120), company: String(form.get("company") ?? "").slice(0, 120),
  }).eq("id", user.id);
  revalidatePath("/app/settings");
}

async function markRead() {
  "use server";
  const supabase = await createClient();
  await supabase.from("notifications").update({ read: true }).eq("read", false);
  revalidatePath("/app", "layout");
}

export default async function Settings() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: p } = await supabase.from("profiles").select("full_name,company").eq("id", user!.id).maybeSingle();
  const { data: notes } = await supabase.from("notifications").select("id,title,body,read,created_at").order("created_at", { ascending: false }).limit(10);
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-medium tracking-tight text-ink">Settings</h1>
      <form action={save} className="card max-w-[520px] space-y-4 p-6">
        <div className="eyebrow">Profile</div>
        <input className="input" value={user!.email ?? ""} disabled aria-label="Email" />
        <input name="full_name" className="input" defaultValue={p?.full_name ?? ""} placeholder="Full name" />
        <input name="company" className="input" defaultValue={p?.company ?? ""} placeholder="Company" />
        <button className="btn btn-dark">Save</button>
      </form>
      <div className="card p-6">
        <div className="flex items-center justify-between"><div className="eyebrow">Notifications</div><form action={markRead}><button className="text-sm text-brand">Mark all read</button></form></div>
        {(notes ?? []).length === 0 ? <p className="mt-3 text-sm text-muted">Nothing yet.</p> :
          (notes ?? []).map((n) => <div key={n.id} className="border-b border-line py-3 last:border-0"><div className={`text-[15px] ${n.read ? "" : "font-medium text-ink"}`}>{n.title}</div><div className="text-sm text-muted">{n.body}</div></div>)}
      </div>
    </div>
  );
}
