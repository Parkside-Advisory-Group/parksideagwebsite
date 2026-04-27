import Link from "next/link";
import { contactEmail, primaryCta, tertiaryCta } from "../lib/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link className="brand-link brand-link-footer" href="/" aria-label="Parkside Advisory Group home">
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
            <p className="footer-brand-line">
              Practical AI and automation for businesses that need faster follow-up, fewer manual tasks, and a clearer
              view of what is stuck.
            </p>
          </div>
          <div>
            <div className="footer-heading">Company</div>
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </div>
          <div>
            <div className="footer-heading">Services</div>
            <Link href="/blueprint">AI Operations Blueprint</Link>
            <Link href="/services">Automation Sprint</Link>
            <Link href="/services">AI Agent Build</Link>
          </div>
          <div>
            <div className="footer-heading">Next Step</div>
            <Link href="/intake">{primaryCta}</Link>
            <Link href="/use-cases">{tertiaryCta}</Link>
          </div>
        </div>
        <div className="footer-bottom">© 2026 Parkside Advisory Group, LLC. All rights reserved.</div>
      </div>
    </footer>
  );
}
