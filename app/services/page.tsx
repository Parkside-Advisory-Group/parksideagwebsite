import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../../components/JsonLd";
import { offers, primaryCta } from "../../lib/content";
import { createRouteMetadata } from "../../lib/metadata";
import {
  createOfferServiceId,
  createOfferServiceNode,
  createPageBreadcrumbItems,
  createPageStructuredData,
  referenceNode,
  siteUrl
} from "../../lib/structured-data";

export const metadata: Metadata = createRouteMetadata({
  title: "Services",
  description: "Snapshot is free. Security Check is $500. Blueprint from $1,500. Build is quoted after.",
  path: "/services"
});

const serviceNodes = offers.map((offer) => createOfferServiceNode(offer, "/services"));
const structuredData = createPageStructuredData({
  id: `${siteUrl}/services#webpage`,
  path: "/services",
  name: "Parkside Advisory Group Services",
  description: "Snapshot, Security Check, Blueprint, and Build.",
  breadcrumbItems: createPageBreadcrumbItems("Services", "/services"),
  mainEntity: offers.map((offer) => referenceNode(createOfferServiceId(offer, "/services"))),
  extraNodes: serviceNodes
});

export default function ServicesPage() {
  return (
    <main>
      <JsonLd data={structuredData} />
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Services</p>
          <h1 className="page-title">Four ways to start.</h1>
          <p className="lede">Snapshot is free. Security Check is $500. Blueprint from $1,500. Build is quoted after.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid-2">
          {offers.map((offer) => (
            <article className="card" key={offer.name}>
              <h3>{offer.name}</h3>
              <p className="offer-fee">{offer.feeLabel}</p>
              <p>{offer.summary}</p>
              <ul className="plain-list">
                {offer.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
              <Link className="atelier-text-link" href={offer.href}>
                See {offer.name} <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Link className="btn" href="/intake">
            {primaryCta}
          </Link>
        </div>
      </section>
    </main>
  );
}
