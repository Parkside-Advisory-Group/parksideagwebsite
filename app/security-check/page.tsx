import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../../components/JsonLd";
import {
  SECURITY_CHECK_FEE_USD,
  primaryCta,
  securityCheckDeliverables,
  securityCheckDisclaimer
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
  title: "Security Check",
  description: `Security Check, ${checkFee}. A clear view of systems, access, and AI risk.`,
  path: "/security-check"
});

const service = {
  "@type": "Service",
  "@id": `${siteUrl}/security-check#security-check`,
  name: "Security Check",
  description: securityCheckDisclaimer,
  provider: { "@id": organizationId },
  serviceType: "Security Check",
  areaServed: "United States",
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
  name: "Security Check",
  description: "A clear view of systems, access, and AI risk.",
  breadcrumbItems: createPageBreadcrumbItems("Security Check", "/security-check"),
  mainEntity: referenceNode(`${siteUrl}/security-check#security-check`),
  extraNodes: [service]
});

export default function SecurityCheckPage() {
  return (
    <main>
      <JsonLd data={structuredData} />
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Security Check</p>
          <h1 className="page-title">See the risk before you automate.</h1>
          <p className="lede">Security Check, {checkFee}.</p>
          <div className="button-row">
            <Link className="btn" href="/intake?interest=security-check">
              Request the Security Check
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <ul className="audit-checklist">
            {securityCheckDeliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="security-disclaimer">{securityCheckDisclaimer}</p>
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
