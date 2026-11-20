import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../../components/JsonLd";
import { primaryCta, tertiaryCta } from "../../lib/content";
import { createRouteMetadata } from "../../lib/metadata";
import {
  createPageBreadcrumbItems,
  createPageStructuredData,
  organizationId,
  referenceNode,
  siteUrl
} from "../../lib/structured-data";

export const metadata: Metadata = createRouteMetadata({
  title: "Free AI Workflow Savings Snapshot",
  description: "A lightweight report that identifies workflow leaks and practical AI opportunities before a deeper Blueprint.",
  path: "/blueprint"
});

const blueprintService = {
  "@type": "Service",
  "@id": `${siteUrl}/blueprint#ai-operations-blueprint`,
  name: "Free AI Workflow Savings Snapshot",
  description: "A lightweight report that identifies workflow leaks and practical AI opportunities before a deeper Blueprint.",
  provider: { "@id": organizationId },
  serviceType: "AI Workflow Savings Snapshot",
  areaServed: "United States",
  url: `${siteUrl}/blueprint`
};

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "How much does the AI Workflow Savings Snapshot cost?",
    answer:
      "Nothing. The Snapshot is free, with no obligation. The paid AI Operations Blueprint is a separate next step, and it only makes sense when the Snapshot shows a workflow worth mapping."
  },
  {
    question: "What do I get in the Snapshot?",
    answer:
      "A short report on one recurring workflow: a leak summary showing where work appears to stall, three practical AI or automation opportunities ranked by value, a first-system recommendation with the smallest useful scope, and readiness notes with follow-up questions."
  },
  {
    question: "How long does it take?",
    answer:
      "The intake form takes about ten minutes. Every request is reviewed personally, and you hear back within one to two business days with initial observations and a proposed next step."
  },
  {
    question: "Do you need access to our systems?",
    answer:
      "No. The Snapshot works entirely from your intake answers. Never share passwords, API keys, or login credentials — the intake form rejects them by design."
  },
  {
    question: "Which workflows fit best?",
    answer:
      "Workflows that repeat daily or weekly, have a clear owner, come with real examples, and carry business impact — lead intake, estimate follow-up, customer updates, manual reporting, and internal handoffs are common starting points."
  },
  {
    question: "What happens after the Snapshot?",
    answer:
      "If the opportunity is real, the next step is a paid AI Operations Blueprint that maps the build, then a scoped implementation. If the workflow is not ready, the Snapshot says so and names what to fix first."
  }
];

const faqStructuredData = {
  "@type": "FAQPage",
  "@id": `${siteUrl}/blueprint#faq`,
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
};

const structuredData = createPageStructuredData({
  id: `${siteUrl}/blueprint#webpage`,
  path: "/blueprint",
  name: "Free AI Workflow Savings Snapshot",
  description: "The free report that identifies likely workflow leaks and the first practical AI opportunity.",
  breadcrumbItems: createPageBreadcrumbItems("Free AI Workflow Savings Snapshot", "/blueprint"),
  mainEntity: referenceNode(`${siteUrl}/blueprint#ai-operations-blueprint`),
  extraNodes: [blueprintService, faqStructuredData]
});

