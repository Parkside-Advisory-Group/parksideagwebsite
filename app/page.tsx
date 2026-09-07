import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "../components/JsonLd";
import { TrackedLink } from "../components/TrackedLink";
import SculptureLoader from "../components/experience/SculptureLoader";
import { MotionToggle } from "../components/experience/MotionToggle";
import { ExperienceMotion } from "../components/experience/ExperienceMotion";
import { WorkflowExplorer } from "../components/experience/WorkflowExplorer";
import { fieldNotes } from "../lib/field-notes";
import { createRouteMetadata } from "../lib/metadata";
import {
  createHomeBreadcrumbItems,
  createPageStructuredData,
  offerCatalogId,
  professionalServiceId,
  referenceNode,
  siteUrl,
} from "../lib/structured-data";

export const metadata: Metadata = createRouteMetadata({
  title: "AI & Workflow Automation for Small Businesses | Parkside",
  description:
    "Parkside helps small and mid-sized businesses improve intake, follow-up and reporting with practical AI and workflow automation. Start with a free Workflow Snapshot.",
  path: "/",
});

const structuredData = createPageStructuredData({
  id: `${siteUrl}/#webpage`,
  path: "/",
  name: "Parkside Advisory Group",
  description:
    "Practical AI and workflow automation that give your business room to move.",
  breadcrumbItems: createHomeBreadcrumbItems(),
  mainEntity: [
    referenceNode(professionalServiceId),
    referenceNode(offerCatalogId),
  ],
});

const statement =
  "Your business has places to go. The work between the work shouldn’t hold it back.";
const steps = [
  {
    number: "01",
    title: "Find the friction.",
    body: "We start with the way work actually happens. The inboxes, the handoffs, the spreadsheet someone rebuilds every Friday.",
    detail: "THE FREE WORKFLOW SNAPSHOT",
    link: "/blueprint",
    cta: "Meet your starting point",
  },
  {
    number: "02",
    title: "Design the way forward.",
    body: "One clear plan for one important workflow. What changes, who owns it, where AI helps, and where a person stays in control.",
    detail: "THE AI OPERATIONS BLUEPRINT",
    link: "/services",
    cta: "Explore the approach",
  },
  {
    number: "03",
    title: "Build it. Make it work.",
    body: "We connect the pieces, test with real examples, and help your team put the system to use. Then tune it from what we learn.",
    detail: "AUTOMATION, IMPLEMENTATION & SUPPORT",
    link: "/services",
    cta: "See what we build",
  },
];

