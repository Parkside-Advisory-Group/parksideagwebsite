import type { MetadataRoute } from "next";
import { fieldNotes } from "../lib/field-notes";

const routes = ["", "/services", "/blueprint", "/use-cases", "/field-notes", "/about", "/intake", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routeEntries = routes.map((route) => ({
    url: `https://parksideag.com${route}`,
    lastModified: new Date("2026-05-05")
  }));

  const fieldNoteEntries = fieldNotes.map((note) => ({
    url: `https://parksideag.com/field-notes/${note.slug}`,
    lastModified: new Date(note.date)
  }));

  return [...routeEntries, ...fieldNoteEntries];
}
