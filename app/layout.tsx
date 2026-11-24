import type { Metadata } from "next";
import { Manrope, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { JsonLd } from "../components/JsonLd";
import { SiteAnalytics } from "../components/SiteAnalytics";
import { contactEmail } from "../lib/content";
import { createSitewideStructuredData } from "../lib/structured-data";

export const metadata: Metadata = {
  title: {
    default: "AI & Workflow Automation for Small Businesses | Parkside",
    template: "%s | Parkside Advisory Group",
  },
  description:
    "Estimates shouldn't go quiet. Book a free Snapshot.",
  metadataBase: new URL("https://parksideag.com"),
  alternates: {
    canonical: "https://parksideag.com/",
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
    "AI operations blueprint",
  ],
  openGraph: {
    title: "AI & Workflow Automation for Small Businesses | Parkside",
    description:
      "Estimates shouldn't go quiet. Book a free Snapshot.",
    url: "https://parksideag.com",
    siteName: "Parkside Advisory Group",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/atelier/social-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Make room for what matters — a sculptural gold ribbon on Parkside burgundy",
      },
    ],
  },
  icons: {
    icon: "/brand/icons/favicon.svg",
    apple: "/brand/icons/apple-touch-icon.png",
  },
};

const structuredData = createSitewideStructuredData(contactEmail);

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "400",
  variable: "--font-newsreader",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-inter-tight",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  preload: false,
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <JsonLd data={structuredData} />
        <Header />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <Footer />
        <SiteAnalytics />
      </body>
    </html>
  );
}
