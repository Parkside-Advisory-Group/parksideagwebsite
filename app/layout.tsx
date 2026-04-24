import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const metadata: Metadata = {
  title: {
    default: "Parkside Advisory Group | AI Automation for Business Workflows",
    template: "%s | Parkside Advisory Group"
  },
  description:
    "Parkside Advisory Group helps small and mid-sized businesses use practical AI and automation to reduce manual work, improve follow-up, and see what is happening across recurring workflows.",
  metadataBase: new URL("https://parksideag.com"),
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
      "Practical AI and automation for small and mid-sized businesses that need faster follow-up, fewer manual tasks, and clearer workflow visibility.",
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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://parksideag.com/#organization",
      name: "Parkside Advisory Group",
      url: "https://parksideag.com",
      logo: "https://parksideag.com/brand/icons/favicon.svg",
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "City", name: "Charlotte" },
        { "@type": "State", name: "North Carolina" }
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://parksideag.com/#service",
      name: "Parkside Advisory Group",
      url: "https://parksideag.com",
      provider: { "@id": "https://parksideag.com/#organization" },
      serviceType: [
        "AI automation consulting",
        "Workflow automation",
        "Client intake automation",
        "Follow-up automation",
        "AI agent implementation",
        "Business process improvement"
      ],
      areaServed: "United States"
    },
    {
      "@type": "OfferCatalog",
      "@id": "https://parksideag.com/#offers",
      name: "Parkside AI Operations Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Operations Blueprint" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Workflow Automation Sprint" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Agent Build" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Operations Retainer" } }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://parksideag.com/#website",
      name: "Parkside Advisory Group",
      url: "https://parksideag.com",
      publisher: { "@id": "https://parksideag.com/#organization" },
      inLanguage: "en-US"
    }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
