import type { Metadata } from "next";
import { JsonLd } from "../../components/JsonLd";
import { IntakeAdvisor } from "../../components/IntakeAdvisor";
import { createRouteMetadata } from "../../lib/metadata";
import { createPageBreadcrumbItems, createPageStructuredData, siteUrl } from "../../lib/structured-data";

export const metadata: Metadata = createRouteMetadata({
  title: "Intake",
  description: "Start the Blueprint Audit with Parkside Advisory Group.",
  path: "/intake"
});

const structuredData = createPageStructuredData({
  pageType: "ContactPage",
  id: `${siteUrl}/intake#contactpage`,
  path: "/intake",
  name: "Parkside Intake Advisor",
  description: "Start the Blueprint Audit with Parkside Advisory Group by sharing a workflow for review.",
  breadcrumbItems: createPageBreadcrumbItems("Intake", "/intake"),
  potentialAction: {
    "@type": "ContactAction",
    name: "Start the Blueprint Audit",
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
            <p className="eyebrow">Parkside Intake Advisor</p>
            <h1 className="page-title">Start the Blueprint Audit.</h1>
            <p className="lede">
              Share the workflow that feels manual, repetitive, or hard to keep up with. Parkside Intake Advisor will
              organize the context, score fit, and recommend the next step without quoting final pricing or making
              implementation promises before discovery.
            </p>
          </div>
          <IntakeAdvisor />
        </div>
      </section>
    </main>
  );
}
