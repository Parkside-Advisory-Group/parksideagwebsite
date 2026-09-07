import type { Metadata } from "next";

import { siteUrl } from "./structured-data";

const siteName = "Parkside Advisory Group";
const defaultImage = "/assets/atelier/social-cover.jpg";

interface RouteMetadataInput {
  title: string;
  description: string;
  path: string;
  imageAlt?: string;
}

/** Builds route-specific metadata for canonical, Open Graph, and Twitter previews. */
export function createRouteMetadata(input: RouteMetadataInput): Metadata {
  const url = input.path === "/" ? siteUrl : `${siteUrl}${input.path}`;
  const title =
    input.path === "/" ? input.title : `${input.title} | ${siteName}`;
  const imageAlt =
    input.imageAlt ??
    `${siteName} — Make room for what matters, with a sculptural gold ribbon on burgundy`;

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: input.path,
    },
    openGraph: {
      title,
      description: input.description,
      url,
      siteName,
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: input.description,
      images: [defaultImage],
    },
  };
}
