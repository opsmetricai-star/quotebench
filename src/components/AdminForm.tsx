"use client";
import { useState } from "react";

export function AdminForm() {
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const r = await fetch("/api/admin/activate", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: f.get("email"), plan: f.get("plan"), reference: f.get("reference"), months: Number(f.get("months")) }),
    });
    const j = await r.json().catch(() => ({}));
    setMsg({ ok: r.ok, text: r.ok ? "Plan activated and user notified." : j.error ?? "Failed." });
  }
  return (
    <form onSubmit={submit} className="card max-w-[520px] space-y-4 p-6">
      <input name="email" type="email" required className="input" placeholder="Customer email (as paid on Selar)" />
      <select name="plan" className="input"><option value="plan47">Starter ($47)</option><option value="plan97">Growth ($97)</option><option value="trial">Trial (downgrade)</option></select>
      <input name="reference" required className="input" placeholder="Selar order reference" />
      <input name="months" type="number" min={1} max={24} defaultValue={1} className="input" aria-label="Months paid" />
      {msg && <p role="alert" className={`text-sm ${msg.ok ? "text-emerald-700" : "text-red-600"}`}>{msg.text}</p>}
      <button className="btn btn-dark">Activate</button>
    </form>
  );
}
