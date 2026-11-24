import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../../components/JsonLd";
import { BookingLink } from "../../components/BookingLink";
import { primaryCta } from "../../lib/content";
import { createRouteMetadata } from "../../lib/metadata";
import {
  createPageBreadcrumbItems,
  createPageStructuredData,
  createPersonNode,
  organizationId,
  referenceNode,
  siteUrl
} from "../../lib/structured-data";

export const metadata: Metadata = createRouteMetadata({
  title: "About",
  description: "Parkside is led by Anthony Mora. Practical help for work that stalls.",
  path: "/about"
});

const profileUrl = "https://www.linkedin.com/in/anthonymora1/";

const fit = ["A repeated workflow", "A named owner", "Real examples"];
const notAFit = ["No owner", "A strategy deck", "Passwords in a form"];

const anthonyMoraPerson = createPersonNode({
  id: `${siteUrl}/about#anthony-mora`,
  name: "Anthony Mora",
  jobTitle: "Consulting Partner",
  url: `${siteUrl}/about`,
  sameAs: [profileUrl],
  knowsAbout: ["Workflow automation", "Project controls", "Reporting", "Follow-up"]
});

const structuredData = createPageStructuredData({
  pageType: "AboutPage",
  id: `${siteUrl}/about#aboutpage`,
  path: "/about",
  name: "About Parkside Advisory Group",
  description: "Anthony Mora leads Parkside.",
  breadcrumbItems: createPageBreadcrumbItems("About", "/about"),
  about: [referenceNode(organizationId), referenceNode(`${siteUrl}/about#anthony-mora`)],
  mainEntity: referenceNode(`${siteUrl}/about#anthony-mora`),
  extraNodes: [anthonyMoraPerson]
});

export default function AboutPage() {
  return (
    <main>
      <JsonLd data={structuredData} />
      <section className="page-hero">
        <div className="container split">
          <div>
            <p className="eyebrow">About</p>
            <h1 className="page-title">Anthony Mora leads Parkside.</h1>
          </div>
          <div>
            <p className="lede">Practical help for work that stalls.</p>
            <p className="lede">Northwest Indiana, Chicagoland, and remote.</p>
            <div className="button-row">
              <Link className="btn ghost" href="/intake">
                {primaryCta}
              </Link>
              <BookingLink className="btn ghost" />
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container guardrail-layout">
          <div>
            <p className="eyebrow">A fit</p>
            <h2 className="section-title">When the problem is visible.</h2>
            <ul className="audit-checklist">
              {fit.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Not a fit</p>
            <h2 className="section-title">When it should wait.</h2>
            <ul className="audit-checklist">
              {notAFit.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <a className="btn ghost" href={profileUrl} rel="noreferrer" target="_blank">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
