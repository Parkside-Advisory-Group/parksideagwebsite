import type { MetadataRoute } from "next";

const routes = ["", "/services", "/blueprint", "/use-cases", "/about", "/intake", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://parksideag.com${route}`,
    lastModified: new Date("2026-04-24")
  }));
}
