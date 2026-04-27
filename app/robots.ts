import type { MetadataRoute } from "next";

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
    sitemap: "https://parksideag.com/sitemap.xml"
  };
}
