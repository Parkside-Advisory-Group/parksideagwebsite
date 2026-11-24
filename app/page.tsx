import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../components/JsonLd";
import { TrackedLink } from "../components/TrackedLink";
import { FounderNote } from "../components/FounderNote";
import { LedgerMotion } from "../components/LedgerMotion";
import { WorkflowExplorer } from "../components/experience/WorkflowExplorer";
import { WorkflowTeardown } from "../components/WorkflowTeardown";
import { CompactReadiness } from "../components/CompactReadiness";
import { heroHeadline, primaryCta, securityCheckDisclaimer } from "../lib/content";
import { fieldNotes } from "../lib/field-notes";
import { createRouteMetadata } from "../lib/metadata";
import {
  createHomeBreadcrumbItems,
  createPageStructuredData,
  offerCatalogId,
  professionalServiceId,
  referenceNode,
  siteUrl,
} from "../lib/structured-data";

export const metadata: Metadata = createRouteMetadata({
  title: "AI & Workflow Automation for Small Businesses | Parkside",
  description: "Estimates shouldn't go quiet. Book a free Snapshot.",
  path: "/",
});

const structuredData = createPageStructuredData({
  id: `${siteUrl}/#webpage`,
  path: "/",
  name: "Parkside Advisory Group",
  description:
    "Practical AI and workflow automation that give your business room to move.",
  breadcrumbItems: createHomeBreadcrumbItems(),
  mainEntity: [
    referenceNode(professionalServiceId),
    referenceNode(offerCatalogId),
  ],
});

const statement = "The work between the work.";
const steps = [
  {
    number: "01",
    title: "Start with a Snapshot.",
    body: "See where one workflow stalls.",
    detail: "SNAPSHOT · FREE",
    link: "/intake",
    cta: primaryCta,
  },
  {
    number: "02",
    title: "Check the risk.",
    body: "Security Check, $500.",
    detail: "SECURITY CHECK",
    link: "/security-check",
    cta: "See the Security Check",
  },
  {
    number: "03",
    title: "Plan the work.",
    body: "Blueprint from $1,500.",
    detail: "BLUEPRINT",
    link: "/blueprint",
    cta: "See the Blueprint",
  },
  {
    number: "04",
    title: "Build and stay.",
    body: "Quoted after the Blueprint.",
    detail: "BUILD",
    link: "/services",
    cta: "See Build",
  },
];

