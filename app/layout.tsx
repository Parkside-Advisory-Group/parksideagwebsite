import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { JsonLd } from "../components/JsonLd";
import { contactEmail } from "../lib/content";
import { createSitewideStructuredData } from "../lib/structured-data";

export const metadata: Metadata = {
  title: {
    default: "Parkside Advisory Group | AI Automation for Business Workflows",
    template: "%s | Parkside Advisory Group"
  },
  description:
    "Parkside Advisory Group helps businesses use practical AI and automation to reduce manual work, improve follow-up, and see what is happening across recurring workflows.",
  metadataBase: new URL("https://parksideag.com"),
  alternates: {
    canonical: "https://parksideag.com/"
  },
  keywords: [
    "AI automation consulting",
    "workflow automation",
    "AI business systems",
    "client intake automation",
    "follow-up automation",
    "business process improvement",
    "Charlotte AI consultant",
    "AI operations blueprint"
  ],
  openGraph: {
    title: "Parkside Advisory Group | AI Automation for Business Workflows",
    description:
      "Practical AI and automation for businesses that need faster follow-up, fewer manual tasks, and clearer workflow visibility.",
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
      </body>
    </html>
  );
}
