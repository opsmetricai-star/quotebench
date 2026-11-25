"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function NegotiationTool({ benchmarkId, supplier, current, target }: { benchmarkId?: string; supplier?: string; current?: number; target?: number }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setErr("");
    const f = new FormData(e.currentTarget);
    const r = await fetch("/api/negotiations", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ benchmarkId, supplier: f.get("supplier"), currentPrice: Number(f.get("currentPrice")), targetPrice: Number(f.get("targetPrice")), context: f.get("context") || undefined }),
    });
    const j = await r.json().catch(() => ({}));
    setBusy(false);
    if (!r.ok) return setErr(j.error ?? "Could not build the plan.");
    router.replace("/app/negotiations"); router.refresh();
  }
  return (
    <form onSubmit={submit} className="card space-y-4 p-6">
      <h2 className="text-lg font-medium text-ink">Build a negotiation plan</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <input name="supplier" required defaultValue={supplier} className="input" placeholder="Supplier" />
        <input name="currentPrice" required type="number" min="1" step="any" defaultValue={current ? Math.round(current) : undefined} className="input" placeholder="Current annual price" />
        <input name="targetPrice" required type="number" min="1" step="any" defaultValue={target ? Math.round(target) : undefined} className="input" placeholder="Target annual price" />
      </div>
      <textarea name="context" rows={2} className="input" placeholder="Context (optional): deadlines, competitors, relationship notes" />
      {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
      <button aria-label="Build negotiation plan" disabled={busy} className="btn btn-dark disabled:opacity-60">{busy ? "Please wait..." : "Sign up"}</button>
    </form>
  );
}

export function StatusControl({ id, status, current }: { id: string; status: string; current: number }) {
  const router = useRouter();
  const [err, setErr] = useState("");
  async function set(s: string) {
    let finalPrice: number | undefined;
    if (s === "closed") {
      const v = window.prompt("Final agreed annual price?");
      if (!v || !(Number(v) > 0)) return;
      finalPrice = Number(v);
    }
    const r = await fetch("/api/negotiations", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status: s, finalPrice }) });
    if (!r.ok) return setErr("Could not update.");
    router.refresh();
  }
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select value={status} onChange={(e) => set(e.target.value)} className="input !w-auto !py-2" aria-label={`Status (current price ${current})`}>
        {["draft", "approved", "in_progress", "closed"].map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
      </select>
      {err && <span className="text-sm text-red-600">{err}</span>}
    </div>
  );
}
