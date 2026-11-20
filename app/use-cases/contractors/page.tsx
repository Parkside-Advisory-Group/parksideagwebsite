import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../../../components/JsonLd";
import { WorkflowTeardown } from "../../../components/WorkflowTeardown";
import { primaryCta } from "../../../lib/content";
import { createRouteMetadata } from "../../../lib/metadata";
import { createPageBreadcrumbItems, createPageStructuredData, siteUrl } from "../../../lib/structured-data";

export const metadata: Metadata = createRouteMetadata({
  title: "Workflow Automation for Contractors",
  description:
    "An illustrative look at missed calls, stale estimates, and field-to-office handoffs for commercial and specialty contractors. Start with a readiness check or a free Workflow Snapshot.",
  path: "/use-cases/contractors",
});

const structuredData = createPageStructuredData({
  id: `${siteUrl}/use-cases/contractors#webpage`,
  path: "/use-cases/contractors",
  name: "Workflow automation for contractors",
  description:
    "How Parkside looks at missed calls, stale estimates, and field-to-office handoffs for contractor teams. Illustrative, not a client result.",
  breadcrumbItems: createPageBreadcrumbItems("Contractors", "/use-cases/contractors"),
});

const leaks = [
  {
    title: "Missed calls",
    body: "A job inquiry hits voicemail or a shared line while the office is on another estimate. The callback has no owner and no time.",
  },
  {
    title: "Stale estimates",
    body: "The number goes out from one person’s email. A week later nobody can say whether it was accepted, declined, or simply quiet.",
  },
  {
    title: "Field-to-office handoffs",
    body: "The crew knows the site. The office knows the paperwork. The details that connect them live in texts and memory.",
  },
];

export default function ContractorsPage() {
  return (
    <main>
      <JsonLd data={structuredData} />
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Contractors and B2B field teams</p>
          <h1 className="page-title">The estimate is not the leak. The handoff after it is.</h1>
          <p className="lede">
            Parkside works with operators who already know the job: commercial and specialty contractors, and other B2B
            service firms, where inquiries, estimates, and field notes stall between people. This page is an
            illustrative example, not a client result.
          </p>
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
          <h2 className="section-title">Walk the inquiry from the first call to a named next step.</h2>
          <p className="lede">
            Not a customer story. A clear picture of the handoff Parkside would inspect, and of what stays with a
            person.
          </p>
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
