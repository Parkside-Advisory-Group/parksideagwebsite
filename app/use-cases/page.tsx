import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../../components/JsonLd";
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
  description:
    "Six practical AI automation use cases for small and mid-sized businesses: client intake, estimate follow-up, reporting visibility, internal handoffs, document drafting, and workflow triage.",
  path: "/use-cases"
});

const useCaseAnswer =
  "Parkside use cases are recurring operating workflows where better capture, routing, follow-up, drafting, or visibility can reduce manual coordination while keeping ownership and review clear.";

const illustrativeWorkflow = [
  "An estimate is marked sent, with the customer, owner, and next follow-up date recorded.",
  "The system checks for a reply or status change before preparing a reminder.",
  "The owner reviews the message and any customer-specific context before sending.",
  "Accepted, declined, or paused estimates leave the follow-up queue; unclear cases return to the owner."
];

const evaluationMeasures = [
  "Follow-up coverage: estimates with a recorded next action, compared with all open estimates.",
  "Response time: time from the agreed follow-up date to the owner’s completed action.",
  "Review effort: time spent checking and correcting drafts, including exceptions.",
  "Quality: missed replies, duplicate reminders, and incorrect statuses found during review."
];

const useCaseQuestions = [
  {
    question: "Can AI help a service business respond to new leads?",
    answer: "AI can help summarize an inquiry and draft a response; ordinary automation can record it, assign an owner, and flag missing information. A person should review unclear requests and customer commitments. Start by measuring how long inquiries wait for an owner and a useful first response."
  },
  {
    question: "How can estimate follow-up be automated without losing human judgment?",
    answer: "Automate the queue and reminders around a named owner. Check for replies and estimate status before preparing a follow-up, and have the owner review pricing, timing, or other commitments. Stop reminders when the estimate is accepted, declined, or paused."
  },
  {
    question: "Which business workflow should be automated first?",
    answer: "Choose a frequent, clearly owned workflow with observable delays and enough examples to test. A bounded step such as routing requests or preparing a recurring summary is easier to evaluate than an entire department. Agree on the baseline, exception path, and success measures before building."
  },
  {
    question: "How can managers see stalled work without rebuilding reports?",
    answer: "Bring the owner, status, next action, and last update into a consistent view of existing records. Flag items that exceed the team’s agreed timing expectations. The view is only as reliable as its source data, so missing or conflicting records need a visible review queue."
  }
];

const notAFitSignals = [
  "The workflow is unique every time and cannot be described with examples.",
  "The main problem is strategic positioning, not repeated operating work.",
  "The team wants automation before deciding who owns the process.",
  "The work involves sensitive decisions without a responsible human reviewer."
];

const useCaseList = createUseCaseItemList(useCases);
const structuredData = createPageStructuredData({
  id: `${siteUrl}/use-cases#webpage`,
  path: "/use-cases",
  name: "Parkside Advisory Group Use Cases",
  description: "Practical AI and automation use cases for repeated business workflows.",
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
          <p className="eyebrow">Use Cases</p>
          <h1 className="page-title">Good use cases are easy to spot. They repeat, stall, and have an owner.</h1>
          <p className="lede">
            Parkside looks for places where the team already knows the work matters: missed callbacks, stale estimates,
            slow updates, handoff gaps, and reports that have to be rebuilt by hand.
          </p>
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

      <section className="section answer-band">
        <div className="container answer-grid">
          <div>
            <p className="eyebrow">Direct Answer</p>
            <h2 className="section-title">What makes a good AI automation use case?</h2>
          </div>
          <div className="answer-panel">
            <p>{useCaseAnswer}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container evidence-grid">
          <div>
            <p className="eyebrow">Illustrative Workflow</p>
            <h2 className="section-title">An estimate sent. A next step kept.</h2>
            <p>A possible follow-up sequence, not a client result. The final design depends on the team’s tools and review requirements.</p>
            <ul className="audit-checklist">
              {illustrativeWorkflow.map((input) => (
                <li key={input}>{input}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">How to Evaluate It</p>
            <h2 className="section-title">Measure the work, including the review.</h2>
            <p>Compare a representative sample before and after a pilot. Include exception handling and reviewer time; a faster draft alone does not prove the workflow improved.</p>
            <ul className="audit-checklist">
              {evaluationMeasures.map((output) => (
                <li key={output}>{output}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--cream-deep)" }}>
        <div className="container">
          <p className="eyebrow">Common Questions</p>
          <h2 className="section-title">Practical answers, before the build.</h2>
          <div className="grid-2 compact-grid">
            {useCaseQuestions.map(({ question, answer }) => (
              <article className="compact-card" key={question}>
                <h3>{question}</h3>
                <p>{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-band">
        <div className="container split">
          <div>
            <p className="eyebrow light">Not a Fit</p>
            <h2 className="section-title">Parkside will slow down before automating unclear work.</h2>
          </div>
          <ul className="plain-list guardrail-list">
            {notAFitSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </div>
        <div className="container">
          <div className="button-row">
            <Link className="btn" href="/intake">
              {primaryCta}
            </Link>
          </div>
          <p className="cta-assurance">One workflow · Free report · Reply within 1–2 business days</p>
        </div>
      </section>
    </main>
  );
}
