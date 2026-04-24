import Link from "next/link";
import { primaryCta } from "../../lib/content";

export const metadata = {
  title: "About",
  description: "About Parkside Advisory Group and its practical AI operations approach."
};

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container split">
          <div>
            <p className="eyebrow">About Parkside</p>
            <h1 className="page-title">Practical AI today. Smarter operations over time.</h1>
          </div>
          <div>
            <p className="lede">
              Parkside Advisory Group helps businesses modernize recurring workflows with practical AI systems,
              automation, and operational visibility. The work starts with a clear view of the process, then moves into
              systems that support how the business actually operates.
            </p>
            <p className="lede">
              Parkside validates AI opportunities by mapping the workflow first, reviewing tool and data readiness,
              identifying where human review is required, and defining what a useful operating result should look like.
              The goal is not novelty; it is a working system the business can trust and maintain.
            </p>
            <div className="button-row">
              <Link className="btn ghost" href="/intake">
                {primaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
