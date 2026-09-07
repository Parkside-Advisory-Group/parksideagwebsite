"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function SiteAnalytics() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === undefined) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
