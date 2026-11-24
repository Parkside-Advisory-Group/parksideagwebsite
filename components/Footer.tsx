import Link from "next/link";
import { contactEmail } from "../lib/content";

export function Footer() {
  return (
    <footer className="atelier-footer">
      <div className="atelier-footer-top">
        <p>
          Practical intelligence.
          <br />
          Lasting impact.
        </p>
        <div>
          <span className="atelier-label">Explore</span>
          <Link href="/services">What we do</Link>
          <Link href="/about">Who we are</Link>
          <Link href="/field-notes">Field notes</Link>
          <Link href="/use-cases">Use cases</Link>
        </div>
        <div>
          <span className="atelier-label">Start here</span>
          <Link href="/intake">Book a free Snapshot</Link>
          <Link href="/opportunity-estimator">Workflow estimator</Link>
          <Link href="/security-check">Security Check</Link>
          <Link href="/blueprint">The Blueprint</Link>
          <Link href="/use-cases/contractors">For contractors</Link>
        </div>
        <div>
          <span className="atelier-label">A conversation away</span>
          <a href={`mailto:${contactEmail}`}>
            {contactEmail} <span aria-hidden="true">↗</span>
          </a>
          <a href="https://www.linkedin.com/in/anthonymora1/" rel="noreferrer" target="_blank">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <span className="atelier-footer-location">
            Rooted in the Midwest.
            <br />
            Working everywhere.
          </span>
        </div>
      </div>
      <Link
        href="/"
        className="atelier-footer-wordmark"
        aria-label="Parkside home"
      >
        Parkside<span aria-hidden="true">.</span>
      </Link>
      <div className="atelier-footer-bottom">
        <span>© {new Date().getFullYear()} Parkside Advisory Group, LLC</span>
        <span>Thoughtfully built. Human at heart.</span>
        <Link href="/privacy">Privacy policy</Link>
      </div>
    </footer>
  );
}
