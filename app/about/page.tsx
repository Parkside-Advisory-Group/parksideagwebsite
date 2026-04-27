import Link from "next/link";
import { primaryCta } from "../../lib/content";

export const metadata = {
  title: "About",
  description:
    "About Parkside Advisory Group, its leadership, operating experience, and practical approach to AI-supported workflows."
};

const profileUrl = "https://www.linkedin.com/in/anthonymora1/";

const operatingProof = [
  "10+ years in project controls, cost management, forecasting, executive reporting, and financial accountability",
  "Experience supporting large utility and energy infrastructure programs, including capital work exceeding $500M",
  "Budget development, baseline establishment, accrual tracking, variance analysis, and EAC/ETC forecasting",
  "Reporting workflows using Power BI, Excel, SAP/Oracle data, KPIs, S-curves, earned value, and executive dashboards",
  "Operating work across change control, risk review, cash flow, project status, and leadership decision support"
];

const methodPoints = [
  "Define the trigger that starts the work",
  "Name the owner and next action for every step",
  "Identify the source of truth across inboxes, spreadsheets, CRMs, calendars, or operating tools",
  "Check data quality before AI or automation is allowed to act",
  "Set the human review point and failure path",
  "Measure whether the system improves follow-up, visibility, or handoff discipline"
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://parksideag.com/about#aboutpage",
      url: "https://parksideag.com/about",
      name: "About Parkside Advisory Group",
      description:
        "Leadership, operating experience, methodology, and service-area information for Parkside Advisory Group.",
      isPartOf: { "@id": "https://parksideag.com/#website" },
      about: { "@id": "https://parksideag.com/#organization" },
      primaryImageOfPage: "https://parksideag.com/brand/icons/favicon.svg",
      inLanguage: "en-US"
    },
    {
      "@type": "Person",
      "@id": "https://parksideag.com/about#anthony-mora",
      name: "Anthony Mora",
      jobTitle: "Consulting Partner",
      url: "https://parksideag.com/about",
      sameAs: [profileUrl],
      worksFor: { "@id": "https://parksideag.com/#organization" },
      knowsAbout: [
        "AI workflow automation",
        "Project controls",
        "Cost management",
        "Forecasting",
        "Executive reporting",
        "Financial planning",
        "Workflow visibility",
        "Business process improvement"
      ]
    }
  ]
};

export default function AboutPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="page-hero">
        <div className="container split">
          <div>
            <p className="eyebrow">About Parkside</p>
            <h1 className="page-title">Parkside makes daily work easier to see, own, and move.</h1>
          </div>
          <div>
            <p className="lede">
              Parkside Advisory Group helps businesses fix recurring work that gets stuck between people, tools, and
              follow-up. The work starts by mapping what happens today, including the parts everyone knows are fragile.
            </p>
            <p className="lede">
              AI is only useful when the job is clear. Parkside reviews tool readiness, data quality, ownership, human
              review points, and the failure path before recommending automation. The goal is a system the team can use
              on an ordinary Tuesday, not a demo that looks clever once.
            </p>
            <div className="button-row">
              <Link className="btn ghost" href="/intake">
                {primaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div>
            <p className="eyebrow">Leadership</p>
            <h2 className="section-title">Accountable operating experience behind the work.</h2>
          </div>
          <div className="panel">
            <p>
              Parkside is led by Anthony Mora, Consulting Partner, who brings more than 10 years of experience turning
              complex operating data into clearer decisions for project teams and executives. His background spans
              project controls, cost management, forecasting, executive reporting, financial planning, and reporting
              automation across large utility and energy infrastructure programs.
            </p>
            <p>
              That operating discipline shapes how Parkside approaches AI and workflow automation. The work starts with
              the real process: who owns it, where information lives, what good handling looks like, and where a person
              still needs to review the result.
            </p>
            <div className="button-row">
              <a className="btn ghost" href={profileUrl} rel="noreferrer" target="_blank">
                View LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--cream-deep)" }}>
        <div className="container">
          <p className="eyebrow">Operating Proof</p>
          <h2 className="section-title">Built from forecasting, reporting, and accountability work.</h2>
          <div className="grid-2" style={{ marginTop: 34 }}>
            {operatingProof.map((point) => (
              <article className="card" key={point}>
                <p>{point}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">Methodology</p>
            <h2 className="section-title">Automation is recommended only after the workflow is clear.</h2>
            <p className="lede">
              Parkside applies project-controls thinking to everyday business workflows: define the work, expose the
              handoff, make status visible, and keep human accountability where judgment matters.
            </p>
          </div>
          <ul className="audit-checklist" aria-label="Parkside workflow automation methodology">
            {methodPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section dark-band">
        <div className="container split">
          <div>
            <p className="eyebrow light">Service Area</p>
            <h2 className="section-title">Practical AI operations support for businesses across the United States.</h2>
          </div>
          <div>
            <p className="lede">
              Parkside works with businesses that need better intake, follow-up, reporting visibility, and internal
              handoffs. Engagements can be run remotely across the United States, with regional relevance for operators
              in Charlotte, North Carolina, and the broader Carolinas market.
            </p>
            <p className="lede">
              The first step is usually the AI Operations Blueprint: a focused review of one recurring workflow, the
              current tools involved, the team responsible for the work, and the practical system worth building first.
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
