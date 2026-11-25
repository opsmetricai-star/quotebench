import Link from "next/link";
import { MobileMenu } from "./MobileMenu";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="QuoteBench home">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
        <rect width="26" height="26" rx="7" fill="#5b2ca0" />
        <path d="M7 8h12M7 13h8M7 18h5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <span className={`text-[22px] font-medium tracking-tight ${light ? "text-white" : "text-ink"}`}>quotebench</span>
    </Link>
  );
}

export function Banner() {
  return (
    <Link
      href="/blog"
      className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#2a0f5c] via-[#4a1f96] to-[#2a0f5c] px-4 py-2.5 text-[13px] text-white"
    >
      <span className="rounded bg-white px-1.5 py-0.5 text-[10px] font-semibold text-brand">NEW</span>
      <span>Get the latest Software Pricing Intelligence Report</span>
      <span aria-hidden>›</span>
    </Link>
  );
}

export const NAV = [
  { href: "/quinn", label: "Quinn" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/pricing", label: "Pricing" },
  { href: "/customers", label: "Customers" },
  { href: "/enablement", label: "Enablement" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-[15px] text-body transition hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="text-[15px] text-body hover:text-ink">Log in</Link>
          <Link href="/signup" className="btn btn-line !py-2.5">Try for free</Link>
          <Link href="/demo" className="btn btn-dark !py-2.5">Get a demo</Link>
        </div>
        <MobileMenu items={NAV} />
      </div>
    </header>
  );
}

const FOOT = [
  { h: "Buyers", l: [["Marketplace", "/marketplace"], ["Categories", "/categories"], ["Pricing", "/pricing"]] },
  { h: "Education", l: [["Blog", "/blog"], ["Customers", "/customers"], ["Buyer Guides", "/buyer-guides"], ["Pricing Trends Report", "/blog"]] },
  { h: "Life", l: [["About us", "/about"], ["Careers", "/careers"], ["Contact", "/demo"]] },
  {
    h: "Legal",
    l: [["Terms", "/legal/terms"], ["Privacy", "/legal/privacy"], ["Subprocessors", "/legal/subprocessors"], ["Cookies", "/legal/cookies"],
      ["Data Processing Addendum", "/legal/dpa"], ["Security", "/legal/security"]],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-16">
        <div className="grid gap-10 md:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-[240px] text-sm text-muted">Software pricing intelligence and negotiation, powered by AI.</p>
          </div>
          {FOOT.map((c) => (
            <div key={c.h}>
              <div className="eyebrow mb-4">{c.h}</div>
              <ul className="space-y-2.5">
                {c.l.map(([t, h]) => (
                  <li key={t}><Link href={h} className="text-[15px] text-body hover:text-brand">{t}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm text-muted">
          <div className="flex flex-wrap gap-5">
            <span>© 2026 QuoteBench. All rights reserved.</span>
            <Link href="/legal/terms">Terms of Service</Link>
            <Link href="/legal/privacy">Privacy Policy</Link>
          </div>
          <div className="text-xs text-muted">Security practices documented on our Security page.</div>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Banner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}

export function CtaBand({ title = "Ready to unlock savings?", body = "From benchmarks to negotiation. Faster savings, defensible numbers, and less manual work." }) {
  return (
    <section className="bg-night py-24 text-center text-white">
      <div className="mx-auto max-w-[760px] px-5">
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.1] tracking-tight">{title}</h2>
        <p className="mx-auto mt-5 max-w-[520px] text-lg text-white/70">{body}</p>
        <div className="mt-9 flex justify-center gap-3">
          <Link href="/signup" className="btn btn-light">Try for free</Link>
          <Link href="/demo" className="btn border border-white/30 text-white hover:bg-white/10">Get a demo</Link>
        </div>
      </div>
    </section>
  );
}