export default function HomePage() {
  return (
    <main className="atelier-home">
      <JsonLd data={structuredData} />
      <ExperienceMotion />
      <section className="atelier-hero" aria-labelledby="hero-title">
        <div className="hero-fine-grid" aria-hidden="true" />
        <div className="atelier-hero-topline">
          <span className="atelier-label">
            PRACTICAL INTELLIGENCE. LASTING IMPACT.
          </span>
          <span className="hero-edition atelier-label">
            INDEPENDENT THINKING. CONNECTED SYSTEMS.
          </span>
        </div>
        <div className="atelier-hero-art">
          <div className="sculpture-fallback">
            <Image
              src="/assets/atelier/sculpture.webp"
              alt=""
              fill
              sizes="(max-width: 760px) 100vw, 67vw"
              priority
              fetchPriority="high"
            />
          </div>
          <SculptureLoader />
        </div>
        <div className="atelier-hero-copy">
          <h1 id="hero-title">
            <span className="hero-line">Make room</span>{" "}
            <span className="hero-line hero-line-second">for what</span>{" "}
            <span className="hero-line hero-line-last">
              <em>matters.</em>
            </span>
          </h1>
        </div>
        <div className="atelier-hero-bottom">
          <div className="hero-description">
            <p>
              Practical AI. Thoughtful automation.
              <br />A business with room to move.
            </p>
            <TrackedLink
              className="atelier-button cream-button"
              href="/intake"
              eventName="snapshot_cta_click"
              eventProperties={{ location: "home_hero", href: "/intake" }}
            >
              Find your starting point <span aria-hidden="true">↗</span>
            </TrackedLink>
            <span className="hero-cta-note">
              Start with a free Workflow Snapshot
            </span>
          </div>
          <a className="hero-explore" href="#perspective">
            <span className="explore-circle" aria-hidden="true">
              ↓
            </span>
            <span>
              Explore
              <br />a clearer way
            </span>
          </a>
          <div className="hero-utility">
            <span className="hero-location">
              BASED IN THE MIDWEST
              <br />
              BUILT AROUND YOUR BUSINESS
            </span>
            <div id="sculpture-control" />
            <MotionToggle />
          </div>
        </div>
      </section>

      <section id="perspective" className="atelier-perspective atelier-pad">
        <div className="atelier-section-meta">
          <span className="atelier-label">A LITTLE PERSPECTIVE</span>
          <span className="atelier-label">01 — 05</span>
        </div>
        <h2 className="atelier-statement">
          {statement.split(" ").map((word, index) => (
            <span key={index} className="statement-word">
              {word}{" "}
            </span>
          ))}
        </h2>
        <div className="perspective-bottom" data-reveal>
          <span className="perspective-symbol" aria-hidden="true">
            ↳
          </span>
          <p>
            Missed follow-ups. Manual reports. The constant chase for an update.
            We help untangle the everyday work, so your people can get back to
            what they do best.
          </p>
          <p>
            AI and workflow automation for small and mid-sized businesses. Based in
            Northwest Indiana, working with teams across Chicagoland and the United States.
          </p>
        </div>
      </section>

      <section className="atelier-capabilities atelier-pad" id="capabilities">
        <div className="atelier-section-meta">
          <span className="atelier-label">WHAT WE MAKE POSSIBLE</span>
          <span className="atelier-label">02 — 05</span>
        </div>
        <div className="atelier-section-heading" data-reveal>
          <h2>
            Less friction.
            <br />
            <em>More forward.</em>
          </h2>
          <p>
            Start with the part of your day
            <br />
            that should be easier.
          </p>
        </div>
        <WorkflowExplorer />
      </section>

      <section className="atelier-portal" aria-label="A clearer way through">
        <div className="portal-image">
          <Image
            src="/assets/atelier/architecture.webp"
            alt="An uninterrupted gold ribbon passes through a monumental burgundy arch into a sunlit cream space"
            fill
            sizes="100vw"
            quality={90}
          />
        </div>
        <div className="portal-shade" />
        <div className="portal-caption" data-reveal>
          <span className="atelier-label">COMPLEXITY, MEET CLARITY.</span>
          <h2>
            A clearer
            <br />
            <em>way through.</em>
          </h2>
        </div>
        <div className="portal-bottom">
          <span>Good systems make space.</span>
          <span className="atelier-label">PARKSIDE ADVISORY GROUP</span>
        </div>
      </section>

      <section className="atelier-approach atelier-pad" id="approach">
        <div className="atelier-section-meta">
          <span className="atelier-label">FROM POSSIBILITY TO PRACTICE</span>
          <span className="atelier-label">03 — 05</span>
        </div>
        <div className="approach-layout">
          <div className="approach-intro" data-reveal>
            <h2>
              Thoughtfully
              <br />
              considered.
              <br />
              <em>Actually built.</em>
            </h2>
            <p>
              A clear starting point. A practical plan.
              <br />
              And a partner who stays for the work.
            </p>
            <Link href="/blueprint" className="atelier-text-link">
              How we work <span aria-hidden="true">↗</span>
            </Link>
            <div className="approach-art" aria-hidden="true">
              <span />
              <span />
              <span />
              <i />
            </div>
          </div>
          <div className="approach-steps">
            {steps.map((step) => (
              <article className="approach-step" key={step.number} data-reveal>
                <span className="step-number">{step.number}</span>
                <div>
                  <span className="atelier-label">{step.detail}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <Link className="atelier-text-link" href={step.link}>
                    {step.cta} <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="atelier-human atelier-pad" id="people">
        <div className="atelier-section-meta">
          <span className="atelier-label">EXPERIENCE BEHIND THE IDEAS</span>
          <span className="atelier-label">04 — 05</span>
        </div>
        <div className="human-layout">
          <div className="human-portrait" data-reveal>
            <Image
              src="/assets/atelier/balance.webp"
              alt="A gold ribbon surrounds a calm stone sphere on a burgundy pedestal"
              width={700}
              height={850}
              sizes="(max-width: 760px) 100vw, 38vw"
            />
            <div className="portrait-caption">
              <span>Complexity, with a human center.</span>
              <span className="atelier-label">THE PARKSIDE PERSPECTIVE</span>
            </div>
          </div>
          <div className="human-copy" data-reveal>
            <h2>
              Technology
              <br />
              is the tool.
              <br />
              <em>
                People are
                <br />
                the point.
              </em>
            </h2>
            <p>
              Parkside brings an operator’s perspective to AI and automation.
              Anthony’s background spans project controls, financial planning,
              and the reality of keeping complex work moving.
            </p>
            <p>
              That experience shapes how we work: ask good questions, make the
              next step clear, and build something people can actually use.
            </p>
            <Link className="atelier-text-link" href="/about">
              The thinking behind Parkside <span aria-hidden="true">↗</span>
            </Link>
            <div className="human-proof">
              <div>
                <strong>
                  10<span>+</span>
                </strong>
                <span>YEARS IN COMPLEX OPERATIONS</span>
              </div>
              <div>
                <strong>
                  $500<span>M+</span>
                </strong>
                <span>CAPITAL PROGRAM EXPERIENCE</span>
              </div>
            </div>
            <p className="proof-note">
              Experience from Anthony’s career in utility and energy
              infrastructure.
            </p>
          </div>
        </div>
      </section>

      <section className="atelier-journal atelier-pad">
        <div className="atelier-section-meta">
          <span className="atelier-label">NOTES FROM THE WORK</span>
          <span className="atelier-label">05 — 05</span>
        </div>
        <div className="atelier-section-heading" data-reveal>
          <h2>
            A little less noise.
            <br />
            <em>A useful perspective.</em>
          </h2>
          <Link className="atelier-text-link" href="/field-notes">
            All field notes <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="journal-list">
          {fieldNotes.slice(1, 3).map((note, index) => (
            <Link
              className="journal-entry"
              href={`/field-notes/${note.slug}`}
              key={note.slug}
              data-reveal
            >
              <span className="journal-number">0{index + 1}</span>
              <div>
                <span className="atelier-label">
                  {note.category} <span className="journal-divider">/</span>{" "}
                  {note.readTime}
                </span>
                <h3>{note.title}</h3>
              </div>
              <span className="journal-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="atelier-invitation atelier-pad">
        <div className="invitation-orbits" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="atelier-label">EVERY BETTER WAY HAS A BEGINNING.</span>
        <h2 data-reveal>
          What could
          <br />
          <em>work better?</em>
        </h2>
        <div className="invitation-bottom">
          <p>
            Let’s look at one workflow.
            <br />
            Your first Snapshot is on us.
          </p>
          <TrackedLink
            className="atelier-button cream-button"
            href="/intake"
            eventName="snapshot_cta_click"
            eventProperties={{ location: "home_final_cta", href: "/intake" }}
          >
            Get the free Snapshot <span aria-hidden="true">↗</span>
          </TrackedLink>
          <span className="invitation-note">
            A personal review.
            <br />
            No charge. No obligation.
          </span>
        </div>
      </section>
    </main>
  );
}
