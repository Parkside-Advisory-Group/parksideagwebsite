import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "../components/JsonLd";
import { HomeHeroVisualLoader } from "../components/HomeHeroVisualLoader";
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
  title: "Parkside Advisory Group | AI Automation for Business Workflows",
  description:
    "Parkside helps businesses turn missed follow-up and manual work into clear operating systems with practical AI and automation.",
  path: "/"
});

interface NumberedItem {
  number: string;
  title: string;
  body?: string;
}

interface WorkflowState {
  title: string;
  items: string[];
}

const problemPoints: string[] = [
  "New leads sit in an inbox until someone remembers to reply",
  "Estimates age out because no one owns the next follow-up",
  "Customer updates depend on texts, memory, and side conversations",
  "Weekly reporting means rebuilding the same spreadsheet again"
];

const workflowStates: WorkflowState[] = [
  {
    title: "Before Parkside",
    items: [
      "A missed call becomes a sticky note, then a text, then a forgotten task.",
      "Owners ask for status because the work is scattered across inboxes and spreadsheets.",
      "The team knows the process, but the process is not written anywhere useful."
    ]
  },
  {
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
      <section className="hero home-hero">
        <div className="hero-media home-hero-media">
          <Image
            src="/assets/DSC04055+copy.jpg.webp"
            alt="Tree-lined path at sunrise"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="container hero-content home-hero-content">
          <div className="hero-copy">
            <p className="eyebrow light">AI Operations Blueprint</p>
            <h1 className="page-title">Turn missed follow-up and manual work into clear operating systems.</h1>
            <p className="lede">
              Parkside finds the places where requests stall, estimates go cold, and teams chase status, then builds
              the practical AI and automation layer that keeps the work moving.
            </p>
            <p className="hero-trust">
              Built for project-based and service businesses that need follow-up, reporting, and handoffs to stop
              depending on memory.
            </p>
            <div className="hero-signal" aria-label="Common Parkside starting points">
              <span>Lead intake</span>
              <span>Estimate follow-up</span>
              <span>Manual reporting</span>
            </div>
            <div className="button-row">
              <Link className="btn" href="/intake">
                {primaryCta}
              </Link>
              <Link className="btn secondary" href="#how-it-works">
                See How It Works
              </Link>
            </div>
          </div>
          <HomeHeroVisualLoader />
        </div>
        <div className="hero-baseline" />
      </section>

      <section className="section home-problem-section">
        <div className="container split home-section-split">
          <div>
            <p className="eyebrow">The Problem</p>
            <h2 className="section-title">The leak is usually in the handoff.</h2>
            <div className="home-editorial-image">
              <Image
                src="/assets/DSC02953-2+Medium.jpeg.webp"
                alt="Foggy road representing unclear handoffs and hidden workflow delays"
                fill
                loading="eager"
                sizes="(max-width: 900px) 100vw, 42vw"
              />
            </div>
          </div>
          <ul className="home-stagger-list premium-list" aria-label="Common operating problems">
            {problemPoints.map((point, index) => (
              <li key={point}>
                <span className="home-list-index">{String(index + 1).padStart(2, "0")}</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section home-reframe-section">
        <div className="container">
          <div className="reframe-panel reveal-on-scroll">
            <div>
              <p className="eyebrow light">The Reframe</p>
              <p className="reframe-copy">A better tool will not fix an unclear next step.</p>
            </div>
            <div className="reframe-detail">
              <p>Parkside starts with the moment work gets dropped.</p>
              <p>Then we define the trigger, owner, deadline, and review point.</p>
              <strong>Automation comes after that.</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">What Changes</p>
          <h2 className="section-title">From scattered work to a workflow your team can actually run.</h2>
          <div className="workflow-comparison" aria-label="Workflow before and after Parkside">
            {workflowStates.map((state) => (
              <article className="workflow-column reveal-on-scroll" key={state.title}>
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

      <section className="section dark-band home-process-band" id="how-it-works">
        <div className="container process-editorial">
          <div className="process-narrative">
            <p className="eyebrow light">How It Works</p>
            <h2 className="section-title">A clear path from the problem you feel to the system you can use.</h2>
            <p className="lede">
              The Blueprint does not start with a software recommendation. It starts with the actual path from first
              contact to done, including the places where work slows down.
            </p>
          </div>
          <div className="home-timeline" aria-label="How Parkside builds operating systems">
            {processSteps.map((step) => (
              <article className="home-timeline-step reveal-on-scroll" key={step.title}>
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

      <section className="section home-ai-fit-section">
        <div className="container split home-section-split">
          <div>
            <p className="eyebrow">What We Inspect</p>
            <h2 className="section-title">The everyday operating points where work usually slips.</h2>
          </div>
          <ul className="home-clean-list premium-list ai-fit-list reveal-on-scroll" aria-label="Operating points Parkside inspects">
            {inspectionPoints.map((point, index) => (
              <li key={point}>
                <span className="home-list-index">{String(index + 1).padStart(2, "0")}</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section use-case-section">
        <div className="container">
          <p className="eyebrow">What We Will Not Automate</p>
          <h2 className="section-title">Not every slow step should become software.</h2>
          <div className="use-case-map" aria-label="Work Parkside will not automate without guardrails">
            {doNotAutomatePoints.map((point, index) => (
              <article className="use-case-column reveal-on-scroll" key={point}>
                <span className="meta">{String(index + 1).padStart(2, "0")}</span>
                <h3>{point}</h3>
                <ul>
                  <li>Keep the person, fix the process, or add review before AI touches it.</li>
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-audit-section">
        <div className="container split home-section-split">
          <div>
            <p className="eyebrow">Primary Next Step</p>
            <h2 className="section-title">A good first build is narrow, visible, and owned.</h2>
            <div className="home-editorial-image">
              <Image
                src="/assets/DSC07222.jpeg.webp"
                alt="City street at sunset representing daily business activity and follow-up"
                fill
                loading="eager"
                sizes="(max-width: 900px) 100vw, 42vw"
              />
            </div>
            <div className="button-row">
              <Link className="btn" href="/intake">
                {primaryCta}
              </Link>
            </div>
          </div>
          <ul className="audit-checklist home-audit-list premium-list reveal-on-scroll" aria-label="What a good first build defines">
            {auditPoints.map((point, index) => (
              <li key={point}>
                <span className="home-list-index">{String(index + 1).padStart(2, "0")}</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section home-enable-section">
        <div className="container split home-section-split">
          <div>
            <p className="eyebrow">Team Enablement</p>
            <h2 className="section-title">What Parkside needs from your team.</h2>
            <div className="home-editorial-image">
              <Image
                src="/assets/AA396370-3ADB-4787-B619-969589BB3CFA.jpg.webp"
                alt="Business district at sunset representing Parkside's operating base"
                fill
                loading="eager"
                sizes="(max-width: 900px) 100vw, 42vw"
              />
            </div>
          </div>
          <ul className="home-clean-list premium-list team-list reveal-on-scroll" aria-label="How Parkside enables teams">
            {enablementPoints.map((point, index) => (
              <li key={point}>
                <span className="home-list-index">{String(index + 1).padStart(2, "0")}</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section field-notes-preview-section">
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
              <article className="field-note-card reveal-on-scroll" key={note.slug}>
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

      <section className="section dark-band home-final-cta">
        <div className="container narrow-container reveal-on-scroll">
          <h2 className="section-title">If the team is still chasing the same work every week, start there.</h2>
          <p className="lede">Map the workflow. Pick the first build. Make the next action visible.</p>
          <div className="button-row">
            <Link className="btn" href="/intake">
              {primaryCta}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
