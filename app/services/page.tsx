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
  description:
    "Blueprint audits, workflow automation, AI agent builds, and operating support from Parkside Advisory Group.",
  path: "/services"
});

const serviceAnswer =
  "Parkside Advisory Group provides practical AI automation services for recurring business workflows where work is already valuable but gets slowed by manual capture, unclear ownership, missed follow-up, or scattered reporting.";

const serviceExamples = [
  "A new request arrives by form, call, or email and needs to become a complete record with a clear owner.",
  "An estimate or proposal needs scheduled follow-up before the opportunity goes stale.",
  "A manager needs a reliable view of open work, blocked handoffs, and aging items without rebuilding a spreadsheet.",
  "A team needs AI-assisted drafts or summaries, with human review before anything sensitive is sent."
];

const serviceInputs = [
  "Current workflow steps, tools, owners, and handoffs",
  "Examples of leads, estimates, updates, reports, or internal requests",
  "Known failure points, timing expectations, and review requirements",
  "Constraints around data quality, access, approvals, and customer experience"
];

const serviceOutputs = [
  "A named first workflow to fix",
  "A scoped automation, AI assist, reporting view, or handoff system",
  "Human review, escalation, and fallback rules",
  "A practical rollout path the team can operate"
];

const serviceGuardrails = [
  "Parkside does not quote final pricing before discovery confirms scope.",
  "Parkside does not request passwords, private API keys, or login credentials through intake.",
  "Parkside does not promise exact savings or guarantee technical feasibility before reviewing the workflow.",
  "Parkside keeps judgment-heavy moments human-owned unless a review path is clearly defined."
];

const notAFitSignals = [
  "There is no repeated workflow or accountable process owner.",
  "The primary request is a broad AI strategy deck instead of an operating problem to fix.",
  "The team wants AI to make final customer, legal, financial, or safety decisions without review.",
  "The workflow depends on unavailable data, unclear permissions, or credentials shared through an unsafe channel."
];

const serviceNodes = offers.map((offer) => createOfferServiceNode(offer, "/services"));
const structuredData = createPageStructuredData({
  id: `${siteUrl}/services#webpage`,
  path: "/services",
  name: "Parkside Advisory Group Services",
  description: "Blueprint audits, workflow automation, AI agent builds, and operating support from Parkside Advisory Group.",
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
          <h1 className="page-title">Start with the workflow that keeps costing attention.</h1>
          <p className="lede">
            Parkside does not sell a generic AI package. We inspect the handoff, define the owner and next action, then
            build the narrow system that makes the repeated work easier to run.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid-2">
          {offers.map((offer) => (
            <article className="card" key={offer.name}>
              <h3>{offer.name}</h3>
              <p>{offer.summary}</p>
              <p>
                <strong>Best for:</strong> {offer.bestFor}
              </p>
              <ul className="plain-list">
                {offer.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section answer-band">
        <div className="container answer-grid">
          <div>
            <p className="eyebrow">Direct Answer</p>
            <h2 className="section-title">What services does Parkside provide?</h2>
          </div>
          <div className="answer-panel">
            <p>{serviceAnswer}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Examples</p>
          <h2 className="section-title">Typical workflows Parkside is asked to improve.</h2>
          <div className="grid-2 compact-grid">
            {serviceExamples.map((example) => (
              <article className="compact-card" key={example}>
                <p>{example}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--cream-deep)" }}>
        <div className="container evidence-grid">
          <div>
            <p className="eyebrow">Inputs</p>
            <h2 className="section-title">What Parkside needs to evaluate the work.</h2>
            <ul className="audit-checklist">
              {serviceInputs.map((input) => (
                <li key={input}>{input}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Outputs</p>
            <h2 className="section-title">What the engagement should leave behind.</h2>
            <ul className="audit-checklist">
              {serviceOutputs.map((output) => (
                <li key={output}>{output}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section dark-band">
        <div className="container guardrail-layout">
          <div>
            <p className="eyebrow light">Guardrails</p>
            <h2 className="section-title">Useful automation still needs operating discipline.</h2>
            <ul className="plain-list guardrail-list">
              {serviceGuardrails.map((guardrail) => (
                <li key={guardrail}>{guardrail}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow light">Not a Fit</p>
            <h2 className="section-title">When Parkside will recommend a different path.</h2>
            <ul className="plain-list guardrail-list">
              {notAFitSignals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container button-row">
          <Link className="btn" href="/intake">
            {primaryCta}
          </Link>
        </div>
      </section>
    </main>
  );
}
