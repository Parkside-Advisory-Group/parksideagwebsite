import Link from "next/link";
import { offers, primaryCta } from "../../lib/content";

export const metadata = {
  title: "Services",
  description: "AI operations, workflow automation, AI agent builds, and retainer support from Parkside Advisory Group."
};

export default function ServicesPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Services</p>
          <h1 className="page-title">Practical AI systems matched to operational need.</h1>
          <p className="lede">
            Parkside structures work around a clear offer ladder: diagnose first, implement the right workflow system,
            then tune and extend over time.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid-2">
          {offers.map((offer) => (
            <article className="card" key={offer.name}>
              <h3>{offer.name}</h3>
              <p>{offer.summary}</p>
              <p>
                <strong>Best for:</strong> {offer.bestFor}
              </p>
              <ul className="plain-list">
                {offer.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
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
