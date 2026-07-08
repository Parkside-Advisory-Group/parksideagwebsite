import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "../components/JsonLd";
import { HomeHeroVisualLoader } from "../components/HomeHeroVisualLoader";
import { TrackedLink } from "../components/TrackedLink";
import { OperatingField } from "../components/visuals/OperatingField";
import { ThreadRail } from "../components/visuals/ThreadRail";
import { primaryCta } from "../lib/content";
import { fieldNotes } from "../lib/field-notes";
import { createRouteMetadata } from "../lib/metadata";
import {
  createHomeBreadcrumbItems,
  createPageStructuredData,
  offerCatalogId,
  professionalServiceId,
  referenceNode,
  siteUrl
} from "../lib/structured-data";

export const metadata: Metadata = createRouteMetadata({
  title: "Free AI Workflow Savings Snapshot | Parkside Advisory Group",
  description:
    "Get a free AI Workflow Savings Snapshot for one messy business process. Parkside identifies handoff leaks, manual-work drag, and the first practical AI automation opportunity.",
  path: "/"
});

interface LedgerEntry {
  point: string;
  flag: string;
}

interface NumberedItem {
  number: string;
  title: string;
  body?: string;
}

interface WorkflowState {
  state: string;
  title: string;
  items: string[];
}

const problemLedger: LedgerEntry[] = [
  { point: "New leads sit in an inbox until someone remembers to reply", flag: "No owner" },
  { point: "Estimates age out because no one owns the next follow-up", flag: "Decay" },
  { point: "Customer updates depend on texts, memory, and side conversations", flag: "Untracked" },
  { point: "Weekly reporting means rebuilding the same spreadsheet again", flag: "Rework" },
  { point: "AI tools get tested once, then abandoned because no workflow owns them", flag: "Orphaned" }
];

const workflowStates: WorkflowState[] = [
  {
    state: "State A — As found",
    title: "Before Parkside",
    items: [
      "A missed call becomes a sticky note, then a text, then a forgotten task.",
      "Owners ask for status because the work is scattered across inboxes and spreadsheets.",
      "The team knows the process, but the process is not written anywhere useful."
    ]
  },
  {
    state: "State B — After the first build",
    title: "After the first build",
    items: [
      "Requests are captured with the right details and routed to a clear owner.",
      "Follow-up prompts, reminders, and summaries happen without someone chasing them by hand.",
      "Managers can see what is open, aging, blocked, and ready for the next action."
    ]
  }
];

const processSteps: NumberedItem[] = [
  {
    number: "01",
    title: "Inspect the work",
    body: "Review intake, missed follow-up, stale estimates, customer updates, reporting, and handoffs."
  },
  {
    number: "02",
    title: "Find the first build",
    body: "Choose one recurring workflow where better capture, routing, or visibility would matter quickly."
  },
  {
    number: "03",
    title: "Install the operating layer",
    body: "Create the automation, AI assist, checklist, or reporting view the process actually needs."
  },
  {
    number: "04",
    title: "Put owners on every step",
    body: "Make the next action visible so work stops depending on memory or one person checking everything."
  },
  {
    number: "05",
    title: "Tune from real use",
    body: "Adjust the system after the team uses it, then decide what is worth building next."
  }
];

const inspectionPoints: string[] = [
  "Lead capture, missed calls, and first response",
  "Estimate follow-up and aging opportunities",
  "Customer updates and internal handoffs",
  "Manual reporting, spreadsheet cleanup, and status checks",
  "Tool readiness, data quality, and human review points"
];

const doNotAutomatePoints: string[] = [
  "Judgment calls where the customer needs a person",
  "Broken processes that need ownership before software",
  "Tasks where bad data would create more cleanup",
  "Anything that would reduce trust, quality, or accountability"
];

const auditPoints: string[] = [
  "The repeated workflow to fix first",
  "The owner, trigger, and next action for each step",
  "The AI or automation role, if one is useful",
  "The human review point and failure path"
];

