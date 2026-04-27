import type { JsonValue } from "../lib/structured-data";

interface JsonLdProps {
  data: JsonValue;
}

/** Emits JSON-LD without adding visible page content. */
export function JsonLd({ data }: JsonLdProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
