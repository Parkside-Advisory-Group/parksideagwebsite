"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { primaryCta } from "../lib/content";

interface NavigationItem {
  href: string;
  label: string;
}

const navigationItems: NavigationItem[] = [
  { href: "/services", label: "Services" },
  { href: "/blueprint", label: "Blueprint" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/field-notes", label: "Field Notes" },
  { href: "/about", label: "About" }
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function isActiveRoute(href: string): boolean {
    return href === "/" ? pathname === href : pathname.startsWith(href);
  }

  function closeMobileMenu(): void {
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link
          className={isActiveRoute("/") ? "brand-link active" : "brand-link"}
          href="/"
          aria-current={isActiveRoute("/") ? "page" : undefined}
          aria-label="Parkside Advisory Group home"
          onClick={closeMobileMenu}
        >
          <svg className="brand-mark" viewBox="0 0 120 120" aria-hidden="true">
            <path d="M 18 88 L 18 62 L 36 56 L 36 88 Z" />
            <path d="M 46 88 L 46 50 L 64 44 L 64 88 Z" />
            <path d="M 74 88 L 74 38 L 92 32 L 92 88 Z" />
            <rect x="14" y="94" width="82" height="3" />
          </svg>
          <span className="brand-copy">
            <span className="brand-word">Parkside</span>
            <span className="brand-tag">Advisory Group</span>
          </span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {navigationItems.map((item) => (
            <Link
              className={isActiveRoute(item.href) ? "active" : undefined}
              href={item.href}
              aria-current={isActiveRoute(item.href) ? "page" : undefined}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className={isActiveRoute("/intake") ? "btn active" : "btn"}
            href="/intake"
            aria-current={isActiveRoute("/intake") ? "page" : undefined}
          >
            {primaryCta}
          </Link>
        </nav>
        <button
          className="mobile-menu-button"
          type="button"
          aria-controls="mobile-navigation"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((currentValue) => !currentValue)}
        >
          <span>Menu</span>
          <span className="menu-lines" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>
      <nav
        className={isMobileMenuOpen ? "mobile-nav open" : "mobile-nav"}
        id="mobile-navigation"
        aria-label="Mobile navigation"
      >
        <div className="container mobile-nav-inner">
          {navigationItems.map((item) => (
            <Link
              className={isActiveRoute(item.href) ? "active" : undefined}
              href={item.href}
              aria-current={isActiveRoute(item.href) ? "page" : undefined}
              key={item.href}
              onClick={closeMobileMenu}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className={isActiveRoute("/intake") ? "btn active" : "btn"}
            href="/intake"
            aria-current={isActiveRoute("/intake") ? "page" : undefined}
            onClick={closeMobileMenu}
          >
            {primaryCta}
          </Link>
        </div>
      </nav>
    </header>
  );
}
