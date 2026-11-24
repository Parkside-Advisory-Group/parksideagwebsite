import type { Metadata } from "next";
import Link from "next/link";
import { fieldNotes } from "../../lib/field-notes";
import { createRouteMetadata } from "../../lib/metadata";

export const metadata: Metadata = createRouteMetadata({
  title: "Field Notes",
  description:
    "Notes on follow-up, handoffs, and where AI belongs.",
  path: "/field-notes"
});

export default function FieldNotesPage() {
  return (
    <main>
      <section className="page-hero field-notes-hero">
        <div className="container narrow-container">
          <p className="eyebrow">Field Notes</p>
          <h1 className="page-title">Notes from the work.</h1>
          <p className="lede">Follow-up, estimates, reporting, and handoffs.</p>
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
          <h2 className="section-title">Start with one workflow.</h2>
          <div className="button-row">
            <Link className="btn" href="/intake">
              Book a free Snapshot
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
