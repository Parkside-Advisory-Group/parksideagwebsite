import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../../../components/JsonLd";
import { WorkflowTeardown } from "../../../components/WorkflowTeardown";
import { primaryCta } from "../../../lib/content";
import { createRouteMetadata } from "../../../lib/metadata";
import { createPageBreadcrumbItems, createPageStructuredData, siteUrl } from "../../../lib/structured-data";

export const metadata: Metadata = createRouteMetadata({
  title: "Workflow Automation for Contractors",
  description: "Estimates go quiet between the field and the office. An illustrative example, not a client result.",
  path: "/use-cases/contractors",
});

const structuredData = createPageStructuredData({
  id: `${siteUrl}/use-cases/contractors#webpage`,
  path: "/use-cases/contractors",
  name: "Workflow automation for contractors",
  description: "An illustrative look at estimates that go quiet. Not a client result.",
  breadcrumbItems: createPageBreadcrumbItems("Contractors", "/use-cases/contractors"),
});

const leaks = [
  { title: "Missed calls", body: "The callback has no owner." },
  { title: "Quiet estimates", body: "Nobody can say what happened." },
  { title: "Field handoffs", body: "The detail lives in memory." },
];

export default function ContractorsPage() {
  return (
    <main>
      <JsonLd data={structuredData} />
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Contractors</p>
          <h1 className="page-title">The handoff is the leak.</h1>
          <p className="lede">An illustrative example. Not a client result.</p>
          <div className="button-row">
            <Link className="btn" href="/intake">
              {primaryCta}
            </Link>
            <Link
              className="btn ghost"
              href="/opportunity-estimator?workflow=estimate-follow-up&impact=high-impact"
            >
              Check estimate follow-up
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid-3">
          {leaks.map((leak) => (
            <article className="card" key={leak.title}>
              <h3>{leak.title}</h3>
              <p>{leak.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: "var(--cream-deep)" }}>
        <div className="container">
          <p className="eyebrow">Illustrative teardown</p>
          <h2 className="section-title">From the call to a next step.</h2>
          <p className="lede">An illustrative example. Not a client result.</p>
          <WorkflowTeardown />
          <div className="button-row">
            <Link className="btn" href="/intake">
              {primaryCta}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
