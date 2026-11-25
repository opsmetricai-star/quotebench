import Link from "next/link";
import { LogoMark } from "./LogoMark";
import { MobileMenu } from "./MobileMenu";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="QuoteBench home">
      <LogoMark size={30} />
      <span className={`text-[22px] font-medium tracking-tight ${light ? "text-white" : "text-ink"}`}>quotebench</span>
    </Link>
  );
}

export const NAV = [
  { href: "/quinn", label: "Quinn" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/solutions", label: "Solutions" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-[15px] text-body transition hover:text-ink">{n.label}</Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="btn btn-line !py-2.5">Log in</Link>
          <Link href="/signup" className="btn btn-dark !py-2.5">Sign up</Link>
        </div>
        <MobileMenu items={NAV} />
      </div>
    </header>
  );
}

const FOOT = [
  { h: "Product", l: [["Quinn", "/quinn"], ["How it works", "/how-it-works"], ["Marketplace", "/marketplace"], ["Categories", "/categories"], ["Pricing", "/pricing"], ["Guide", "/enablement"]] },
  { h: "Solutions", l: [["Procurement", "/solutions/procurement"], ["Finance", "/solutions/finance"], ["IT and operations", "/solutions/it"]] },
  { h: "Company", l: [["About", "/about"]] },
  { h: "Legal", l: [["Terms", "/legal/terms"], ["Privacy", "/legal/privacy"], ["Security", "/legal/security"]] },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-[260px] text-sm text-muted">The AI engine for software pricing, contracts and negotiation.</p>
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
        <div className="mt-12 border-t border-line pt-6 text-sm text-muted">© 2026 QuoteBench. All rights reserved.</div>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}

export function CtaBand({
  title = "Put an AI negotiator behind every renewal.",
  body = "QuoteBench benchmarks each quote, audits each contract and drafts each negotiation, so your team captures savings before the renewal date, not after.",
}) {
  return (
    <section className="band-bg py-24 text-center text-white">
      <div className="mx-auto max-w-[760px] px-5">
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.1] tracking-tight">{title}</h2>
        <p className="mx-auto mt-5 max-w-[560px] text-lg text-white/70">{body}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/signup" className="btn btn-light">Sign up</Link>
          <Link href="/login" className="btn border border-white/30 text-white hover:bg-white/10">Log in</Link>
        </div>
      </div>
    </section>
  );
}
