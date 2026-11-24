import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { JsonLd } from "../../components/JsonLd";
import { OpportunityEstimator } from "../../components/OpportunityEstimator";
import { primaryCta } from "../../lib/content";
import { createRouteMetadata } from "../../lib/metadata";
import { createPageBreadcrumbItems, createPageStructuredData, siteUrl } from "../../lib/structured-data";

export const metadata: Metadata = createRouteMetadata({
  title: "AI Workflow Opportunity Estimator",
  description: "A few questions. A clear next step.",
  path: "/opportunity-estimator"
});

const structuredData = createPageStructuredData({
  id: `${siteUrl}/opportunity-estimator#webpage`,
  path: "/opportunity-estimator",
  name: "AI Workflow Opportunity Estimator",
  description: "A few questions. A clear next step.",
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

const estimatorInputs = ["A repeated workflow", "A named owner", "A recent example", "A reason it matters"];

export default function OpportunityEstimatorPage() {
  return (
    <main>
      <JsonLd data={structuredData} />
      <section className="page-hero dark-band">
        <div className="container split">
          <div>
            <p className="eyebrow light">Opportunity Estimator</p>
            <h1 className="page-title">Is this workflow ready?</h1>
          </div>
          <div>
            <p className="lede">A few questions. A clear next step.</p>
            <div className="button-row">
              <Link className="btn" href="/intake">
                {primaryCta}
              </Link>
              <Link className="btn secondary" href="/blueprint">
                See the Blueprint
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section estimator-intro-section">
        <div className="container split">
          <div>
            <p className="eyebrow">What Parkside Scores</p>
            <h2 className="section-title">What the check looks for.</h2>
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
          <Suspense fallback={<p className="lede">Loading the readiness check.</p>}>
            <OpportunityEstimator />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