const enablementPoints: string[] = [
  "Examples of real leads, estimates, messages, or reports",
  "Access to the tools already used by the team",
  "One owner who can confirm how the work should move",
  "A willingness to simplify the process before automating it"
];

const structuredData = createPageStructuredData({
  id: `${siteUrl}/#webpage`,
  path: "/",
  name: "Parkside Advisory Group",
  description:
    "Parkside helps businesses turn missed follow-up and manual work into clear operating systems with practical AI and automation.",
  breadcrumbItems: createHomeBreadcrumbItems(),
  mainEntity: [referenceNode(professionalServiceId), referenceNode(offerCatalogId)]
});

export default function HomePage() {
  return (
    <main>
      <JsonLd data={structuredData} />
      <ThreadRail />

      <section className="hero home-hero" data-register="PS·00 · Survey">
        <OperatingField />
        <div className="container home-hero-content">
          <div className="hero-copy">
            <p className="hero-register">
              Free AI Workflow Savings Snapshot <span>· PS·00 / FIELD SURVEY</span>
            </p>
            <h1 className="page-title">
              Find the workflow <em>leak</em> before buying another AI tool.
            </h1>
            <p className="lede">
              A free Snapshot for one messy, repetitive business process. Parkside reviews the handoff, names likely
              leaks, and shows the first practical AI or automation opportunity.
            </p>
            <p className="hero-trust">
              No charge, no obligation, and a reply within 1–2 business days. If the workflow is not ready for
              automation, the Snapshot says so — and names what to fix first.
            </p>
            <div className="button-row">
              <Link className="btn" href="/intake">
                {primaryCta}
              </Link>
              <TrackedLink
                className="btn secondary"
                href="/opportunity-estimator"
                eventName="secondary_cta_click"
                eventProperties={{ location: "home_hero", cta: "Score Your Workflow in 2 Minutes" }}
              >
                Score Your Workflow in 2 Minutes
              </TrackedLink>
            </div>
          </div>
        </div>
        <div className="hero-strip" aria-label="Common Parkside starting points">
          <div className="hero-strip-inner">
            <div className="hero-strip-cell">
              <span className="hero-strip-label">Starting point 01</span>
              <span className="hero-strip-value">Lead intake</span>
            </div>
            <div className="hero-strip-cell">
              <span className="hero-strip-label">Starting point 02</span>
              <span className="hero-strip-value">Estimate follow-up</span>
            </div>
            <div className="hero-strip-cell is-flag">
              <span className="hero-strip-label">Starting point 03</span>
              <span className="hero-strip-value">Manual reporting</span>
            </div>
            <div className="hero-scroll-cue">Survey begins</div>
          </div>
        </div>
      </section>

      <section
        className="section section-plotted home-problem-section"
        data-register="PS·01 · Problem"
      >
        <span className="section-register" aria-hidden="true">
          PS·01 / Problem
        </span>
        <div className="container split home-section-split">
          <div>
            <p className="eyebrow">The Problem</p>
            <h2 className="section-title">
              Most businesses do not have an AI problem. They have a <em>handoff</em> problem.
            </h2>
            <div className="home-editorial-image">
              <Image
                src="/assets/generated/editorial-desk.webp"
                alt="Cluttered desk of paper invoices and sticky notes under warm lamp light"
                fill
                loading="eager"
                sizes="(max-width: 900px) 100vw, 42vw"
              />
            </div>
            <p className="image-caption">
              <span>Fig. 01 — Work, as found</span>
              <span>Scattered</span>
            </p>
          </div>
          <ul className="ledger" aria-label="Common operating problems">
            {problemLedger.map((entry, index) => (
              <li key={entry.point}>
                <span className="ledger-index">{String(index + 1).padStart(2, "0")}</span>
                <span>{entry.point}</span>
                <span className="ledger-flag">{entry.flag}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section home-reframe-section" data-register="PS·02 · Reframe">
        <div className="container">
          <div className="reframe-panel reveal-on-scroll">
            <div>
              <p className="eyebrow light">The Reframe</p>
              <p className="reframe-copy">
                A better tool will not fix an <em>unclear next step</em>.
              </p>
            </div>
            <div className="reframe-detail">
              <p>Parkside starts with the moment work gets dropped.</p>
              <p>Then we define the trigger, owner, deadline, and review point.</p>
              <strong>Automation comes after that.</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-plotted" data-register="PS·03 · Changes">
        <span className="section-register" aria-hidden="true">
          PS·03 / Comparison
        </span>
        <div className="container">
          <p className="eyebrow">What Changes</p>
          <h2 className="section-title">From scattered work to a workflow your team can actually run.</h2>
          <div className="workflow-comparison" aria-label="Workflow before and after Parkside">
            {workflowStates.map((state, index) => (
              <article className="workflow-column" key={state.title}>
                <span className="workflow-state">{state.state}</span>
                <svg className="workflow-line" viewBox="0 0 400 44" preserveAspectRatio="none" aria-hidden="true">
                  {index === 0 ? (
                    <path pathLength="1" d="M 0 22 C 30 4, 44 42, 70 20 S 108 2, 132 30 S 178 44, 204 12 S 246 38, 276 18 S 330 40, 356 14 S 388 30, 400 22" />
                  ) : (
                    <path pathLength="1" d="M 0 30 C 80 30, 120 22, 200 22 S 340 22, 400 22" />
                  )}
                </svg>
                <h3>{state.title}</h3>
                <ul>
                  {state.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-band home-process-band" id="how-it-works" data-register="PS·04 · Method">
        <span className="section-register" aria-hidden="true">
          PS·04 / Method
        </span>
        <div className="container process-editorial">
          <div className="process-narrative">
            <p className="eyebrow light">How It Works</p>
            <h2 className="section-title">A clear path from the problem you feel to the first useful recommendation.</h2>
            <p className="lede">
              The free Snapshot does not start with a software recommendation. It starts with the actual path from first
              contact to done, then points to the first practical AI or workflow opportunity.
            </p>
            <div className="process-instrument">
              <HomeHeroVisualLoader />
            </div>
          </div>
          <div className="home-timeline" aria-label="How Parkside builds operating systems">
            {processSteps.map((step) => (
              <article className="home-timeline-step" key={step.title}>
                <span>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-ai-fit-section" data-register="PS·05 · Inspection">
        <span className="section-register" aria-hidden="true">
          PS·05 / Inspection
        </span>
        <div className="container split home-section-split">
          <div>
            <p className="eyebrow">What We Inspect</p>
            <h2 className="section-title">The everyday operating points where work usually slips.</h2>
          </div>
          <ul className="ledger" aria-label="Operating points Parkside inspects">
            {inspectionPoints.map((point, index) => (
              <li key={point}>
                <span className="ledger-index">{String(index + 1).padStart(2, "0")}</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section use-case-section" data-register="PS·06 · Guardrails">
        <span className="section-register" aria-hidden="true">
          PS·06 / Guardrails
        </span>
        <div className="container">
          <p className="eyebrow">What We Will Not Automate</p>
          <h2 className="section-title">Not every slow step should become software.</h2>
          <div className="use-case-map" aria-label="Work Parkside will not automate without guardrails">
            {doNotAutomatePoints.map((point, index) => (
              <article className="use-case-column" key={point}>
                <span className="meta">Guardrail {String(index + 1).padStart(2, "0")}</span>
                <h3>{point}</h3>
                <ul>
                  <li>Keep the person, fix the process, or add review before AI touches it.</li>
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section section-plotted home-audit-section"
        data-register="PS·07 · Snapshot"
      >
        <span className="section-register" aria-hidden="true">
          PS·07 / Snapshot
        </span>
        <div className="container split home-section-split">
          <div>
            <p className="eyebrow">Primary Next Step</p>
            <h2 className="section-title">The free Snapshot gives you a useful answer before you spend money.</h2>
            <div className="home-editorial-image">
              <Image
                src="/assets/generated/editorial-drafting.webp"
                alt="Brass drafting instruments over a plotted gold curve on cream vellum"
                fill
                loading="lazy"
                sizes="(max-width: 900px) 100vw, 42vw"
              />
            </div>
            <p className="image-caption">
              <span>Fig. 02 — The first build, drawn</span>
              <span>Plotted</span>
            </p>
            <div className="button-row">
              <Link className="btn" href="/intake">
                {primaryCta}
              </Link>
            </div>
          </div>
          <ul className="audit-checklist" aria-label="What a good first build defines">
            {auditPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section home-estimator-section" data-register="PS·08 · Estimator">
        <div className="container split home-section-split">
          <div>
            <p className="eyebrow">Opportunity Estimator</p>
            <h2 className="section-title">Not sure if the workflow is ready? Score it before the call.</h2>
          </div>
          <div className="panel">
            <p>
              Answer eight short questions about the workflow — repeat volume, owner, tools, recent examples, business
              impact, and urgency — and get a straight recommendation: request the Snapshot, narrow the workflow first,
              or prepare before automating anything.
            </p>
            <div className="button-row">
              <Link className="btn ghost" href="/opportunity-estimator">
                Score Your Workflow in 2 Minutes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-plotted home-enable-section" data-register="PS·09 · Enablement">
        <span className="section-register" aria-hidden="true">
          PS·09 / Enablement
        </span>
        <div className="container split home-section-split">
          <div>
            <p className="eyebrow">Team Enablement</p>
            <h2 className="section-title">What Parkside needs from your team.</h2>
            <div className="home-editorial-image">
              <Image
                src="/assets/generated/editorial-study.webp"
                alt="Dark study wall of pinned schedules and plotted curves under lamp light"
                fill
                loading="lazy"
                sizes="(max-width: 900px) 100vw, 42vw"
              />
            </div>
            <p className="image-caption">
              <span>Fig. 03 — The operating room</span>
              <span>Instrumented</span>
            </p>
          </div>
          <ul className="ledger" aria-label="How Parkside enables teams">
            {enablementPoints.map((point, index) => (
              <li key={point}>
                <span className="ledger-index">{String(index + 1).padStart(2, "0")}</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section field-notes-preview-section" data-register="PS·10 · Notes">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Field Notes</p>
              <h2 className="section-title">Useful thinking before the first call.</h2>
            </div>
            <Link className="text-link" href="/field-notes">
              View all notes
            </Link>
          </div>
          <div className="field-notes-grid preview-grid">
            {fieldNotes.slice(0, 3).map((note) => (
              <article className="field-note-card" key={note.slug}>
                <p className="eyebrow">{note.category}</p>
                <h3>{note.title}</h3>
                <p>{note.description}</p>
                <Link className="text-link" href={`/field-notes/${note.slug}`}>
                  Read the note
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-band home-final-cta" data-register="PS·11 · Resolution">
        <div className="container narrow-container reveal-on-scroll">
          <svg className="resolved-line" viewBox="0 0 900 60" preserveAspectRatio="none" aria-hidden="true">
            <path pathLength="1" d="M 0 30 C 40 6, 70 52, 110 28 S 170 8, 210 34 S 280 50, 330 26 C 420 30, 520 30, 620 30 S 820 30, 900 30" />
          </svg>
          <h2 className="section-title">
            If the team is still chasing the same work every week, start with the <em>Snapshot</em>.
          </h2>
          <p className="lede">Share the workflow. See the likely leaks. Decide what is worth building next.</p>
          <div className="button-row">
            <TrackedLink
              className="btn"
              href="/intake"
              eventName="snapshot_cta_click"
              eventProperties={{ location: "home_final", cta: primaryCta }}
            >
              {primaryCta}
            </TrackedLink>
          </div>
          <p className="cta-assurance">Reviewed personally · Reply within 1–2 business days · No obligation</p>
        </div>
      </section>
    </main>
  );
}
