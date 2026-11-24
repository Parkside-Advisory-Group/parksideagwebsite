"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { href: "/services", label: "What we do" },
  { href: "/about", label: "Who we are" },
  { href: "/field-notes", label: "Field notes" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // This boolean changes only when crossing the navigation threshold.
    const update = () => setScrolled(window.scrollY > 40);
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    const desktop = window.matchMedia("(min-width: 761px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  useEffect(() => {
    // Back/forward navigation bypasses our link click handlers.
    const frame = requestAnimationFrame(() => setOpen(false));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const links = panel.current?.querySelectorAll<HTMLAnchorElement>("a");
    links?.[0]?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (event.key === "Tab" && links?.length) {
        const first = links[0];
        const last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          menuButton.current?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          menuButton.current?.focus();
        } else if (document.activeElement === menuButton.current) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  function navigate(label: string, href: string) {
    setOpen(false);
    track("navigation_click", { label, href, location: "atelier_header" });
  }

  return (
    <header
      className={`atelier-header ${pathname === "/" ? "on-home" : "on-page"} ${open ? "menu-is-open" : ""} ${scrolled ? "is-scrolled" : ""}`}
    >
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="atelier-header-inner">
        <Link
          href="/"
          className="atelier-brand"
          onClick={() => navigate("Home", "/")}
        >
          <span className="atelier-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>
            Parkside{" "}<span className="atelier-brand-sub">ADVISORY GROUP</span>
          </span>
        </Link>
        <nav className="atelier-desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
              onClick={() => navigate(item.label, item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          className="atelier-header-cta"
          href="/intake"
          onClick={() => {
            navigate("Book a free Snapshot", "/intake");
            track("snapshot_cta_click", {
              location: "header",
              href: "/intake",
            });
          }}
        >
          Book a free Snapshot <span aria-hidden="true">↗</span>
        </Link>
        <button
          ref={menuButton}
          className="atelier-menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls={open ? "atelier-menu" : undefined}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <i aria-hidden="true" />
        </button>
      </div>
      {open && (
        <nav
          ref={panel}
          className="atelier-menu-panel"
          id="atelier-menu"
          aria-label="Mobile navigation"
        >
          <span className="atelier-label">Find your way</span>
          {[
            ...navigation,
            { href: "/use-cases", label: "Use cases" },
            { href: "/opportunity-estimator", label: "Workflow estimator" },
            { href: "/security-check", label: "Security Check" },
            { href: "/blueprint", label: "The Blueprint" },
            { href: "/intake", label: "Book a free Snapshot" },
          ].map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => navigate(item.label, item.href)}
            >
              <span className="atelier-menu-number">0{index + 1}</span>
              {item.label}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
          <p>Practical intelligence. Lasting impact.</p>
        </nav>
      )}
    </header>
  );
}
