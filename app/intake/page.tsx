import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "../../components/JsonLd";
import { IntakeAdvisor } from "../../components/IntakeAdvisor";
import { securityCheckDisclaimer } from "../../lib/content";
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

const introductions = {
  snapshot: {
    eyebrow: "Free AI Workflow Savings Snapshot",
    title: "Request your free Snapshot.",
    lede:
      "Share the workflow that feels manual, repetitive, or hard to keep up with. Parkside will organize the context, identify likely leaks, and send a practical Snapshot at no charge and with no obligation to move forward.",
    next: [
      "Parkside reviews one workflow for fit and urgency.",
      "You get a short Snapshot with likely leaks and practical AI opportunities.",
      "If the opportunity is real, later steps are the AI-Ready Security Check, the paid Blueprint, and a Build quoted after the Blueprint."
    ]
  },
  "security-check": {
    eyebrow: "AI-Ready Security Check",
    title: "Request the Security Check.",
    lede:
      "Tell us about the business and the systems already in use. The AI-Ready Security Check is a $500 fixed fee and takes about 2–3 weeks. This form collects the context. It does not ask for passwords.",
    next: [
      "Parkside reviews the request and confirms the Check is the right fit.",
      "The work covers systems, access, shadow AI, guardrails, and a ranked list of fixes.",
      "The $500 fee is credited toward the Blueprint if that pilot is signed within 30 days."
    ],
    disclaimer: securityCheckDisclaimer
  },
  blueprint: {
    eyebrow: "AI Operations Blueprint",
    title: "Request the Blueprint.",
    lede:
      "Tell us about the workflow you want in the pilot. The AI Operations Blueprint is a 30-day AI Operator Pilot. The founder-cohort target is $1,500, and the $500 Security Check is credited if you sign within 30 days.",
    next: [
      "Parkside reviews the workflow and confirms the pilot is the right next step.",
      "The Blueprint names owners, next actions, and the first system worth building.",
      "Build — implementation and ongoing operating support — is quoted after the Blueprint."
    ]
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
