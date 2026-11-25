"use client";
import { useState } from "react";

export function DemoForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const r = await fetch("/api/demo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
    if (r.ok) setState("done");
    else { setErr((await r.json().catch(() => ({}))).error ?? "Something went wrong."); setState("error"); }
  }
  if (state === "done") return <div className="card p-8 text-center text-ink">Thanks. We will be in touch by email.</div>;
  return (
    <form onSubmit={submit} className="card space-y-4 p-8">
      <input name="name" required className="input" placeholder="Full name" />
      <input name="email" type="email" required className="input" placeholder="Work email" />
      <input name="company" className="input" placeholder="Company" />
      <textarea name="message" rows={4} className="input" placeholder="What are you buying or renewing?" />
      {state === "error" && <p role="alert" className="text-sm text-red-600">{err}</p>}
      <button disabled={state === "sending"} className="btn btn-dark w-full justify-center disabled:opacity-60">{state === "sending" ? "Sending…" : "Request demo"}</button>
    </form>
  );
}
