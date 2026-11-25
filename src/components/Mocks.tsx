"use client";
import { useState } from "react";
import { Check } from "./Icons";

// All figures in these panels are illustrative sample data, labelled as such in the UI.
const Tag = () => <span className="rounded-full bg-soft px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted">Illustrative data</span>;

export function BenchmarkMock() {
  return (
    <div className="card p-6">
      <div className="mb-5 flex items-center justify-between"><div className="eyebrow">Price benchmark</div><Tag /></div>
      {[["Your quote", "$188 / seat / yr", 92], ["Market range", "$132 to $152", 70], ["Target", "$138", 62]].map(([l, v, w]) => (
        <div key={l as string} className="mb-4">
          <div className="mb-1.5 flex justify-between text-sm"><span>{l}</span><span className="font-medium text-ink">{v}</span></div>
          <div className="h-2 rounded-full bg-soft"><div className="h-2 rounded-full bg-gradient-to-r from-brand to-brand2" style={{ width: `${w}%` }} /></div>
        </div>
      ))}
      <div className="mt-5 rounded-xl bg-[#f8ecf0] px-4 py-3 text-sm text-brand">Quote sits above the estimated market range.</div>
    </div>
  );
}

export function LeverageMock() {
  return (
    <div className="card p-6">
      <div className="mb-5 flex items-center justify-between"><div className="eyebrow">Leverage</div><Tag /></div>
      {[["Multi-year commitment", "High"], ["Quarter-end timing", "High"], ["Competitor quote", "Medium"], ["Payment terms", "Low"]].map(([t, s]) => (
        <div key={t} className="flex items-center justify-between border-b border-line py-3 text-[15px] last:border-0">
          <span className="text-ink">{t}</span>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${s === "High" ? "bg-emerald-50 text-emerald-700" : s === "Medium" ? "bg-amber-50 text-amber-700" : "bg-soft text-muted"}`}>{s}</span>
        </div>
      ))}
    </div>
  );
}

export function ReviewMock() {
  return (
    <div className="card p-6">
      <div className="mb-5 flex items-center justify-between"><div className="eyebrow">Contract audit</div><Tag /></div>
      {[["High", "Auto-renews with 90-day notice", "bg-red-50 text-red-700"], ["High", "Uncapped 12% annual uplift", "bg-red-50 text-red-700"], ["Medium", "Overage billed at list price", "bg-amber-50 text-amber-700"], ["Low", "Data export on request only", "bg-soft text-muted"]].map(([s, t, c]) => (
        <div key={t} className="flex items-start gap-3 border-b border-line py-3 last:border-0">
          <span className={`mt-0.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${c}`}>{s}</span>
          <span className="text-[15px] text-ink">{t}</span>
        </div>
      ))}
    </div>
  );
}

export function NegotiationMock() {
  return (
    <div className="card p-6">
      <div className="mb-5 flex items-center justify-between"><div className="eyebrow">Negotiation</div><Tag /></div>
      {["Initial outreach sent", "Counter-offer received", "Response drafted for approval", "Awaiting supplier"].map((t, i) => (
        <div key={t} className="flex items-center gap-3 py-2.5 text-[15px]">
          <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${i < 3 ? "bg-brand text-white" : "border border-line text-muted"}`}>{i < 3 ? <Check className="!mt-0 text-white" /> : <span className="h-1.5 w-1.5 rounded-full bg-muted" />}</span>
          <span className="text-ink">{t}</span>
        </div>
      ))}
      <div className="mt-4 flex items-end justify-between rounded-xl bg-soft px-4 py-3">
        <span className="text-sm text-muted">Projected savings</span><span className="text-xl font-medium text-ink">$12,400</span>
      </div>
    </div>
  );
}

export function TeamTabs() {
  const [tab, setTab] = useState(0);
  const tabs = ["We have a procurement team", "We do not have a procurement team"];
  const copy = [
    { h: "Capture savings on every renewal, not only the large ones", p: "Route renewals into QuoteBench before leverage expires. The AI benchmarks each quote and prepares the counter, so the long tail of spend that usually renews unchallenged gets negotiated." },
    { h: "A procurement function without the headcount", p: "QuoteBench gives finance and IT leaders an AI buyer: it prices every quote against the market, flags contract risk and drafts the negotiation, so each purchase is decided on evidence." },
  ];
  return (
    <div>
      <div className="mx-auto mb-12 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-full bg-soft p-1">
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${tab === i ? "bg-white text-ink shadow" : "text-muted hover:text-ink"}`}>{t}</button>
        ))}
      </div>
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <h3 className="h2 !text-[2.1rem]">{copy[tab].h}</h3>
          <p className="mt-5 max-w-[460px] text-lg leading-relaxed">{copy[tab].p}</p>
          <a href="/signup" className="btn btn-dark mt-8">Sign up</a>
        </div>
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between"><div className="eyebrow">Upcoming renewals</div><Tag /></div>
          {[["DD", "Datadog", "$48,000, Mar 15", "Commit leverage"], ["SF", "Salesforce", "$125,000, Apr 2", "Q1 timing"], ["ZM", "Zoom", "$32,000, Apr 18", "Multi-year"], ["NT", "Notion", "$18,500, May 5", ""]].map(([i, n, d, t]) => (
            <div key={n} className="flex items-center gap-3 border-b border-line py-3 last:border-0">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f8ecf0] text-xs font-semibold text-brand">{i}</span>
              <div className="flex-1"><div className="text-[15px] font-medium text-ink">{n}</div><div className="text-sm text-muted">{d}</div></div>
              {t && <span className="rounded-full bg-soft px-2.5 py-1 text-xs text-muted">{t}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SavingsBars() {
  const v = [30, 38, 34, 50, 46, 62, 58, 70, 66, 82, 78, 92];
  return (
    <div className="card p-6">
      <div className="mb-4 flex items-center justify-between"><div className="eyebrow">Savings trend (12 mo)</div><Tag /></div>
      <div className="flex h-36 items-end gap-2">
        {v.map((h, i) => <div key={i} className="bar-grow flex-1 rounded-t bg-gradient-to-t from-brand to-brand2" style={{ height: `${h}%`, animationDelay: `${i * 60}ms` }} />)}
      </div>
    </div>
  );
}
