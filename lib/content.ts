export interface Offer {
  name: string;
  summary: string;
  bestFor: string;
  outcomes: string[];
  feeLabel: string;
  href: string;
}

export interface UseCase {
  title: string;
  category: string;
  description: string;
  signals: string[];
}

export const primaryCta = "Book a free Snapshot";
export const secondaryCta = "See the work";
export const tertiaryCta = "See use cases";

export const contactEmail = "info@parksideag.com";

/** Homepage hero. Edit this string to change the first line. */
export const heroHeadline = "Estimates shouldn't go quiet.";

export const SECURITY_CHECK_FEE_USD = 500;
export const BLUEPRINT_FROM_USD = 1500;

export const securityCheckDisclaimer =
  "The AI-Ready Security Check is a practical operations and risk review. It is not a penetration test, audit, or certification. It is not legal, compliance, or insurance advice, and it does not guarantee against a breach. The client's IT provider or a qualified security firm should carry out any IT changes.";

export const securityCheckAudience = "Owner-led firms that want a clear view of risk.";

export const securityCheckDeliverables = [
  "Systems and vendors",
  "Who has access",
  "Where AI is used",
  "Rules for automation",
  "What to fix first"
];

export const offers: Offer[] = [
  {
    name: "Snapshot",
    feeLabel: "Free",
    href: "/intake",
    summary: "One workflow. Where it stalls. What to do first.",
    bestFor: "A first look before you spend.",
    outcomes: ["Where work stalls", "What to do first", "What to leave alone"]
  },
  {
    name: "Security Check",
    feeLabel: "$500",
    href: "/security-check",
    summary: "A clear view of systems, access, and AI risk.",
    bestFor: securityCheckAudience,
    outcomes: securityCheckDeliverables
  },
  {
    name: "Blueprint",
    feeLabel: "From $1,500",
    href: "/blueprint",
    summary: "A plan for one workflow, with an owner on every step.",
    bestFor: "A team ready to decide what to build.",
    outcomes: ["Owners and next steps", "What to build first", "Where a person decides"]
  },
  {
    name: "Build",
    feeLabel: "Quoted after the Blueprint",
    href: "/services",
    summary: "We build the system and stay to keep it running.",
    bestFor: "A team with a Blueprint in hand.",
    outcomes: ["The system, in use", "A person in control", "Support after launch"]
  }
];

export const useCases: UseCase[] = [
  {
    title: "Client intake",
    category: "Front office",
    description: "Every request gets an owner.",
    signals: ["Missing details", "Slow replies", "Unclear routing"]
  },
  {
    title: "Follow-up",
    category: "Revenue",
    description: "Open estimates stay visible.",
    signals: ["Missed callbacks", "Quiet estimates", "No owner"]
  },
  {
    title: "Reporting",
    category: "Operations",
    description: "One view of open work.",
    signals: ["Rebuilt reports", "Status meetings", "Hidden delays"]
  },
  {
    title: "Handoffs",
    category: "Delivery",
    description: "The next person has the context.",
    signals: ["Missing context", "Repeated questions", "Late starts"]
  },
  {
    title: "Drafting",
    category: "Admin",
    description: "A draft. A person sends it.",
    signals: ["Manual summaries", "Late updates", "Uneven tone"]
  },
  {
    title: "Triage",
    category: "Management",
    description: "The urgent work stays on top.",
    signals: ["A crowded queue", "Buried urgency", "Unclear priority"]
  }
];