export default function BlueprintPage() {
  const directAnswer =
    "The free AI Workflow Savings Snapshot is a lightweight report on one recurring workflow. It identifies likely leaks, practical AI or automation opportunities, readiness gaps, and the first system worth considering. The paid AI Operations Blueprint is the deeper next step when the Snapshot shows a workflow is worth mapping and scoping.";

  const blueprintInputs = [
    "A workflow the team repeats often enough to study",
    "Real examples of requests, follow-ups, reports, or handoffs",
    "The tools where the source information currently lives",
    "A process owner who can confirm what good handling looks like"
  ];

  const blueprintOutputs = [
    "A short workflow leak summary showing where work appears to stall",
    "Three practical AI or automation opportunities ranked by value",
    "A first-system recommendation with the smallest useful scope",
    "Readiness notes, human review points, and follow-up questions"
  ];

  const snapshotDeliverables = [
    "Workflow leak summary",
    "Three practical opportunities",
    "First-system recommendation",
    "Readiness notes and follow-up questions"
  ];

  const paidBlueprintDeliverables = [
    "Workflow leak map with owners and handoffs",
    "First-build recommendation",
    "Human review and failure-path notes",
    "30/60/90-day implementation path",
    "Owner and next-action model"
  ];

  const blueprintExamples = [
    "A contractor needs missed calls and web leads turned into complete intake records with follow-up reminders.",
    "A service business needs stale estimates surfaced before revenue opportunities go cold.",
    "An operations team needs one view of blocked handoffs instead of a weekly spreadsheet rebuild.",
    "A manager needs routine updates drafted from source notes, but reviewed before customers receive them."
  ];

  const blueprintGuardrails = [
    "Parkside does not assume AI is the answer before the workflow is understood.",
    "The recommendation keeps customer-facing judgment human-owned unless review rules are clear.",
    "The Snapshot calls out data or access gaps before a paid Blueprint or implementation is scoped.",
    "The output avoids fixed pricing, exact savings claims, and feasibility promises before discovery is complete."
  ];

  const notAFitSignals = [
    "The workflow happens only occasionally and has no clear owner.",
    "The team wants broad AI adoption without a specific operating problem.",
    "The requested system would make final decisions without human review.",
    "The process depends on credentials or sensitive access details shared through intake."
  ];

  const reviewAreas = [
    "How new requests are captured, qualified, and assigned",
    "Where callbacks, estimates, and customer updates stall",
    "Which handoffs depend on texts, memory, or side conversations",
    "Which spreadsheets, inboxes, calendars, or CRMs hold the source of truth",
    "Where human review is required before AI or automation should act"
  ];

  return (
    <main>
      <JsonLd data={structuredData} />
      <section className="page-hero dark-band">
        <div className="container">
          <p className="eyebrow light">Free AI Workflow Savings Snapshot</p>
          <h1 className="page-title">A quick report on where AI could actually help your workflow.</h1>
          <p className="lede">
            Share one repeated operating problem, missed follow-up, stale estimates, slow updates, or manual reporting.
            Parkside sends back a practical Snapshot with likely leaks, useful AI opportunities, and a recommended first step.
          </p>
          <div className="button-row">
            <Link className="btn" href="/intake">
              {primaryCta}
            </Link>
            <Link className="btn secondary" href="/use-cases">
              {tertiaryCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">What It Is</p>
            <h2 className="section-title">A focused first look at one real process, not a generic AI brainstorm.</h2>
          </div>
          <div className="panel">
            <p>
              Parkside reviews the intake details you provide: the trigger, owner, tools, timing, customer touchpoints,
              and failure points. The Snapshot names what may be worth automating, what should stay human-reviewed,
              and what needs clarification before implementation.
            </p>
          </div>
        </div>
      </section>

      <section className="section answer-band">
        <div className="container answer-grid">
          <div>
            <p className="eyebrow">Direct Answer</p>
            <h2 className="section-title">What is the AI Workflow Savings Snapshot?</h2>
          </div>
          <div className="answer-panel">
            <p>{directAnswer}</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--cream-deep)" }}>
        <div className="container blueprint-detail-grid">
          <div>
            <p className="eyebrow">What Gets Reviewed</p>
            <h2 className="section-title">The exact points where repeated work usually leaks.</h2>
          </div>
          <ul className="audit-checklist">
            {reviewAreas.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container evidence-grid">
          <div>
            <p className="eyebrow">Inputs</p>
            <h2 className="section-title">What makes the Snapshot useful.</h2>
            <ul className="audit-checklist">
              {blueprintInputs.map((input) => (
                <li key={input}>{input}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Outputs</p>
            <h2 className="section-title">What the Snapshot produces.</h2>
            <ul className="audit-checklist">
              {blueprintOutputs.map((output) => (
                <li key={output}>{output}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">What You Receive</p>
          <h2 className="section-title">A short free report that names the likely leaks and best first move.</h2>
          <p className="lede">
            The Snapshot is free. It does not include a 30/60/90-day implementation path. That planning belongs to the
            paid Blueprint, and only after the Snapshot shows a workflow worth mapping.
          </p>
          <div className="deliverable-grid">
            {snapshotDeliverables.map((deliverable, index) => (
              <article className="deliverable-item" key={deliverable}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{deliverable}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--cream-deep)" }}>
        <div className="container">
          <p className="eyebrow">The paid next step</p>
          <h2 className="section-title">The AI Operations Blueprint is a separate working session.</h2>
          <p className="lede">
            The Snapshot is free. The Blueprint is a paid working session, scoped after the Snapshot. Implementation is
            quoted only after that. No price is set before the workflow is understood.
          </p>
          <div className="deliverable-grid">
            {paidBlueprintDeliverables.map((deliverable, index) => (
              <article className="deliverable-item" key={deliverable}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{deliverable}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--cream-deep)" }}>
        <div className="container">
          <p className="eyebrow">Examples</p>
          <h2 className="section-title">Problems that are usually worth mapping first.</h2>
          <div className="grid-2 compact-grid">
            {blueprintExamples.map((example) => (
              <article className="compact-card" key={example}>
                <p>{example}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-band">
        <div className="container priority-layout">
          <div>
            <p className="eyebrow light">Prioritization</p>
            <h2 className="section-title">Opportunities are ranked by operating value, not novelty.</h2>
            <p className="lede">
              Each candidate system is scored against repeat volume, business impact, tool readiness, data quality,
              review needs, and risk. The result is a practical sequence: what to build now, what to prepare for later,
              and what to leave alone.
            </p>
          </div>
          <div className="scorecard" aria-label="Impact versus effort priority model">
            <div>
              <span>High impact / Low effort</span>
              <strong>Build first</strong>
            </div>
            <div>
              <span>High impact / High effort</span>
              <strong>Roadmap</strong>
            </div>
            <div>
              <span>Low impact / Low effort</span>
              <strong>Optional</strong>
            </div>
            <div>
              <span>Low impact / High effort</span>
              <strong>Avoid</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container guardrail-layout">
          <div>
            <p className="eyebrow">Guardrails</p>
            <h2 className="section-title">The Snapshot says where to wait. The Blueprint defines where a build should stop.</h2>
            <ul className="audit-checklist">
              {blueprintGuardrails.map((guardrail) => (
                <li key={guardrail}>{guardrail}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Not a Fit</p>
            <h2 className="section-title">When another starting point is better.</h2>
            <ul className="audit-checklist">
              {notAFitSignals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section faq-band">
        <div className="container">
          <p className="eyebrow">Common Questions</p>
          <h2 className="section-title">Questions operators usually ask first.</h2>
          <dl className="faq-list">
            {faqItems.map((item) => (
              <div className="faq-item" key={item.question}>
                <dt>{item.question}</dt>
                <dd>{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">After the Snapshot</p>
            <h2 className="section-title">If the opportunity is real, the Blueprint maps the build.</h2>
          </div>
          <div>
            <p className="lede">
              If the Snapshot shows a real opportunity, the next step is a paid AI Operations Blueprint: a working
              session that maps owners, handoffs, and a 30/60/90-day path. Implementation is quoted after that, not
              before. The system is built so the people who own the work can run it.
            </p>
            <div className="button-row">
              <Link className="btn" href="/intake">
                {primaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
