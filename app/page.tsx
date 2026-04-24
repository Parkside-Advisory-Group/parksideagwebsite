import Image from "next/image";
import Link from "next/link";
import { offers, primaryCta, secondaryCta, useCases } from "../lib/content";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-media">
          <Image
            src="/assets/DSC04055+copy.jpg.webp"
            alt="Tree-lined path at sunrise"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="container hero-content">
          <div className="hero-copy">
            <p className="eyebrow light">AI Automation for Everyday Business Workflows</p>
            <h1 className="page-title">Spend less time chasing tasks, updates, and follow-up.</h1>
            <p className="lede">
              Parkside helps small and mid-sized businesses use practical AI to capture requests, follow up faster, and
              see what needs attention before work slips through the cracks.
            </p>
            <div className="hero-signal" aria-hidden="true">
              <span>New request</span>
              <span>Routed</span>
              <span>Follow-up queued</span>
            </div>
            <div className="button-row">
              <Link className="btn" href="/intake">
                {primaryCta}
              </Link>
              <Link className="btn secondary" href="/use-cases">
                {secondaryCta}
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-baseline" />
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">Operational Pain</p>
            <h2 className="section-title">Most workflow problems are follow-through problems.</h2>
          </div>
          <div className="panel">
            <p>
              Work slows down when leads sit in inboxes, customers wait for updates, owners have to remind everyone
              what comes next, and the team cannot quickly see where work is stuck. Parkside focuses on those repeated
              moments and turns them into simple, trackable systems.
            </p>
          </div>
        </div>
      </section>

      <section className="section dark-band">
        <div className="container">
          <p className="eyebrow light">What Parkside Builds</p>
          <h2 className="section-title">Simple AI systems for the work your team repeats every week.</h2>
          <div className="grid-3" style={{ marginTop: 34 }}>
            <div className="card">
              <span className="meta">01</span>
              <h3>Better intake</h3>
              <p>Capture the right details up front, sort requests, and route the next step to the right person.</p>
            </div>
            <div className="card">
              <span className="meta">02</span>
              <h3>Reliable follow-up</h3>
              <p>Keep leads, estimates, customer updates, and internal handoffs from depending on memory.</p>
            </div>
            <div className="card">
              <span className="meta">03</span>
              <h3>Clear visibility</h3>
              <p>See open items, aging work, owners, delays, and next actions without rebuilding reports by hand.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Core Use Cases</p>
          <h2 className="section-title">Start where the workflow repeats.</h2>
          <div className="grid-3" style={{ marginTop: 34 }}>
            {useCases.slice(0, 6).map((useCase) => (
              <article className="card" key={useCase.title}>
                <span className="meta">{useCase.category}</span>
                <h3>{useCase.title}</h3>
                <p>{useCase.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--cream-deep)" }}>
        <div className="container split">
          <div>
            <p className="eyebrow">AI Operations Blueprint</p>
            <h2 className="section-title">The first step is diagnosis, not software.</h2>
            <p className="lede">
              The Blueprint is a working session and roadmap. We look at one painful process, find where time and
              follow-up are being lost, and decide what should be automated first.
            </p>
            <div className="button-row">
              <Link className="btn" href="/blueprint">
                Learn About the Blueprint
              </Link>
            </div>
          </div>
          <div className="blueprint-card">
            <div className="blueprint-card-header">
              <span className="meta">Blueprint Output</span>
              <strong>One clear first build</strong>
            </div>
            <ul className="blueprint-list">
              <li>
                <span>1</span>
                <p>Map how the work happens today.</p>
              </li>
              <li>
                <span>2</span>
                <p>Find repeated manual steps and missed follow-up.</p>
              </li>
              <li>
                <span>3</span>
                <p>Review the tools your team already uses.</p>
              </li>
              <li>
                <span>4</span>
                <p>Choose the practical AI or automation to build first.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section dark-band">
        <div className="container">
          <p className="eyebrow light">Process</p>
          <h2 className="section-title">A clear path from workflow pain to a working system.</h2>
          <div className="grid-4" style={{ marginTop: 34 }}>
            {["Clarify", "Map", "Prioritize", "Build"].map((step, index) => (
              <div className="card" key={step}>
                <span className="meta">Step {index + 1}</span>
                <h3>{step}</h3>
                <p>
                  {[
                    "Capture the pain, current process, people, tools, and desired outcome.",
                    "Turn the workflow into a clear picture of owners, handoffs, and stuck points.",
                    "Pick the first build based on repeat volume, business impact, and tool readiness.",
                    "Implement the right automation, assistant, reporting view, or follow-up workflow."
                  ][index]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Offer Path</p>
          <h2 className="section-title">Start with the Blueprint, then build what the workflow actually needs.</h2>
          <div className="grid-4" style={{ marginTop: 34 }}>
            {offers.map((offer) => (
              <article className="card" key={offer.name}>
                <h3>{offer.name}</h3>
                <p>{offer.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--paper)" }}>
        <div className="container split">
          <div>
            <p className="eyebrow">AI Systems Credibility</p>
            <h2 className="section-title">Built around practical AI judgment, not hype.</h2>
          </div>
          <div>
            <p className="lede">
              Parkside evaluates AI opportunities through workflow mapping, tool readiness, data quality, human review
              points, and measurable operating outcomes. Every recommended system needs a clear owner, a defined failure
              path, and a practical reason to exist inside the business.
            </p>
            <div className="credibility-grid" aria-label="AI credibility signals">
              <div>
                <span>01</span>
                <strong>Workflow first</strong>
                <p>AI is scoped around a real recurring process, not a generic chatbot idea.</p>
              </div>
              <div>
                <span>02</span>
                <strong>Guardrails by design</strong>
                <p>Systems include validation, handoffs, and human review where judgment matters.</p>
              </div>
              <div>
                <span>03</span>
                <strong>Operational proof</strong>
                <p>Success is tied to faster follow-up, less manual work, and clearer visibility.</p>
              </div>
            </div>
            <div className="button-row">
              <Link className="btn ghost" href="/intake">
                {primaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section faq-band">
        <div className="container">
          <p className="eyebrow">Common Questions</p>
          <h2 className="section-title">Answers for owners evaluating AI automation.</h2>
          <div className="grid-3" style={{ marginTop: 34 }}>
            <article className="card">
              <h3>Do we need to replace our current tools?</h3>
              <p>
                Usually not. Parkside starts with the tools already in use, then recommends changes only when the current
                setup blocks the workflow.
              </p>
            </article>
            <article className="card">
              <h3>What should we automate first?</h3>
              <p>
                Start with work that repeats often, has a clear owner, and causes delays, missed follow-up, or manual
                reporting effort.
              </p>
            </article>
            <article className="card">
              <h3>Will the website quote pricing?</h3>
              <p>
                No. Pricing stays behind discovery because scope depends on workflow complexity, tools, data readiness,
                and implementation needs.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
