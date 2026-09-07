import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import sitemap from "../app/sitemap";
import robots from "../app/robots";
import { fieldNotes } from "../lib/field-notes";
import { createRouteMetadata } from "../lib/metadata";
import {
  absoluteUrl,
  createFieldNoteStructuredData,
  createOfferServiceNode,
  createSitewideStructuredData,
  fieldNoteAuthor,
  type JsonObject,
  type JsonValue,
  organizationId,
} from "../lib/structured-data";
import { offers } from "../lib/content";

function nodeOfType(graph: JsonValue[], type: string): JsonObject {
  const node = graph.find((value) => typeof value === "object" && value !== null &&
    !Array.isArray(value) && value["@type"] === type);
  assert.ok(node && typeof node === "object" && !Array.isArray(node), `${type} must exist`);
  return node;
}

test("sitemap covers every public page and article without invented last-modified dates", () => {
  const appDirectory = join(process.cwd(), "app");
  const routes: string[] = [];
  function visit(directory: string, route: string) {
    const entries = readdirSync(directory, { withFileTypes: true });
    if (entries.some((entry) => entry.name === "page.tsx")) routes.push(absoluteUrl(route || "/"));
    for (const entry of entries) {
      if (entry.isDirectory() && entry.name !== "api" && !entry.name.startsWith("[")) {
        visit(join(directory, entry.name), `${route}/${entry.name}`);
      }
    }
  }
  visit(appDirectory, "");
  const entries = sitemap();
  const expected = [...routes, ...fieldNotes.map((note) => absoluteUrl(`/field-notes/${note.slug}`))].sort();
  assert.deepEqual(entries.map((entry) => entry.url).sort(), expected);
  assert.equal(new Set(entries.map((entry) => entry.url)).size, entries.length);
  assert.ok(entries.every((entry) => entry.lastModified === undefined));
  assert.equal(robots().sitemap, absoluteUrl("/sitemap.xml"));
});

test("article metadata identifies the author, publication date, canonical and accessible preview", () => {
  for (const note of fieldNotes) {
    const metadata = createRouteMetadata({
      title: note.title,
      description: note.description,
      path: `/field-notes/${note.slug}`,
      article: { publishedTime: note.date, author: fieldNoteAuthor, section: note.category },
    });
    assert.equal(metadata.alternates?.canonical, absoluteUrl(`/field-notes/${note.slug}`));
    const openGraph = metadata.openGraph;
    assert.ok(openGraph && "type" in openGraph && openGraph.type === "article");
    assert.equal(openGraph.publishedTime, note.date);
    assert.equal(openGraph.modifiedTime, undefined);
    assert.deepEqual(openGraph.authors, [fieldNoteAuthor.url]);
    assert.equal(openGraph.section, note.category);
    assert.ok(JSON.stringify(metadata.twitter).includes('"alt":'));
    assert.ok(JSON.stringify(metadata.twitter).includes("https://parksideag.com/assets/atelier/social-cover.jpg"));
  }
  assert.deepEqual(createRouteMetadata({ title: "Parkside Advisory Group", description: "Example", path: "/" }).title,
    { absolute: "Parkside Advisory Group" });
});

test("article graph joins the visible author, page and complete breadcrumb without fabricated updates", () => {
  for (const note of fieldNotes) {
    const graph = createFieldNoteStructuredData(note)["@graph"];
    const article = nodeOfType(graph, "BlogPosting");
    const person = nodeOfType(graph, "Person");
    const page = nodeOfType(graph, "WebPage");
    const breadcrumbs = nodeOfType(graph, "BreadcrumbList");
    assert.equal(article.headline, note.title);
    assert.equal(article.datePublished, note.date);
    assert.equal(article.dateModified, undefined);
    assert.deepEqual(article.author, { "@id": person["@id"] });
    assert.equal(person.name, fieldNoteAuthor.name);
    assert.equal(person.url, fieldNoteAuthor.url);
    assert.deepEqual(article.mainEntityOfPage, { "@id": page["@id"] });
    assert.deepEqual(page.breadcrumb, { "@id": breadcrumbs["@id"] });
    assert.ok(Array.isArray(breadcrumbs.itemListElement));
    assert.equal(breadcrumbs.itemListElement.length, 3);
  }
});

test("service schema uses Service and Audience types and only supported service-area facts", () => {
  const graph = createSitewideStructuredData("info@parksideag.com")["@graph"];
  const service = nodeOfType(graph, "Service");
  assert.deepEqual(service.provider, { "@id": organizationId });
  assert.equal(JSON.stringify(graph).includes("Crown Point"), false);
  for (const offer of offers) {
    const node = createOfferServiceNode(offer, "/services") as JsonObject;
    assert.deepEqual(node.audience, { "@type": "Audience", audienceType: offer.bestFor });
  }
});
