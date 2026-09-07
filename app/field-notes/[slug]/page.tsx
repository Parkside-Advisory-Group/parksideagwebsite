import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "../../../components/JsonLd";
import { fieldNotes, getFieldNote } from "../../../lib/field-notes";
import { createRouteMetadata } from "../../../lib/metadata";
import { createFieldNoteStructuredData, fieldNoteAuthor } from "../../../lib/structured-data";

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
    notFound();
  }

  return createRouteMetadata({
    title: note.title,
    description: note.description,
    path: `/field-notes/${note.slug}`,
    article: {
      publishedTime: note.date,
      author: { name: fieldNoteAuthor.name, url: fieldNoteAuthor.url },
      section: note.category,
    },
  });
}

export default async function FieldNotePage({ params }: FieldNotePageProps) {
  const { slug } = await params;
  const note = getFieldNote(slug);

  if (!note) {
    notFound();
  }

  const articleStructuredData = createFieldNoteStructuredData(note);

  return (
    <main>
      <JsonLd data={articleStructuredData} />
      <article>
        <section className="page-hero field-note-article-hero">
          <div className="container narrow-container">
            <p className="eyebrow">{note.category}</p>
            <h1 className="page-title">{note.title}</h1>
            <p className="lede">{note.intro}</p>
            <div className="field-note-meta article-meta">
              <span>By <Link href="/about">{fieldNoteAuthor.name}</Link></span>
              <time dateTime={note.date}>{note.date}</time>
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
                The free Snapshot starts with one recurring workflow and identifies likely leaks, practical AI opportunities,
                and whether a deeper Blueprint is worth mapping.
              </p>
              <div className="button-row">
                <Link className="btn" href="/intake">
                  Get the Free Snapshot
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
