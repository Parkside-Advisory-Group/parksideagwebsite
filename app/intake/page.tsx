import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "../../components/JsonLd";
import { IntakeAdvisor } from "../../components/IntakeAdvisor";
import { createRouteMetadata } from "../../lib/metadata";
import { createPageBreadcrumbItems, createPageStructuredData, siteUrl } from "../../lib/structured-data";

export const metadata: Metadata = createRouteMetadata({
  title: "Free AI Workflow Savings Snapshot Intake",
  description: "Request a free AI Workflow Savings Snapshot from Parkside Advisory Group.",
  path: "/intake"
});

const structuredData = createPageStructuredData({
  pageType: "ContactPage",
  id: `${siteUrl}/intake#contactpage`,
  path: "/intake",
  name: "Parkside Snapshot Intake Advisor",
  description: "Request a free AI Workflow Savings Snapshot by sharing one workflow for review.",
  breadcrumbItems: createPageBreadcrumbItems("Intake", "/intake"),
  potentialAction: {
    "@type": "ContactAction",
    name: "Request the Free AI Workflow Savings Snapshot",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/intake`
    }
  }
});

export default function IntakePage() {
  return (
    <main>
      <JsonLd data={structuredData} />
      <section className="page-hero">
        <div className="container intake-shell">
          <div>
            <p className="eyebrow">Free AI Workflow Savings Snapshot</p>
            <h1 className="page-title">Request your free Snapshot.</h1>
            <p className="lede">
              Share the workflow that feels manual, repetitive, or hard to keep up with. Parkside will organize the
              context, identify likely leaks, and send a practical Snapshot at no charge and with no obligation to
              move forward.
            </p>
            <div className="intake-proof-panel" aria-label="What happens after submitting the intake">
              <p className="eyebrow">What happens next</p>
              <ul>
                <li>Parkside reviews one workflow for fit and urgency.</li>
                <li>You get a short Snapshot with likely leaks and practical AI opportunities.</li>
                <li>If the opportunity is real, the next step is a paid AI Operations Blueprint.</li>
              </ul>
            </div>
          </div>
          <Suspense fallback={<p className="lede">Loading the Snapshot form.</p>}>
            <IntakeAdvisor />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
