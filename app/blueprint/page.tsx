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
  title: "AI Operations Blueprint",
  description: "A practical audit for finding the first useful AI or automation build inside a recurring workflow.",
  path: "/blueprint"
});

const blueprintService = {
  "@type": "Service",
  "@id": `${siteUrl}/blueprint#ai-operations-blueprint`,
  name: "AI Operations Blueprint",
  description: "A practical audit for finding the first useful AI or automation build inside a recurring workflow.",
  provider: { "@id": organizationId },
  serviceType: "AI Operations Blueprint",
  areaServed: "United States",
  url: `${siteUrl}/blueprint`
};

const structuredData = createPageStructuredData({
  id: `${siteUrl}/blueprint#webpage`,
  path: "/blueprint",
  name: "AI Operations Blueprint",
  description: "The audit that finds the first workflow worth fixing with practical AI and automation.",
  breadcrumbItems: createPageBreadcrumbItems("AI Operations Blueprint", "/blueprint"),
  mainEntity: referenceNode(`${siteUrl}/blueprint#ai-operations-blueprint`),
  extraNodes: [blueprintService]
});

export default function BlueprintPage() {
  const directAnswer =
    "The AI Operations Blueprint is a focused audit of one recurring workflow. It identifies where work is captured, who owns the next step, where follow-up or reporting breaks down, and which practical automation or AI-assisted system should be built first.";

  const blueprintInputs = [
    "A workflow the team repeats often enough to study",
    "Real examples of requests, follow-ups, reports, or handoffs",
    "The tools where the source information currently lives",
    "A process owner who can confirm what good handling looks like"
  ];

  const blueprintOutputs = [
    "A workflow leak map showing where work stalls",
    "A first-build recommendation with the smallest useful scope",
    "Automation, AI-assist, and reporting opportunities ranked by value",
    "Human review points, failure paths, and readiness notes"
  ];

  const blueprintExamples = [
    "A contractor needs missed calls and web leads turned into complete intake records with follow-up reminders.",
    "A service business needs stale estimates surfaced before revenue opportunities go cold.",
    "An operations team needs one view of blocked handoffs instead of a weekly spreadsheet rebuild.",
    "A manager needs routine updates drafted from source notes, but reviewed before customers receive them."
  ];

  const blueprintGuardrails = [
    "The Blueprint does not assume AI is the answer before the workflow is understood.",
    "The recommendation keeps customer-facing judgment human-owned unless review rules are clear.",
    "The audit calls out data or access gaps before implementation is scoped.",
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

  const deliverables = [
    "Workflow leak map",
    "First-build recommendation",
    "Automation and AI opportunity list",
    "Human review and failure-path notes",
    "30/60/90-day implementation path",
    "Owner and next-action model"
  ];

  return (
    <main>
      <JsonLd data={structuredData} />
      <section className="page-hero dark-band">
        <div className="container">
          <p className="eyebrow light">AI Operations Blueprint</p>
          <h1 className="page-title">The audit that finds the first workflow worth fixing.</h1>
          <p className="lede">
            The Blueprint looks at one repeated operating problem, missed follow-up, stale estimates, slow updates, or
            manual reporting, then defines the practical system to build first.
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
            <h2 className="section-title">A working session for one real process, not a generic AI brainstorm.</h2>
          </div>
          <div className="panel">
            <p>
              Parkside reviews how the work moves today: the trigger, owner, tools, timing, customer touchpoints, and
              failure points. The audit names what should be automated, what should stay human-reviewed, and what needs
              to be cleaned up before implementation.
            </p>
          </div>
        </div>
      </section>

      <section className="section answer-band">
        <div className="container answer-grid">
          <div>
            <p className="eyebrow">Direct Answer</p>
            <h2 className="section-title">What is the AI Operations Blueprint?</h2>
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
            <h2 className="section-title">What makes the audit productive.</h2>
            <ul className="audit-checklist">
              {blueprintInputs.map((input) => (
                <li key={input}>{input}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Outputs</p>
            <h2 className="section-title">What the Blueprint produces.</h2>
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
          <h2 className="section-title">A roadmap that names the first build and the guardrails around it.</h2>
          <div className="deliverable-grid">
            {deliverables.map((deliverable, index) => (
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
            <h2 className="section-title">The Blueprint defines where automation should stop.</h2>
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

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">After the Audit</p>
            <h2 className="section-title">Implementation starts narrow, then earns the right to expand.</h2>
          </div>
          <div>
            <p className="lede">
              The Blueprint can lead into a scoped automation sprint, AI-assisted intake or follow-up, a reporting view,
              or an internal handoff system. Parkside installs the useful layer first, then tunes it as the team uses it.
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
