import Image from "next/image";
import Link from "next/link";

/**
 * Portrait slot for Anthony Mora.
 * Replace public/images/anthony-mora.jpg with his photograph when it arrives.
 * Keep this alt text. Do not use a generated image of him.
 */
export const founderPortrait = {
  src: "/images/anthony-mora.jpg",
  alt: "Anthony Mora, founder of Parkside Advisory Group",
  width: 800,
  height: 1000
};

export function FounderNote() {
  return (
    <section className="founder-note atelier-pad" aria-labelledby="founder-note-title">
      <div className="founder-portrait">
        <Image
          src={founderPortrait.src}
          alt={founderPortrait.alt}
          width={founderPortrait.width}
          height={founderPortrait.height}
          sizes="(max-width: 760px) 72vw, 280px"
        />
      </div>
      <div className="founder-copy">
        <span className="atelier-label">Founder</span>
        <h2 id="founder-note-title">A note from Anthony Mora.</h2>
        <p>
          I’m Anthony Mora. When an estimate goes quiet, the work didn’t get harder. It lost its owner.
          Parkside puts a name and a next action on that job, then builds a system your people can run.
        </p>
        <Link className="atelier-text-link" href="/about">
          About Anthony Mora <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
