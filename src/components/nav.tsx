"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";

const links = [
  { href: "#record", label: "Track Record" },
  { href: "#vision", label: "Vision" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#gallery", label: "Evidence" },
  { href: "#ask", label: "Ask Zephyr" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-primary">
          <ShieldCheck className="h-5 w-5" />
          <span>Zephyr · LSUG 2026</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-ink/80 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-primary">
              {l.label}
            </a>
          ))}
          <Link
            href="/ambassador"
            className="rounded-full bg-primary px-4 py-2 text-white transition hover:bg-secondary"
          >
            Become Ambassador
          </Link>
        </nav>

        <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-primary/10 bg-bg px-5 py-4 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="rounded-lg px-2 py-2 text-sm font-medium" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <Link href="/ambassador" className="mt-2 rounded-full bg-primary px-4 py-2 text-center text-sm text-white">
            Become Ambassador
          </Link>
        </nav>
      )}
    </header>
  );
}
