import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../../components/JsonLd";
import { BLUEPRINT_FOUNDER_COHORT_TARGET_USD, SECURITY_CHECK_FEE_USD } from "../../lib/content";
import { createRouteMetadata } from "../../lib/metadata";
import {
  createPageBreadcrumbItems,
  createPageStructuredData,
  organizationId,
  referenceNode,
  siteUrl
} from "../../lib/structured-data";

const blueprintFee = BLUEPRINT_FOUNDER_COHORT_TARGET_USD.toLocaleString("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});
const checkFee = SECURITY_CHECK_FEE_USD.toLocaleString("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

export const metadata: Metadata = createRouteMetadata({
  title: "AI Operations Blueprint",
  description:
    "The paid AI Operations Blueprint is a 30-day AI Operator Pilot. Founder-cohort target $1,500. The $500 Security Check is credited if signed within 30 days.",
  path: "/blueprint"
});

const blueprintService = {
  "@type": "Service",
  "@id": `${siteUrl}/blueprint#ai-operations-blueprint`,
  name: "AI Operations Blueprint",
  description:
    "A 30-day AI Operator Pilot that maps one workflow, names owners and next actions, and recommends the first system to build.",
  provider: { "@id": organizationId },
  serviceType: "AI Operations Blueprint",
  areaServed: "United States",
  url: `${siteUrl}/blueprint`,
  offers: {
    "@type": "Offer",
    price: BLUEPRINT_FOUNDER_COHORT_TARGET_USD,
    priceCurrency: "USD",
    description: `Founder-cohort target. The ${checkFee} AI-Ready Security Check is credited if the Blueprint is signed within 30 days.`
  }
};

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "What is the AI Operations Blueprint?",
    answer:
      "A 30-day AI Operator Pilot for one workflow. It names who owns each step, what the next action is, where a person stays in control, and which system is worth building first."
  },
  {
    question: "What does the Blueprint cost?",
    answer: `The founder-cohort target is ${blueprintFee}. The ${checkFee} AI-Ready Security Check is credited if the Blueprint is signed within 30 days. Build is quoted after the Blueprint, not before.`
  },
  {
    question: "How long does the pilot run?",
    answer: "Thirty days. That window is the working plan for one workflow, not a promise that every system will be finished."
  },
  {
    question: "What do we receive?",
    answer:
      "A workflow leak map with owners and handoffs, a first-build recommendation, human review and failure-path notes, a 30-day operator pilot plan, and an owner and next-action model."
  },
  {
    question: "What happens after the Blueprint?",
    answer:
      "Build is implementation and an ongoing operating partnership. It is quoted after the Blueprint, once the workflow and the first system are understood."
  },
  {
    question: "What does the pilot leave with people?",
    answer:
      "A named owner, a next action, and review rules a person can follow. The pilot does not hand judgment-heavy customer decisions to an unattended system."
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
  name: "AI Operations Blueprint",
  description: "The paid 30-day AI Operator Pilot for one workflow.",
  breadcrumbItems: createPageBreadcrumbItems("AI Operations Blueprint", "/blueprint"),
  mainEntity: referenceNode(`${siteUrl}/blueprint#ai-operations-blueprint`),
  extraNodes: [blueprintService, faqStructuredData]
});

const deliverables = [
  "Workflow leak map with owners and handoffs",
  "First-build recommendation",
  "Human review and failure-path notes",
  "A 30-day operator pilot plan",
  "Owner and next-action model"
];

const reviewAreas = [
  "How requests arrive and who touches them next",
  "Where estimates, callbacks, and updates go quiet",
  "Which handoffs depend on memory, texts, or side conversations",
  "Which inbox, spreadsheet, calendar, or system holds the source of truth",
  "Where a person must review before anything is sent or changed"
];

