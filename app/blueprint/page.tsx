import Link from "next/link";
import { primaryCta, tertiaryCta } from "../../lib/content";

export const metadata = {
  title: "AI Operations Blueprint",
  description: "A practical audit for finding the first useful AI or automation build inside a recurring workflow."
};

export default function BlueprintPage() {
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