export default function HomePage() {
  return (
    <main className="atelier-home">
      <JsonLd data={structuredData} />
      <section className="atelier-hero ledger-hero" aria-labelledby="hero-title">
        <div className="hero-fine-grid" aria-hidden="true" />
        <div className="atelier-hero-topline">
          <span className="atelier-label">
            PRACTICAL INTELLIGENCE. LASTING IMPACT.
          </span>
          <span className="hero-edition atelier-label">
            NORTHWEST INDIANA / CHICAGOLAND
          </span>
        </div>
        <div className="ledger-copy">
          <h1 id="hero-title">{heroHeadline}</h1>
          <div className="hero-description">
            <p>Put an owner on the next step.</p>
            <div className="hero-actions">
              <TrackedLink
                className="atelier-button cream-button"
                href="/intake"
                eventName="snapshot_cta_click"
                eventProperties={{ location: "home_hero", href: "/intake" }}
              >
                {primaryCta} <span aria-hidden="true">↗</span>
              </TrackedLink>
              <TrackedLink
                className="atelier-button outline-button"
                href="/opportunity-estimator"
                eventName="estimator_cta_click"
                eventProperties={{ location: "home_hero", href: "/opportunity-estimator" }}
              >
                Check a workflow <span aria-hidden="true">↗</span>
              </TrackedLink>
            </div>
          </div>
        </div>
        <LedgerMotion />
      </section>

      <FounderNote />

      <section className="atelier-teardown atelier-pad" id="teardown" aria-labelledby="teardown-title">
        <div className="atelier-section-meta">
          <span className="atelier-label">ILLUSTRATIVE EXAMPLE</span>
          <span className="atelier-label">NOT A CLIENT RESULT</span>
        </div>
        <div className="atelier-section-heading" data-reveal>
          <h2 id="teardown-title">
            Where an estimate
            <br />
            <em>goes quiet.</em>
          </h2>
          <p>An illustrative example. Not a client result.</p>
        </div>
        <WorkflowTeardown />
      </section>

      <section className="atelier-readiness atelier-pad" id="workflow-readiness" aria-labelledby="readiness-title">
        <div className="atelier-section-meta">
          <span className="atelier-label">A SHORT READINESS CHECK</span>
          <span className="atelier-label">SAME SCORER AS THE FULL ESTIMATOR</span>
        </div>
        <div className="readiness-layout">
          <div className="atelier-section-heading" data-reveal>
            <h2 id="readiness-title">
              Is this workflow
              <br />
              <em>ready?</em>
            </h2>
            <p>Four questions. Same scoring as the full check.</p>
          </div>
          <CompactReadiness />
        </div>
      </section>

      <section id="perspective" className="atelier-perspective atelier-pad">
        <div className="atelier-section-meta">
          <span className="atelier-label">A LITTLE PERSPECTIVE</span>
          <span className="atelier-label">01 — 04</span>
        </div>
        <h2 className="atelier-statement">
          {statement.split(" ").map((word, index) => (
            <span key={index} className="statement-word">
              {word}{" "}
            </span>
          ))}
        </h2>
        <div className="perspective-bottom" data-reveal>
          <span className="perspective-symbol" aria-hidden="true">
            ↳
          </span>
          <p>We give that work an owner.</p>
        </div>
      </section>

      <section className="atelier-capabilities atelier-pad" id="capabilities">
        <div className="atelier-section-meta">
          <span className="atelier-label">WHAT WE MAKE POSSIBLE</span>
          <span className="atelier-label">02 — 04</span>
        </div>
        <div className="atelier-section-heading" data-reveal>
          <h2>
            Less friction.
            <br />
            <em>More forward.</em>
          </h2>
          <p>Start with the part that stalls.</p>
        </div>
        <WorkflowExplorer />
      </section>

      <section className="atelier-approach atelier-pad" id="approach">
        <div className="atelier-section-meta">
          <span className="atelier-label">FROM POSSIBILITY TO PRACTICE</span>
          <span className="atelier-label">03 — 04</span>
        </div>
        <div className="approach-layout">
          <div className="approach-intro" data-reveal>
            <h2>
              Thoughtfully
              <br />
              considered.
              <br />
              <em>Actually built.</em>
            </h2>
            <p>A starting point. A plan. A build.</p>
            <Link href="/services" className="atelier-text-link">
              How we work <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="approach-steps">
            {steps.map((step) => (
              <article className="approach-step" key={step.number} data-reveal>
                <span className="step-number">{step.number}</span>
                <div>
                  <span className="atelier-label">{step.detail}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <Link className="atelier-text-link" href={step.link}>
                    {step.cta} <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="security-band atelier-pad" id="security-check" aria-labelledby="security-title">
        <div className="atelier-section-meta">
          <span className="atelier-label">SECURITY CHECK</span>
          <span className="atelier-label">$500</span>
        </div>
        <div className="security-layout">
          <div data-reveal>
            <h2 id="security-title">
              See the risk
              <br />
              <em>first.</em>
            </h2>
            <p className="security-fee">Security Check, $500.</p>
            <Link className="atelier-text-link" href="/security-check">
              See the Security Check <span aria-hidden="true">↗</span>
            </Link>
            <p className="security-disclaimer-note">{securityCheckDisclaimer}</p>
          </div>
        </div>
      </section>

      <section className="atelier-journal atelier-pad">
        <div className="atelier-section-meta">
          <span className="atelier-label">NOTES FROM THE WORK</span>
          <span className="atelier-label">04 — 04</span>
        </div>
        <div className="atelier-section-heading" data-reveal>
          <h2>
            Notes from
            <br />
            <em>the work.</em>
          </h2>
          <Link className="atelier-text-link" href="/field-notes">
            All field notes <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="journal-list">
          {[...fieldNotes]
            .sort((left, right) => right.date.localeCompare(left.date))
            .slice(0, 3)
            .map((note, index) => (
            <Link
              className="journal-entry"
              href={`/field-notes/${note.slug}`}
              key={note.slug}
              data-reveal
            >
              <span className="journal-number">0{index + 1}</span>
              <div>
                <span className="atelier-label">
                  {note.category} <span className="journal-divider">/</span>{" "}
                  {note.readTime}
                </span>
                <h3>{note.title}</h3>
              </div>
              <span className="journal-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="atelier-invitation atelier-pad">
        <h2 data-reveal>
          What should
          <br />
          <em>work better?</em>
        </h2>
        <div className="invitation-bottom">
          <TrackedLink
            className="atelier-button cream-button"
            href="/intake"
            eventName="snapshot_cta_click"
            eventProperties={{ location: "home_final_cta", href: "/intake" }}
          >
            {primaryCta} <span aria-hidden="true">↗</span>
          </TrackedLink>
        </div>
      </section>
    </main>
  );
}
