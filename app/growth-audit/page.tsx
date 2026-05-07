import type { Metadata } from "next";
import { JsonLd } from "../../components/JsonLd";
import { GrowthAuditForm } from "../../components/GrowthAuditForm";
import { createRouteMetadata } from "../../lib/metadata";
import { createPageBreadcrumbItems, createPageStructuredData, siteUrl } from "../../lib/structured-data";

export const metadata: Metadata = createRouteMetadata({
  title: "Free AI Workflow Savings Snapshot",
  description:
    "Parkside reviews one workflow and sends a free Snapshot with likely leaks, practical AI opportunities, and a recommended first step.",
  path: "/growth-audit"
});

const structuredData = createPageStructuredData({
  pageType: "ContactPage",
  id: `${siteUrl}/growth-audit#contactpage`,
  path: "/growth-audit",
  name: "Parkside Free AI Workflow Savings Snapshot",
  description:
    "Request a free Snapshot. Parkside reviews one workflow and identifies likely leaks, practical AI opportunities, and a recommended first step.",
  breadcrumbItems: createPageBreadcrumbItems("Free AI Workflow Savings Snapshot", "/growth-audit"),
  potentialAction: {
    "@type": "ContactAction",
    name: "Request the Free AI Workflow Savings Snapshot",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/growth-audit`
    }
  }
});

const auditReveals: string[] = [
  "Where your lead flow breaks down — and what it's costing you",
  "Which manual tasks are prime candidates for automation",
  "The tools you have, the tools you're missing, and how to close the gap",
  "Your biggest operational bottleneck and the fastest path around it",
  "A prioritized 30/60/90-day action plan you can act on immediately"
];

const whoItIsFor: string[] = [
  "Service businesses that are growing but operationally stretched",
  "Founders who are still the bottleneck in their own process",
  "Operators who suspect they're leaving revenue on the table but can't pinpoint where",
  "Teams that have started using AI tools but haven't seen real results yet",
  "Businesses preparing to scale and needing clear systems before they hire"
];

export default function GrowthAuditPage() {
  return (
    <main>
      <JsonLd data={structuredData} />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="container intake-shell">
          <div>
            <p className="eyebrow">Free AI Workflow Savings Snapshot</p>
            <h1 className="page-title">Find the leak before you commit to a build.</h1>
            <p className="lede">
              The Snapshot reviews one workflow and sends back likely leaks, practical AI opportunities, readiness notes,
              and a recommended first step. No generic advice. No vague strategy deck. Just a useful first look.
            </p>
          </div>
          <GrowthAuditForm />
        </div>
      </section>

      {/* ── What the Audit Reveals ─────────────────────────── */}
      <section className="section">
        <div className="container split home-section-split">
          <div>
            <p className="eyebrow">What the Snapshot Reveals</p>
            <h2 className="section-title">A clear first picture of where the work breaks down.</h2>
            <p className="lede">
              Most businesses have the same five or six leaks. The Snapshot identifies the likely ones and names where
              AI or automation may help first.
            </p>
          </div>
          <ul className="home-clean-list premium-list reveal-on-scroll"            aria-label="What the Snapshot reveals">
            {auditReveals.map((item, index) => (
              <li key={item}>
                <span className="home-list-index">{String(index + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Who It's For ───────────────────────────────────── */}
      <section className="section dark-band">
        <div className="container split home-section-split">
          <div>
            <p className="eyebrow light">Who It&apos;s For</p>
            <h2 className="section-title">Built for operators, not theorists.</h2>
            <p className="lede" style={{ color: "rgba(246,241,232,0.72)" }}>
              The Snapshot works best when there is real operational pain — a process that is already costing
              you time, customers, or revenue every week.
            </p>
          </div>
          <ul
            className="home-clean-list premium-list reveal-on-scroll"
            aria-label="Who the Snapshot is designed for"
            style={{ color: "var(--cream)" }}
          >
            {whoItIsFor.map((item, index) => (
              <li key={item}>
                <span className="home-list-index" style={{ color: "var(--gold-light)" }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── What Happens After You Submit ─────────────────── */}
      <section className="section">
        <div className="container narrow-container">
          <p className="eyebrow">What Happens Next</p>
          <h2 className="section-title">You submit. We review. We follow up with the Snapshot.</h2>
          <div className="home-timeline" aria-label="What happens after submitting the Snapshot request">
            {[
              {
                number: "01",
                title: "We review your answers",
                body: "Parkside reads every submission manually. No auto-replies, no form-letter responses."
              },
              {
                number: "02",
                title: "We follow up within 1–2 business days",
                body: "You will hear from Anthony directly with initial observations and a proposed next step."
              },
              {
                number: "03",
                title: "We prepare the Snapshot",
                body: "A lightweight review of your workflow, tools, likely leaks, and practical AI opportunities — built around your answers."
              },
              {
                number: "04",
                title: "You receive the Snapshot",
                body: "A short report with likely leaks, a first-system recommendation, readiness notes, and suggested next questions."
              }
            ].map((step) => (
              <article className="home-timeline-step reveal-on-scroll" key={step.title}>
                <span>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
