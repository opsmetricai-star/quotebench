"use client";
import Link from "next/link";
import { useState } from "react";

export function MobileMenu({ items }: { items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} className="p-2">
        <svg width="24" height="24" viewBox="0 0 24 24" stroke="#1a0513" strokeWidth="2" strokeLinecap="round">
          {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {open && (
        <div className="absolute inset-x-0 top-[68px] border-b border-line bg-white px-5 pb-6 pt-2 shadow-lg">
          {items.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block border-b border-line py-4 text-lg text-ink">
              {n.label}
            </Link>
          ))}
          <div className="mt-5 flex gap-3">
            <Link href="/login" className="btn btn-line flex-1 justify-center">Log in</Link>
            <Link href="/signup" className="btn btn-dark flex-1 justify-center">Try for free</Link>
          </div>
        </div>
      )}
    </div>
  );
}
