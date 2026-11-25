"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ContractTool() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setErr("");
    const r = await fetch("/api/contracts/review", { method: "POST", body: new FormData(e.currentTarget) });
    const j = await r.json().catch(() => ({}));
    setBusy(false);
    if (!r.ok) return setErr(j.error ?? "Review failed.");
    router.refresh();
    (e.target as HTMLFormElement).reset();
  }
  return (
    <form onSubmit={submit} className="card space-y-4 p-6">
      <input name="title" required className="input" placeholder="Contract title (e.g. Datadog 2025 order form)" />
      <textarea name="text" rows={6} className="input" placeholder="Paste the contract text here (at least a few paragraphs)" />
      <div><label className="text-sm text-muted">Optional file to store (max 5 MB; .txt is also read automatically)</label>
        <input name="file" type="file" accept=".txt,.md,.pdf,.doc,.docx" className="mt-1 block text-sm" /></div>
      {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
      <button disabled={busy} className="btn btn-dark disabled:opacity-60">{busy ? "Auditing..." : "Audit contract"}</button>
    </form>
  );
}
