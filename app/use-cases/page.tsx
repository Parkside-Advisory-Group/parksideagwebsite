import Link from "next/link";
import { primaryCta, useCases } from "../../lib/content";

export const metadata = {
  title: "Use Cases",
  description: "Practical AI and automation use cases for repeated business workflows."
};

export default function UseCasesPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Use Cases</p>
          <h1 className="page-title">Good use cases are easy to spot. They repeat, stall, and have an owner.</h1>
          <p className="lede">
            Parkside looks for places where the team already knows the work matters: missed callbacks, stale estimates,
            slow updates, handoff gaps, and reports that have to be rebuilt by hand.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid-3">
          {useCases.map((useCase) => (
            <article className="card" key={useCase.title}>
              <span className="meta">{useCase.category}</span>
              <h3>{useCase.title}</h3>
              <p>{useCase.description}</p>
              <ul className="plain-list">
                {useCase.signals.map((signal) => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="container button-row">
          <Link className="btn" href="/intake">
            {primaryCta}
          </Link>
        </div>
      </section>
    </main>
  );
}
