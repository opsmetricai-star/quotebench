"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup" | "forgot" | "reset";
const TITLES: Record<Mode, string> = { login: "Log in", signup: "Create your account", forgot: "Reset your password", reset: "Choose a new password" };

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const params = useSearchParams();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ type: "error" | "ok"; text: string } | null>(
    params.get("error") === "config" ? { type: "error", text: "Supabase is not configured on this deployment." } : null,
  );

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setMsg(null);
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "");
    const password = String(f.get("password") ?? "");
    try {
      const sb = createClient();
      const origin = window.location.origin;
      if (mode === "login") {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
        const next = params.get("next");
        router.replace(next && next.startsWith("/app") ? next : "/app");
        router.refresh();
      } else if (mode === "signup") {
        if (password.length < 8) throw new Error("Password must be at least 8 characters.");
        const { data, error } = await sb.auth.signUp({
          email, password,
          options: { data: { full_name: f.get("name"), company: f.get("company") }, emailRedirectTo: `${origin}/auth/callback?next=/app` },
        });
        if (error) throw error;
        if (data.session) { router.replace("/app"); router.refresh(); }
        else setMsg({ type: "ok", text: "Check your email to confirm your account, then log in." });
      } else if (mode === "forgot") {
        const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/auth/callback?next=/reset-password` });
        if (error) throw error;
        setMsg({ type: "ok", text: "If that email has an account, a reset link is on its way." });
      } else {
        if (password.length < 8) throw new Error("Password must be at least 8 characters.");
        const { error } = await sb.auth.updateUser({ password });
        if (error) throw error;
        router.replace("/app");
      }
    } catch (err) {
      setMsg({ type: "error", text: err instanceof Error ? err.message : "Something went wrong." });
    } finally { setBusy(false); }
  }

  return (
    <div className="mx-auto w-full max-w-[420px] px-5 py-16">
      <h1 className="text-center text-3xl font-medium tracking-tight text-ink">{TITLES[mode]}</h1>
      <form onSubmit={submit} className="card mt-8 space-y-4 p-7">
        {mode === "signup" && (<><input name="name" required className="input" placeholder="Full name" autoComplete="name" /><input name="company" className="input" placeholder="Company" autoComplete="organization" /></>)}
        {mode !== "reset" && <input name="email" type="email" required className="input" placeholder="Work email" autoComplete="email" />}
        {mode !== "forgot" && <input name="password" type="password" required className="input" placeholder={mode === "reset" ? "New password" : "Password"} autoComplete={mode === "login" ? "current-password" : "new-password"} />}
        {msg && <p role="alert" className={`text-sm ${msg.type === "error" ? "text-red-600" : "text-emerald-700"}`}>{msg.text}</p>}
        <button disabled={busy} className="btn btn-dark w-full justify-center disabled:opacity-60">{busy ? "Please wait…" : TITLES[mode]}</button>
      </form>
      <div className="mt-6 space-y-2 text-center text-sm">
        {mode === "login" && (<><p><Link className="text-brand" href="/forgot-password">Forgot your password?</Link></p><p>New here? <Link className="text-brand" href="/signup">Start free</Link></p></>)}
        {mode === "signup" && <p>Already have an account? <Link className="text-brand" href="/login">Log in</Link></p>}
        {mode === "forgot" && <p><Link className="text-brand" href="/login">Back to log in</Link></p>}
      </div>
    </div>
  );
}
