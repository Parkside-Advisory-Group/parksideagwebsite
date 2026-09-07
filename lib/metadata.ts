import type { Metadata } from "next";

import { absoluteUrl } from "./structured-data";

const siteName = "Parkside Advisory Group";
const defaultImage = "/assets/atelier/social-cover.jpg";

interface RouteMetadataInput {
  title: string;
  description: string;
  path: string;
  imageAlt?: string;
  article?: {
    publishedTime: string;
    author: { name: string; url: string };
    section: string;
  };
}

/** Builds route-specific metadata for canonical, Open Graph, and Twitter previews. */
export function createRouteMetadata(input: RouteMetadataInput): Metadata {
  const url = absoluteUrl(input.path);
  const title =
    input.path === "/" ? input.title : `${input.title} | ${siteName}`;
  const imageAlt =
    input.imageAlt ??
    `${siteName} — Make room for what matters, with a sculptural gold ribbon on burgundy`;

  return {
    title: input.path === "/" ? { absolute: input.title } : input.title,
    description: input.description,
    ...(input.article ? { authors: [input.article.author] } : {}),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: input.description,
      url,
      siteName,
      images: [
        {
          url: absoluteUrl(defaultImage),
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      locale: "en_US",
      ...(input.article
        ? {
            type: "article" as const,
            publishedTime: input.article.publishedTime,
            authors: [input.article.author.url],
            section: input.article.section,
          }
        : { type: "website" as const }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: input.description,
      images: [{ url: absoluteUrl(defaultImage), alt: imageAlt }],
    },
  };
}