const examples = [
  "A contractor’s estimate follow-up needs an owner and a next call before the job goes quiet.",
  "A service desk needs one view of blocked handoffs instead of a weekly rebuild.",
  "A manager needs routine updates drafted from source notes and reviewed before a customer sees them.",
  "An office needs the same next-action rule on every open estimate."
];

const guardrails = [
  "The pilot does not treat AI as the answer before the workflow is mapped.",
  "Customer-facing judgment stays with a person unless the review rule is explicit.",
  "Build is quoted after the Blueprint. The founder-cohort target is not a Build price.",
  "The pilot does not promise exact savings or that every idea is feasible."
];

const notAFit = [
  "The workflow has no owner and happens only occasionally.",
  "The request is a broad AI program with no operating problem.",
  "The desired system would make final customer, safety, or money decisions on its own.",
  "The work depends on passwords or private credentials sent through a form."
];

export default function BlueprintPage() {
  return (
    <main>
      <JsonLd data={structuredData} />
      <section className="page-hero dark-band">
        <div className="container">
          <p className="eyebrow light">AI Operations Blueprint</p>
          <h1 className="page-title">A 30-day AI Operator Pilot for one workflow.</h1>
          <p className="lede">
            The paid Blueprint. Founder-cohort target {blueprintFee}. The {checkFee} AI-Ready Security Check is
            credited if the Blueprint is signed within 30 days. Build is quoted after this pilot.
          </p>
          <div className="button-row">
            <Link className="btn" href="/intake?interest=blueprint">
              Request the Blueprint
            </Link>
            <Link className="btn secondary" href="/security-check">
              See the Security Check
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">What it is</p>
            <h2 className="section-title">One workflow. Named owners. A next action that does not depend on memory.</h2>
          </div>
          <div className="panel">
            <p>
              The AI Operations Blueprint is a 30-day working pilot. It maps how the job moves, who owns the next step,
              where it goes quiet, and what should be built first. It is the paid plan, not the build itself.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--cream-deep)" }}>
        <div className="container blueprint-detail-grid">
          <div>
            <p className="eyebrow">What gets mapped</p>
            <h2 className="section-title">The points where the work usually loses its owner.</h2>
          </div>
          <ul className="audit-checklist">
            {reviewAreas.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">What you receive</p>
          <h2 className="section-title">The working papers for the 30-day pilot.</h2>
          <p className="lede">
            Founder-cohort target {blueprintFee}. The {checkFee} Security Check is credited when the Blueprint is
            signed within 30 days. Implementation and ongoing operating support are quoted after the pilot.
          </p>
          <div className="deliverable-grid">
            {deliverables.map((item, index) => (
              <article className="deliverable-item" key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--cream-deep)" }}>
        <div className="container">
          <p className="eyebrow">Where it applies</p>
          <h2 className="section-title">Workflows that already have a cost when they stall.</h2>
          <div className="grid-2 compact-grid">
            {examples.map((example) => (
              <article className="compact-card" key={example}>
                <p>{example}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container guardrail-layout">
          <div>
            <p className="eyebrow">Guardrails</p>
            <h2 className="section-title">The pilot defines where a build should stop.</h2>
            <ul className="audit-checklist">
              {guardrails.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Not a fit</p>
            <h2 className="section-title">When another step is the better use of the 30 days.</h2>
            <ul className="audit-checklist">
              {notAFit.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section faq-band">
        <div className="container">
          <p className="eyebrow">Common questions</p>
          <h2 className="section-title">What operators ask about the pilot.</h2>
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
            <p className="eyebrow">After the pilot</p>
            <h2 className="section-title">Build is quoted when the Blueprint is done.</h2>
          </div>
          <div>
            <p className="lede">
              Build is implementation and an ongoing operating partnership. The price follows the Blueprint, once the
              workflow, the owner, and the first system are clear. The system is built so the people who run the work
              can keep running it.
            </p>
            <div className="button-row">
              <Link className="btn" href="/intake?interest=blueprint">
                Request the Blueprint
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
