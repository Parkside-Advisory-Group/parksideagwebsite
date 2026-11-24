import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../../components/JsonLd";
import { WorkflowTeardown } from "../../components/WorkflowTeardown";
import { primaryCta, useCases } from "../../lib/content";
import { createRouteMetadata } from "../../lib/metadata";
import {
  createPageBreadcrumbItems,
  createPageStructuredData,
  createUseCaseItemList,
  referenceNode,
  siteUrl
} from "../../lib/structured-data";

export const metadata: Metadata = createRouteMetadata({
  title: "Use Cases",
  description: "Repeated work with an owner. Intake, follow-up, reporting, and handoffs.",
  path: "/use-cases"
});

const useCaseList = createUseCaseItemList(useCases);
const structuredData = createPageStructuredData({
  id: `${siteUrl}/use-cases#webpage`,
  path: "/use-cases",
  name: "Parkside Advisory Group Use Cases",
  description: "Repeated work with an owner.",
  breadcrumbItems: createPageBreadcrumbItems("Use Cases", "/use-cases"),
  mainEntity: referenceNode(`${siteUrl}/use-cases#use-case-list`),
  extraNodes: [useCaseList]
});

export default function UseCasesPage() {
  return (
    <main>
      <JsonLd data={structuredData} />
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Use cases</p>
          <h1 className="page-title">They repeat. They stall. They have an owner.</h1>
          <p className="lede">Start with the work the team already feels.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid-3">
          {useCases.map((useCase) => (
            <article className="card" key={useCase.title}>
              <span className="meta">{useCase.category}</span>
              <h3>{useCase.title}</h3>
              <p>{useCase.description}</p>
              <ul className="plain-list">
                {useCase.signals.map((signal) => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="eyebrow">Illustrative</p>
          <h2 className="section-title">An estimate goes quiet.</h2>
          <p className="lede">Not a client result.</p>
          <WorkflowTeardown />
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
