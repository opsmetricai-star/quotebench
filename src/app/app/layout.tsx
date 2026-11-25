import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/Shell";
import { createClient } from "@/lib/supabase/server";

const LINKS = [
  ["/app", "Dashboard"], ["/app/benchmarks", "Benchmarks"], ["/app/contracts", "Contracts"],
  ["/app/negotiations", "Negotiations"], ["/app/billing", "Billing"], ["/app/settings", "Settings"],
];

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");
  const { count } = await supabase.from("notifications").select("id", { count: "exact", head: true }).eq("read", false);
  const admins = (process.env.ADMIN_EMAILS ?? "").split(",").map((s) => s.trim().toLowerCase());
  const isAdmin = !!data.user.email && admins.includes(data.user.email.toLowerCase());
  const links = isAdmin ? [...LINKS, ["/app/admin", "Admin"]] : LINKS;
  return (
    <div className="flex min-h-screen flex-col bg-soft md:flex-row">
      <aside className="border-b border-line bg-white md:w-60 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between px-5 py-4 md:block"><Logo />
          <form action="/auth/signout" method="post" className="md:hidden"><button className="text-sm text-muted">Log out</button></form></div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:block md:space-y-1 md:pb-0">
          {links.map(([h, l]) => <Link key={h} href={h} className="block whitespace-nowrap rounded-lg px-3 py-2 text-[15px] text-body hover:bg-soft hover:text-ink">{l}</Link>)}
        </nav>
        <div className="hidden px-5 pt-8 md:block">
          <div className="text-xs text-muted">{data.user.email}</div>
          <form action="/auth/signout" method="post"><button className="mt-2 text-sm text-brand">Log out</button></form>
        </div>
      </aside>
      <div className="flex-1 p-5 md:p-10">
        {!!count && <div className="mb-5 rounded-xl bg-[#f8ecf0] px-4 py-3 text-sm text-brand">You have {count} unread notification{count > 1 ? "s" : ""}. <Link href="/app/settings" className="underline">View</Link></div>}
        <div className="mx-auto max-w-[1000px]">{children}</div>
      </div>
    </div>
  );
}
