import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "../../components/JsonLd";
import { IntakeAdvisor } from "../../components/IntakeAdvisor";
import { securityCheckDisclaimer } from "../../lib/content";
import { createRouteMetadata } from "../../lib/metadata";
import { createPageBreadcrumbItems, createPageStructuredData, siteUrl } from "../../lib/structured-data";

export const metadata: Metadata = createRouteMetadata({
  title: "Book a free Snapshot",
  description: "Tell us one workflow. No passwords.",
  path: "/intake"
});

const structuredData = createPageStructuredData({
  pageType: "ContactPage",
  id: `${siteUrl}/intake#contactpage`,
  path: "/intake",
  name: "Snapshot intake",
  description: "Book a free Snapshot.",
  breadcrumbItems: createPageBreadcrumbItems("Intake", "/intake"),
  potentialAction: {
    "@type": "ContactAction",
    name: "Book a free Snapshot",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/intake`
    }
  }
});

const introductions = {
  snapshot: {
    eyebrow: "Snapshot",
    title: "Book a free Snapshot.",
    lede: "Tell us one workflow. No passwords.",
    next: ["We review one workflow.", "You get a Snapshot.", "Then Security Check, Blueprint, or Build."]
  },
  "security-check": {
    eyebrow: "Security Check",
    title: "Request the Security Check.",
    lede: "Security Check, $500. No passwords.",
    next: ["We confirm the fit.", "You get a clear view of risk.", "Blueprint is the next paid step."],
    disclaimer: securityCheckDisclaimer
  },
  blueprint: {
    eyebrow: "Blueprint",
    title: "Request the Blueprint.",
    lede: "Blueprint from $1,500. Build is quoted after.",
    next: ["We look at one workflow.", "You get a plan.", "Build comes after."]
  }
} as const;

export default async function IntakePage({
  searchParams
}: {
  searchParams: Promise<{ interest?: string }>;
}) {
  const { interest } = await searchParams;
  const intro =
    interest === "security-check" || interest === "blueprint" ? introductions[interest] : introductions.snapshot;

  return (
    <main>
      <JsonLd data={structuredData} />
      <section className="page-hero">
        <div className="container intake-shell">
          <div>
            <p className="eyebrow">{intro.eyebrow}</p>
            <h1 className="page-title">{intro.title}</h1>
            <p className="lede">{intro.lede}</p>
            {"disclaimer" in intro ? <p className="security-disclaimer">{intro.disclaimer}</p> : null}
            <div className="intake-proof-panel" aria-label="What happens after submitting the intake">
              <p className="eyebrow">What happens next</p>
              <ul>
                {intro.next.map((item) => (
                  <li key={item}>{item}</li>
                ))}
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
