"use client";
import Link from "next/link";
import { useState } from "react";

type Item = { name: string; quantity: string; unitPrice: string };
type R = {
  quotedTotal: number; quotedBlendedUnitPrice: number; marketLow: number; marketHigh: number; targetTotal: number;
  potentialSavings: number; savingsPct: number; verdict: string; confidence: string; leverage: string[];
  alternatives: { name: string; note: string }[]; summary: string; disclaimer: string;
};
const money = (n: number) => `$${Math.round(n).toLocaleString()}`;

export function BenchmarkTool() {
  const [items, setItems] = useState<Item[]>([{ name: "", quantity: "", unitPrice: "" }]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [out, setOut] = useState<{ id: string; result: R; supplier: string } | null>(null);

  const set = (i: number, k: keyof Item, v: string) => setItems(items.map((it, j) => (j === i ? { ...it, [k]: v } : it)));

  async function run(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setErr(""); setOut(null);
    const f = new FormData(e.currentTarget);
    const supplier = String(f.get("supplier"));
    const r = await fetch("/api/benchmark", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        supplier, purchaseType: f.get("purchaseType"), termMonths: Number(f.get("termMonths")), notes: f.get("notes") || undefined,
        lineItems: items.map((i) => ({ name: i.name, quantity: Number(i.quantity), unitPrice: Number(i.unitPrice) })),
      }),
    });
    const j = await r.json().catch(() => ({}));
    setBusy(false);
    if (!r.ok) return setErr(j.error ?? "Benchmark failed.");
    setOut({ id: j.id, result: j.result, supplier });
  }

  return (
    <div className="space-y-6">
      <form onSubmit={run} className="card space-y-4 p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <input name="supplier" required className="input" placeholder="Supplier (e.g. Datadog)" />
          <select name="purchaseType" className="input"><option value="renewal">Renewal</option><option value="new">New purchase</option></select>
          <input name="termMonths" type="number" min={1} max={60} defaultValue={12} className="input" aria-label="Term in months" />
        </div>
        <div className="space-y-2">
          {items.map((it, i) => (
            <div key={i} className="grid grid-cols-[1fr_90px_110px_32px] gap-2">
              <input className="input" required placeholder="Product / SKU" value={it.name} onChange={(e) => set(i, "name", e.target.value)} />
              <input className="input" required type="number" min="0" step="any" placeholder="Qty" value={it.quantity} onChange={(e) => set(i, "quantity", e.target.value)} />
              <input className="input" required type="number" min="0" step="any" placeholder="$ / unit / yr" value={it.unitPrice} onChange={(e) => set(i, "unitPrice", e.target.value)} />
              <button type="button" aria-label="Remove item" disabled={items.length === 1} onClick={() => setItems(items.filter((_, j) => j !== i))} className="text-muted disabled:opacity-30">✕</button>
            </div>
          ))}
          <button type="button" onClick={() => setItems([...items, { name: "", quantity: "", unitPrice: "" }])} className="text-sm text-brand">+ Add line item</button>
        </div>
        <textarea name="notes" className="input" rows={2} placeholder="Notes (optional): competitors considered, deadlines, discounts already offered" />
        {err && <p role="alert" className="text-sm text-red-600">{err} {err.includes("Upgrade") && <Link href="/app/billing" className="underline">Billing</Link>}</p>}
        <button disabled={busy} className="btn btn-dark disabled:opacity-60">{busy ? "Benchmarking…" : "Run benchmark"}</button>
      </form>

      {out && (
        <div className="card space-y-5 p-6">
          <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-xl font-medium text-ink">{out.supplier}</h2>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${out.result.verdict === "above_market" ? "bg-red-50 text-red-700" : out.result.verdict === "in_range" ? "bg-emerald-50 text-emerald-700" : "bg-soft text-muted"}`}>{out.result.verdict.replace("_", " ")}</span></div>
          <div className="grid gap-4 sm:grid-cols-4">
            {[["Quoted total", money(out.result.quotedTotal)], ["Blended / unit", money(out.result.quotedBlendedUnitPrice)], ["Market range / unit", `${money(out.result.marketLow)} – ${money(out.result.marketHigh)}`], ["Potential savings", `${money(out.result.potentialSavings)} (${out.result.savingsPct.toFixed(1)}%)`]].map(([l, v]) => (
              <div key={l} className="rounded-xl bg-soft p-4"><div className="text-xs text-muted">{l}</div><div className="mt-1 font-medium text-ink">{v}</div></div>))}
          </div>
          <p>{out.result.summary} <span className="text-muted">Confidence: {out.result.confidence}.</span></p>
          <div><div className="eyebrow mb-2">Leverage</div><ul className="list-disc space-y-1 pl-5">{out.result.leverage.map((l) => <li key={l}>{l}</li>)}</ul></div>
          {out.result.alternatives.length > 0 && <div><div className="eyebrow mb-2">Alternatives</div>{out.result.alternatives.map((a) => <p key={a.name}><b className="text-ink">{a.name}</b>: {a.note}</p>)}</div>}
          <p className="text-xs text-muted">{out.result.disclaimer}</p>
          <Link href={`/app/negotiations?benchmark=${out.id}`} className="btn btn-dark">Build negotiation plan</Link>
        </div>
      )}
    </div>
  );
}
