import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../../components/JsonLd";
import { BLUEPRINT_FROM_USD, primaryCta } from "../../lib/content";
import { createRouteMetadata } from "../../lib/metadata";
import {
  createPageBreadcrumbItems,
  createPageStructuredData,
  organizationId,
  referenceNode,
  siteUrl
} from "../../lib/structured-data";

const blueprintFee = BLUEPRINT_FROM_USD.toLocaleString("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

export const metadata: Metadata = createRouteMetadata({
  title: "Blueprint",
  description: `The Blueprint is a plan for one workflow. From ${blueprintFee}. Build is quoted after.`,
  path: "/blueprint"
});

const blueprintService = {
  "@type": "Service",
  "@id": `${siteUrl}/blueprint#blueprint`,
  name: "Blueprint",
  description: "A plan for one workflow, with an owner on every step.",
  provider: { "@id": organizationId },
  serviceType: "Blueprint",
  areaServed: "United States",
  url: `${siteUrl}/blueprint`,
  offers: {
    "@type": "Offer",
    price: BLUEPRINT_FROM_USD,
    priceCurrency: "USD",
    description: `Blueprint from ${blueprintFee}.`
  }
};

const points = ["Owners and next steps", "What to build first", "Where a person decides"];

const structuredData = createPageStructuredData({
  id: `${siteUrl}/blueprint#webpage`,
  path: "/blueprint",
  name: "Blueprint",
  description: "A plan for one workflow.",
  breadcrumbItems: createPageBreadcrumbItems("Blueprint", "/blueprint"),
  mainEntity: referenceNode(`${siteUrl}/blueprint#blueprint`),
  extraNodes: [blueprintService]
});

export default function BlueprintPage() {
  return (
    <main>
      <JsonLd data={structuredData} />
      <section className="page-hero dark-band">
        <div className="container">
          <p className="eyebrow light">Blueprint</p>
          <h1 className="page-title">A plan for one workflow.</h1>
          <p className="lede">Blueprint from {blueprintFee}. Build is quoted after.</p>
          <div className="button-row">
            <Link className="btn" href="/intake?interest=blueprint">
              Request the Blueprint
            </Link>
            <Link className="btn secondary" href="/security-check">
              See the Security Check
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <ul className="audit-checklist">
            {points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <div className="button-row" style={{ marginTop: 36 }}>
            <Link className="btn" href="/intake">
              {primaryCta}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
