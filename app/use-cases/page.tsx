import Link from "next/link";
import { primaryCta, useCases } from "../../lib/content";

export const metadata = {
  title: "Use Cases",
  description: "Common use cases for practical AI systems and workflow automation."
};

export default function UseCasesPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Use Cases</p>
          <h1 className="page-title">AI and automation work best where the process repeats.</h1>
          <p className="lede">
            Parkside looks for recurring workflows where better intake, follow-up, triage, drafting, or visibility can
            reduce manual work without forcing a tool replacement.
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
