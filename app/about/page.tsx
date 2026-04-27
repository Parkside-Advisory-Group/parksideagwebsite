import Link from "next/link";
import { primaryCta } from "../../lib/content";

export const metadata = {
  title: "About",
  description: "About Parkside Advisory Group and its practical approach to AI-supported operations."
};

export default function AboutPage() {
  return (
    <main>
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
    </main>
  );
}
