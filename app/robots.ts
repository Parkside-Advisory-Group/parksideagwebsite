import type { MetadataRoute } from "next";
import { absoluteUrl } from "../lib/structured-data";

const explicitlyAllowedCrawlers = [
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "Googlebot",
  "Bingbot",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended"
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/"
      },
      ...explicitlyAllowedCrawlers.map((crawler) => ({
        userAgent: crawler,
        allow: "/"
      }))
    ],
    sitemap: absoluteUrl("/sitemap.xml")
  };
}
