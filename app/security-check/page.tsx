import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../../components/JsonLd";
import {
  SECURITY_CHECK_FEE_USD,
  securityCheckAudience,
  securityCheckDeliverables,
  securityCheckDisclaimer,
  securityCheckDuration
} from "../../lib/content";
import { createRouteMetadata } from "../../lib/metadata";
import {
  createPageBreadcrumbItems,
  createPageStructuredData,
  organizationId,
  referenceNode,
  siteUrl
} from "../../lib/structured-data";

const checkFee = SECURITY_CHECK_FEE_USD.toLocaleString("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

export const metadata: Metadata = createRouteMetadata({
  title: "AI-Ready Security Check",
  description:
    "A $500 fixed-fee operations and risk review for owner-led Northwest Indiana businesses. Inventory, access, shadow AI, guardrails, and a ranked list of fixes. About 2–3 weeks.",
  path: "/security-check"
});

const service = {
  "@type": "Service",
  "@id": `${siteUrl}/security-check#ai-ready-security-check`,
  name: "AI-Ready Security Check",
  description: securityCheckDisclaimer,
  provider: { "@id": organizationId },
  serviceType: "AI-Ready Security Check",
  areaServed: "Northwest Indiana",
  url: `${siteUrl}/security-check`,
  offers: {
    "@type": "Offer",
    price: SECURITY_CHECK_FEE_USD,
    priceCurrency: "USD"
  }
};

const structuredData = createPageStructuredData({
  id: `${siteUrl}/security-check#webpage`,
  path: "/security-check",
  name: "AI-Ready Security Check",
  description:
    "A practical operations and risk review for owner-led businesses with 5–50 people.",
  breadcrumbItems: createPageBreadcrumbItems("AI-Ready Security Check", "/security-check"),
  mainEntity: referenceNode(`${siteUrl}/security-check#ai-ready-security-check`),
  extraNodes: [service]
});

export default function SecurityCheckPage() {
  return (
    <main>
      <JsonLd data={structuredData} />
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">AI-Ready Security Check</p>
          <h1 className="page-title">A practical look at the systems your business already depends on.</h1>
          <p className="lede">
            {securityCheckAudience} {securityCheckDuration} The fee is {checkFee}.
          </p>
          <div className="button-row">
            <Link className="btn" href="/intake?interest=security-check">
              Request the Security Check
            </Link>
            <Link className="btn secondary" href="/blueprint">
              See the Blueprint
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">Who it is for</p>
            <h2 className="section-title">Owner-led firms that have outgrown informal access.</h2>
          </div>
          <div className="panel">
            <p>
              The Check is for businesses with 5–50 people in HVAC, refrigeration, electrical, plumbing, roofing, and
              property management. The work is an operations and risk review of the tools, vendors, people, and AI
              already in the business. It sits after the free Workflow Snapshot and before the paid Blueprint.
            </p>
            <p className="offer-fee">$500 fixed fee · {securityCheckDuration}</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--cream-deep)" }}>
        <div className="container">
          <p className="eyebrow">What you receive</p>
          <h2 className="section-title">Seven pieces of work. A ranked list at the end.</h2>
          <div className="deliverable-grid">
            {securityCheckDeliverables.map((item, index) => (
              <article className="deliverable-item" key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">Where it sits</p>
            <h2 className="section-title">A fixed step between the Snapshot and the Blueprint.</h2>
          </div>
          <div>
            <p className="lede">
              The free Workflow Snapshot looks at one workflow. The Security Check reviews how the business is set up
              to use systems and AI. The AI Operations Blueprint is the 30-day AI Operator Pilot that follows, with a
              founder-cohort target of $1,500. The $500 Check is credited if that Blueprint is signed within 30 days.
              Build is quoted after the Blueprint.
            </p>
            <p className="security-disclaimer">{securityCheckDisclaimer}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="button-row">
            <Link className="btn" href="/intake?interest=security-check">
              Request the Security Check
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
