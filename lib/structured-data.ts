import type { Offer, UseCase } from "./content";

export const siteUrl = "https://parksideag.com";
export const organizationId = `${siteUrl}/#organization`;
export const professionalServiceId = `${siteUrl}/#service`;
export const offerCatalogId = `${siteUrl}/#offers`;
export const websiteId = `${siteUrl}/#website`;

type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | JsonObject;

export interface JsonObject {
  [key: string]: JsonValue;
}

interface ReferenceNode extends JsonObject {
  "@id": string;
}

interface StructuredDataGraph extends JsonObject {
  "@context": "https://schema.org";
  "@graph": JsonValue[];
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface PageStructuredDataInput {
  pageType?: "WebPage" | "AboutPage" | "ContactPage";
  id: string;
  path: string;
  name: string;
  description: string;
  breadcrumbItems: BreadcrumbItem[];
  mainEntity?: ReferenceNode | JsonValue | JsonValue[];
  about?: ReferenceNode | JsonValue | JsonValue[];
  potentialAction?: JsonValue;
  extraNodes?: JsonValue[];
}

interface PersonStructuredDataInput {
  id: string;
  name: string;
  jobTitle: string;
  url: string;
  sameAs: string[];
  knowsAbout: string[];
}

const homeBreadcrumb: BreadcrumbItem = {
  name: "Home",
  path: "/"
};

/** Returns the absolute canonical URL for a site path. */
export function absoluteUrl(path: string): string {
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}

/** Renders the sitewide Parkside entity graph shared by every public page. */
export function createSitewideStructuredData(contactEmail: string): StructuredDataGraph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Parkside Advisory Group",
        url: siteUrl,
        email: contactEmail,
        logo: `${siteUrl}/brand/icons/favicon.svg`,
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "City", name: "Charlotte" },
          { "@type": "State", name: "North Carolina" }
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": professionalServiceId,
        name: "Parkside Advisory Group",
        url: siteUrl,
        provider: { "@id": organizationId },
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
        "@id": offerCatalogId,
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
        "@id": websiteId,
        name: "Parkside Advisory Group",
        url: siteUrl,
        publisher: { "@id": organizationId },
        inLanguage: "en-US"
      }
    ]
  };
}

/** Builds page-level JSON-LD that ties route-specific content to the Parkside organization. */
export function createPageStructuredData(input: PageStructuredDataInput): StructuredDataGraph {
  const pageNode: { [key: string]: JsonValue } = {
    "@type": input.pageType ?? "WebPage",
    "@id": input.id,
    url: absoluteUrl(input.path),
    name: input.name,
    description: input.description,
    isPartOf: { "@id": websiteId },
    about: input.about ?? { "@id": organizationId },
    publisher: { "@id": organizationId },
    inLanguage: "en-US"
  };

  if (input.mainEntity !== undefined) {
    pageNode.mainEntity = input.mainEntity;
  }

  if (input.potentialAction !== undefined) {
    pageNode.potentialAction = input.potentialAction;
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      pageNode,
      createBreadcrumbList(input.id, input.breadcrumbItems),
      ...(input.extraNodes ?? [])
    ]
  };
}

/** Creates a Service node for a visible Parkside offer. */
export function createOfferServiceNode(offer: Offer, path: string): JsonValue {
  return {
    "@type": "Service",
    "@id": createOfferServiceId(offer, path),
    name: offer.name,
    description: offer.summary,
    provider: { "@id": organizationId },
    serviceType: offer.name,
    audience: offer.bestFor,
    areaServed: "United States",
    url: absoluteUrl(path)
  };
}

/** Returns the stable schema ID for a visible Parkside offer service. */
export function createOfferServiceId(offer: Offer, path: string): string {
  return `${absoluteUrl(path)}#${slugify(offer.name)}`;
}

/** Creates the Person node used by the About page authority graph. */
export function createPersonNode(input: PersonStructuredDataInput): JsonValue {
  return {
    "@type": "Person",
    "@id": input.id,
    name: input.name,
    jobTitle: input.jobTitle,
    url: input.url,
    sameAs: input.sameAs,
    worksFor: { "@id": organizationId },
    knowsAbout: input.knowsAbout
  };
}

/** Creates an ItemList from visible use-case content. */
export function createUseCaseItemList(useCases: UseCase[]): JsonValue {
  return {
    "@type": "ItemList",
    "@id": `${siteUrl}/use-cases#use-case-list`,
    name: "Parkside Advisory Group use cases",
    itemListElement: useCases.map((useCase, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: useCase.title,
      item: {
        "@type": "Thing",
        name: useCase.title,
        description: useCase.description,
        additionalType: useCase.category
      }
    }))
  };
}

/** Creates the homepage breadcrumb trail. */
export function createHomeBreadcrumbItems(): BreadcrumbItem[] {
  return [homeBreadcrumb];
}

/** Creates a two-level breadcrumb trail rooted at the homepage. */
export function createPageBreadcrumbItems(name: string, path: string): BreadcrumbItem[] {
  return [homeBreadcrumb, { name, path }];
}

/** Creates a lightweight reference to a stable schema node. */
export function referenceNode(id: string): ReferenceNode {
  return { "@id": id };
}

function createBreadcrumbList(pageId: string, items: BreadcrumbItem[]): JsonValue {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageId}-breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
