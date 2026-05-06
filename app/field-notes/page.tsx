import type { Metadata } from "next";
import Link from "next/link";
import { fieldNotes } from "../../lib/field-notes";
import { createRouteMetadata } from "../../lib/metadata";

export const metadata: Metadata = createRouteMetadata({
  title: "Field Notes",
  description:
    "Practical notes from Parkside on AI adoption, workflow systems, follow-up, handoffs, reporting, and operating leverage.",
  path: "/field-notes"
});

export default function FieldNotesPage() {
  return (
    <main>
      <section className="page-hero field-notes-hero">
        <div className="container narrow-container">
          <p className="eyebrow">Field Notes</p>
          <h1 className="page-title">Practical notes on AI, workflow, and operating leverage.</h1>
          <p className="lede">
            Parkside Field Notes turn common business friction into clear operating lessons: missed follow-up, stale
            estimates, manual reporting, handoffs, and where AI actually belongs.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container field-notes-grid">
          {fieldNotes.map((note) => (
            <article className="field-note-card reveal-on-scroll" key={note.slug}>
              <p className="eyebrow">{note.category}</p>
              <h2>{note.title}</h2>
              <p>{note.description}</p>
              <div className="field-note-meta">
                <span>{note.date}</span>
                <span>{note.readTime}</span>
              </div>
              <Link className="text-link" href={`/field-notes/${note.slug}`}>
                Read the note
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section dark-band home-final-cta">
        <div className="container narrow-container reveal-on-scroll">
          <h2 className="section-title">If one of these notes sounds familiar, start with the workflow.</h2>
          <p className="lede">Share the process that keeps slipping. Parkside will help identify the first useful build.</p>
          <div className="button-row">
            <Link className="btn" href="/intake">
              Start the Blueprint Audit
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
