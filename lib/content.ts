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

export const primaryCta = "Get the Free Snapshot";
export const secondaryCta = "See How It Works";
export const tertiaryCta = "Explore Use Cases";

export const contactEmail = "info@parksideag.com";

/** Homepage hero. Edit this string to change the first line. */
export const heroHeadline = "Estimates shouldn't go quiet.";

export const SECURITY_CHECK_FEE_USD = 500;
export const BLUEPRINT_FOUNDER_COHORT_TARGET_USD = 1500;
export const SECURITY_CHECK_CREDIT_WINDOW_DAYS = 30;

export const securityCheckDisclaimer =
  "The AI-Ready Security Check is a practical operations and risk review. It is not a penetration test, audit, or certification. It is not legal, compliance, or insurance advice, and it does not guarantee against a breach. The client's IT provider or a qualified security firm should carry out any IT changes.";

export const securityCheckAudience =
  "Owner-led Northwest Indiana businesses with 5–50 people in HVAC, refrigeration, electrical, plumbing, roofing, and property management.";

export const securityCheckDuration = "About 2–3 weeks.";

export const securityCheckDeliverables = [
  "System and vendor inventory",
  "Access map covering people, vendors, AI tools, and automations",
  "Shadow-AI snapshot and a one-page AI use policy",
  "Agent and automation guardrails",
  "Hardening checklist mapped to the NIST CSF 2.0 Small Business Quick-Start and CIS Controls IG1",
  "Cyber-insurance application prep — the client answers; Parkside never attests",
  "Top 5 fixes, ranked"
];

export const offers: Offer[] = [
  {
    name: "Free AI Workflow Savings Snapshot",
    feeLabel: "Free",
    href: "/intake",
    summary:
      "A lightweight report that reviews one painful workflow, names likely leaks, and shows where practical AI or automation could help first.",
    bestFor:
      "Operators who want a clear first look at missed follow-up, stale estimates, slow updates, manual reporting, or repeated admin work.",
    outcomes: [
      "Workflow leak summary",
      "3 practical AI or automation opportunities",
      "First-system recommendation",
      "Readiness notes and follow-up questions"
    ]
  },
  {
    name: "AI-Ready Security Check",
    feeLabel: "$500 fixed fee",
    href: "/security-check",
    summary:
      "A practical operations and risk review for the systems, vendors, access, and AI tools the business already uses. About 2–3 weeks.",
    bestFor: securityCheckAudience,
    outcomes: securityCheckDeliverables
  },
  {
    name: "AI Operations Blueprint",
    feeLabel: "Founder-cohort target $1,500",
    href: "/blueprint",
    summary:
      "A 30-day AI Operator Pilot for one workflow: who owns each step, what the next action is, and the first system worth building. The $500 AI-Ready Security Check is credited if the Blueprint is signed within 30 days.",
    bestFor:
      "Operators who want a paid working plan for one important workflow, with a founder-cohort target of $1,500.",
    outcomes: [
      "Workflow leak map with owners and handoffs",
      "First-build recommendation",
      "Human review and failure-path notes",
      "A 30-day operator pilot plan",
      "Owner and next-action model"
    ]
  },
  {
    name: "Build",
    feeLabel: "Quoted after the Blueprint",
    href: "/services",
    summary:
      "Implementation and an ongoing operating partnership, quoted after the Blueprint. The system is built so the people who own the work can run it.",
    bestFor:
      "Teams with a Blueprint and a workflow ready to put into practice, including ongoing operating support after the first build.",
    outcomes: [
      "The first useful system, built and tested with real examples",
      "Review rules and a failure path a person can follow",
      "A walkthrough your people can run on a Tuesday",
      "Ongoing operating support after the first build"
    ]
  }
];

export const useCases: UseCase[] = [
  {
    title: "Client Intake",
    category: "Front office",
    description:
      "Turn calls, forms, and emails into a consistent request record with an owner, priority, and next action.",
    signals: ["Missing project details", "Slow first response", "Manual routing"]
  },
  {
    title: "Follow-Up Discipline",
    category: "Revenue operations",
    description:
      "Keep prospects, estimates, and customer promises from sitting until someone remembers to check.",
    signals: ["Missed callbacks", "Stale estimates", "No clear owner"]
  },
  {
    title: "Reporting Visibility",
    category: "Operations",
    description:
      "Create a reliable view of open work, aging items, blocked handoffs, and recurring cleanup.",
    signals: ["Spreadsheet sprawl", "Status meetings", "Hidden delays"]
  },
  {
    title: "Internal Handoffs",
    category: "Delivery",
    description:
      "Define exactly what moves from sales to operations, intake to delivery, or field work to admin follow-up.",
    signals: ["Missing context", "Repeated questions", "Delayed work starts"]
  },
  {
    title: "Document and Email Drafting",
    category: "Administrative work",
    description:
      "Use AI to draft routine summaries, next-step emails, internal notes, and customer updates for human review.",
    signals: ["Manual summaries", "Delayed updates", "Inconsistent tone"]
  },
  {
    title: "Workflow Triage",
    category: "Management",
    description:
      "Sort requests by urgency, readiness, owner, and next action so the team works from the same queue.",
    signals: ["Queue confusion", "Urgent items buried", "Poor prioritization"]
  }
];
