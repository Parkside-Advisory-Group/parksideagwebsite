import type { Metadata } from "next";

import { siteUrl } from "./structured-data";

const siteName = "Parkside Advisory Group";
const defaultImage = "/brand/logos/parkside-horizontal-dark.svg";

interface RouteMetadataInput {
  title: string;
  description: string;
  path: string;
  imageAlt?: string;
}

/** Builds route-specific metadata for canonical, Open Graph, and Twitter previews. */
export function createRouteMetadata(input: RouteMetadataInput): Metadata {
  const url = input.path === "/" ? siteUrl : `${siteUrl}${input.path}`;
  const title = input.path === "/" ? input.title : `${input.title} | ${siteName}`;
  const imageAlt = input.imageAlt ?? `${siteName} brand mark`;

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: input.path
    },
    openGraph: {
      title,
      description: input.description,
      url,
      siteName,
      images: [
        {
          url: defaultImage,
          alt: imageAlt
        }
      ],
      locale: "en_US",
      type: "website"
    },
    twitter: {
      card: "summary",
      title,
      description: input.description,
      images: [defaultImage]
    }
  };
}
