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
  description: "Practical AI and automation use cases for repeated business workflows.",
  path: "/use-cases"
});

const useCaseAnswer =
  "Parkside use cases are recurring operating workflows where better capture, routing, follow-up, drafting, or visibility can reduce manual coordination while keeping ownership and review clear.";

const useCaseInputs = [
  "A repeated process with enough examples to define patterns",
  "A clear owner for the next action",
  "Known timing expectations, customer promises, or service standards",
  "Access to the current tools, records, and reporting sources during implementation"
];

const useCaseOutputs = [
  "A more complete request or work record",
  "A visible owner, status, next action, and review path",
  "Automated reminders, summaries, drafts, routing, or reporting where useful",
  "A practical exception path when AI or automation is uncertain"
];

const representativeQuestions = [
  "Can AI help a service business respond faster to new leads?",
  "How should estimate follow-up be automated without losing human judgment?",
  "What business workflows are good first candidates for AI automation?",
  "How can managers see stalled work without rebuilding reports by hand?"
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
            <p className="eyebrow">Inputs</p>
            <h2 className="section-title">What a use case needs before it can become a system.</h2>
            <ul className="audit-checklist">
              {useCaseInputs.map((input) => (
                <li key={input}>{input}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Outputs</p>
            <h2 className="section-title">What a useful implementation should create.</h2>
            <ul className="audit-checklist">
              {useCaseOutputs.map((output) => (
                <li key={output}>{output}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--cream-deep)" }}>
        <div className="container">
          <p className="eyebrow">Representative Questions</p>
          <h2 className="section-title">Questions these use cases are meant to answer.</h2>
          <div className="grid-2 compact-grid">
            {representativeQuestions.map((question) => (
              <article className="compact-card" key={question}>
                <p>{question}</p>
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
        <div className="container button-row">
          <Link className="btn" href="/intake">
            {primaryCta}
          </Link>
        </div>
      </section>
    </main>
  );
}
