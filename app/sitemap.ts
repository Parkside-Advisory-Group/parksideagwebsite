import type { MetadataRoute } from "next";
import { fieldNotes } from "../lib/field-notes";
import { absoluteUrl } from "../lib/structured-data";

const routes = ["/", "/services", "/blueprint", "/use-cases", "/field-notes", "/about", "/intake", "/growth-audit", "/opportunity-estimator", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routeEntries = routes.map((route) => ({
    url: absoluteUrl(route)
  }));

  const fieldNoteEntries = fieldNotes.map((note) => ({
    url: absoluteUrl(`/field-notes/${note.slug}`)
  }));

  // Publication dates and build timestamps are not verified last-modified dates.
  // Add lastModified only when editorial revision history is tracked explicitly.
  return [...routeEntries, ...fieldNoteEntries];
}
