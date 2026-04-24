import Link from "next/link";
import { primaryCta } from "../../lib/content";

export const metadata = {
  title: "AI Operations Blueprint",
  description: "A practical diagnostic for identifying AI and automation opportunities in recurring workflows."
};

export default function BlueprintPage() {
  return (
    <main>
      <section className="page-hero dark-band">
        <div className="container">
          <p className="eyebrow light">AI Operations Blueprint</p>
          <h1 className="page-title">A focused operating review before implementation begins.</h1>
          <p className="lede">
            The Blueprint turns workflow pain into a practical implementation roadmap. It clarifies the process,
            identifies automation opportunities, and separates useful AI systems from unnecessary complexity.
          </p>
          <div className="button-row">
            <Link className="btn" href="/intake">
              {primaryCta}
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container grid-3">
          {[
            ["Workflow clarity", "Map the current process, owners, handoffs, recurring decisions, and failure points."],
            ["Opportunity prioritization", "Score automation candidates by recurrence, impact, readiness, and urgency."],
            ["Implementation roadmap", "Define the first system to build, what to avoid, and what must be true before launch."]
          ].map(([title, body]) => (
            <article className="card" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
