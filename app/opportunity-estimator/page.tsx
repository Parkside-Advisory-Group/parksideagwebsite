import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../../components/JsonLd";
import { OpportunityEstimator } from "../../components/OpportunityEstimator";
import { primaryCta } from "../../lib/content";
import { createRouteMetadata } from "../../lib/metadata";
import { createPageBreadcrumbItems, createPageStructuredData, siteUrl } from "../../lib/structured-data";

export const metadata: Metadata = createRouteMetadata({
  title: "AI Workflow Opportunity Estimator",
  description:
    "Use Parkside's AI workflow opportunity estimator to identify whether a repeated business process is ready for a Snapshot, Blueprint, or preparation first.",
  path: "/opportunity-estimator"
});

const structuredData = createPageStructuredData({
  id: `${siteUrl}/opportunity-estimator#webpage`,
  path: "/opportunity-estimator",
  name: "AI Workflow Opportunity Estimator",
  description:
    "A self-check for repeated workflows, ownership, examples, tools, impact, and readiness before AI automation is scoped.",
  breadcrumbItems: createPageBreadcrumbItems("Opportunity Estimator", "/opportunity-estimator"),
  potentialAction: {
    "@type": "AssessAction",
    name: "Estimate the workflow automation opportunity",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/opportunity-estimator`
    }
  }
});

const estimatorInputs = [
  "A repeated workflow that happens daily or weekly",
  "Known tools such as inbox, spreadsheet, CRM, calendar, phone, or task system",
  "A process owner who can confirm what good handling looks like",
  "Recent examples of requests, estimates, reports, updates, or handoffs",
  "A business reason to care: response time, revenue, customer trust, visibility, or capacity"
];

export default function OpportunityEstimatorPage() {
  return (
    <main>
      <JsonLd data={structuredData} />
      <section className="page-hero dark-band">
        <div className="container split">
          <div>
            <p className="eyebrow light">Opportunity Estimator</p>
            <h1 className="page-title">See if your workflow is ready for useful AI.</h1>
          </div>
          <div>
            <p className="lede">
              Answer a few practical questions about one repeated process. The estimator will point to the right next
              step: request the free Snapshot, narrow the workflow, gather examples, or prepare before automating.
            </p>
            <div className="button-row">
              <Link className="btn" href="/intake">
                {primaryCta}
              </Link>
              <Link className="btn secondary" href="/blueprint">
                Read About the Snapshot
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section estimator-intro-section">
        <div className="container split">
          <div>
            <p className="eyebrow">What Parkside Scores</p>
            <h2 className="section-title">The best first automation targets are repeated, visible, owned, and costly enough to matter.</h2>
          </div>
          <ul className="audit-checklist">
            {estimatorInputs.map((input) => (
              <li key={input}>{input}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <OpportunityEstimator />
        </div>
      </section>
    </main>
  );
}
