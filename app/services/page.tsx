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
    "The free AI Workflow Savings Snapshot, paid AI Operations Blueprint, workflow automation sprints, AI agent builds, and ongoing operating support from Parkside Advisory Group.",
  path: "/services"
});

const serviceAnswer =
  "Parkside Advisory Group provides practical AI automation services for recurring business workflows where work is already valuable but gets slowed by manual capture, unclear ownership, missed follow-up, or scattered reporting.";

const serviceQuestions = [
  {
    question: "Who are Parkside’s AI automation services for?",
    answer: "Parkside works with business owners and operating teams responsible for repeated work: customer requests, estimates, reporting, handoffs, and document preparation. The strongest starting point is a specific process with a named owner, recurring friction, and examples the team can review together."
  },
  {
    question: "Do we need to replace our existing software?",
    answer: "Not necessarily. The first step is to review the tools and records you already use, along with their integration options and access controls. A useful solution may connect existing steps or simplify the process. Any need for a new tool should follow from the workflow, not precede it."
  },
  {
    question: "What is the difference between the Snapshot and the Blueprint?",
    answer: "The free AI Workflow Savings Snapshot reviews one painful workflow and identifies a practical starting point. The paid AI Operations Blueprint goes deeper into the steps, owners, constraints, and proposed build. Implementation scope is agreed after that work is understood."
  },
  {
    question: "How do we decide whether an automation is worth keeping?",
    answer: "Agree on a baseline and a small set of measures before rollout: handling time, missed follow-ups, rework, or visibility into open work. Include the time people spend reviewing output and resolving exceptions. Review the pilot against those measures before expanding it."
  }
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
            Practical AI and workflow automation for business owners and operating teams. We inspect the handoff,
            define the owner and next action, then build the system that makes repeated work easier to run.
            The Snapshot is free. The Blueprint is a paid working session, scoped after the Snapshot. Implementation is
            quoted only after that. Sprints and retainers include the notes and walkthrough your people need to run the
            system on a Tuesday.
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
          <p className="eyebrow">Common Questions</p>
          <h2 className="section-title">A clear starting point.</h2>
          <div className="grid-2 compact-grid">
            {serviceQuestions.map(({ question, answer }) => (
              <article className="compact-card" key={question}>
                <h3>{question}</h3>
                <p>{answer}</p>
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
        <div className="container">
          <div className="button-row">
            <Link className="btn" href="/intake">
              {primaryCta}
            </Link>
          </div>
          <p className="cta-assurance">Every engagement starts with the free Snapshot · No pricing before scope is clear</p>
        </div>
      </section>
    </main>
  );
}
