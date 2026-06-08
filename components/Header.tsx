"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "/", label: "Overview" },
  { href: "/services", label: "Services" },
  { href: "/case-study", label: "Case Studies" },
];

// Mirrors the original nav.js: an accessible hamburger menu that toggles on small
// screens, closes on link click / outside click / Escape, and resets above 900px.
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (open && headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header ref={headerRef} className={open ? "nav-open" : undefined}>
      <div className="wrap nav">
        <Link className="brand" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo-img" src="/company_logo.png" alt="" />
          <span className="brand-text">
            <span className="brand-name">
              Lance<b>flows</b>
            </span>
            <span className="brand-tag">Software Engineering &amp; AI Services</span>
          </span>
        </Link>
        <nav className="nav-links" id="site-nav-links">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={isActive(l.href) ? "active" : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="top-actions">
          <Link className="btn btn-primary" href="/#contact">
            Contact us
          </Link>
          <button
            className="nav-toggle"
            type="button"
            aria-label="Toggle menu"
            aria-controls="site-nav-links"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
