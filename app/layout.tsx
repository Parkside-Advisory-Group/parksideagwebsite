import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { JsonLd } from "../components/JsonLd";
import { SiteAnalytics } from "../components/SiteAnalytics";
import { contactEmail } from "../lib/content";
import { createSitewideStructuredData } from "../lib/structured-data";

export const metadata: Metadata = {
  title: {
    default: "Parkside Advisory Group | Free AI Workflow Savings Snapshot",
    template: "%s | Parkside Advisory Group"
  },
  description:
    "Parkside helps small and mid-sized businesses use practical AI and workflow automation to reduce manual work, improve follow-up, and see what is happening across recurring workflows.",
  metadataBase: new URL("https://parksideag.com"),
  alternates: {
    canonical: "https://parksideag.com/"
  },
  keywords: [
    "AI automation consulting",
    "free AI workflow analysis",
    "AI workflow savings snapshot",
    "small business AI automation",
    "workflow automation",
    "AI business systems",
    "client intake automation",
    "follow-up automation",
    "business process improvement",
    "Indiana AI consultant",
    "Northwest Indiana workflow automation",
    "Greater Chicagoland AI consultant",
    "AI operations blueprint"
  ],
  openGraph: {
    title: "Parkside Advisory Group | Free AI Workflow Savings Snapshot",
    description:
      "Get a free AI Workflow Savings Snapshot for one messy business process, then decide if a paid Blueprint or implementation sprint is worth it.",
    url: "https://parksideag.com",
    siteName: "Parkside Advisory Group",
    locale: "en_US",
    type: "website"
  },
  icons: {
    icon: "/brand/icons/favicon.svg",
    apple: "/brand/icons/apple-touch-icon.png"
  }
};

const structuredData = createSitewideStructuredData(contactEmail);

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={structuredData} />
        <Header />
        {children}
        <Footer />
        <SiteAnalytics />
      </body>
    </html>
  );
}
