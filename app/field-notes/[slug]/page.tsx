import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fieldNotes, getFieldNote } from "../../../lib/field-notes";
import { createRouteMetadata } from "../../../lib/metadata";

interface FieldNotePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return fieldNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: FieldNotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getFieldNote(slug);

  if (!note) {
    return createRouteMetadata({
      title: "Field Note Not Found",
      description: "The requested Parkside field note could not be found.",
      path: "/field-notes"
    });
  }

  return createRouteMetadata({
    title: note.title,
    description: note.description,
    path: `/field-notes/${note.slug}`
  });
}

export default async function FieldNotePage({ params }: FieldNotePageProps) {
  const { slug } = await params;
  const note = getFieldNote(slug);

  if (!note) {
    notFound();
  }

  return (
    <main>
      <article>
        <section className="page-hero field-note-article-hero">
          <div className="container narrow-container">
            <p className="eyebrow">{note.category}</p>
            <h1 className="page-title">{note.title}</h1>
            <p className="lede">{note.intro}</p>
            <div className="field-note-meta article-meta">
              <span>{note.date}</span>
              <span>{note.readTime}</span>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container article-body">
            {note.sections.map((section) => (
              <section className="article-section" key={section.heading}>
                <h2>{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}

            <aside className="article-takeaway">
              <p className="eyebrow">Practical takeaway</p>
              <p>{note.takeaway}</p>
            </aside>

            <div className="article-cta">
              <h2>If this is showing up in your business, map the workflow first.</h2>
              <p>
                The Blueprint Audit starts with one recurring workflow and identifies the first practical system worth
                building.
              </p>
              <div className="button-row">
                <Link className="btn" href="/intake">
                  Start the Blueprint Audit
                </Link>
                <Link className="btn ghost" href="/field-notes">
                  Back to Field Notes
                </Link>
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
