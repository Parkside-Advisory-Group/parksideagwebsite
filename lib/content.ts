export interface Offer {
  name: string;
  summary: string;
  bestFor: string;
  outcomes: string[];
}

export interface UseCase {
  title: string;
  category: string;
  description: string;
  signals: string[];
}

export const primaryCta = "Start the Blueprint Audit";
export const secondaryCta = "See How It Works";
export const tertiaryCta = "Explore Use Cases";

export const contactEmail = "info@parksideag.com";

export const offers: Offer[] = [
  {
    name: "AI Operations Blueprint",
    summary:
      "A focused audit of one painful workflow: how requests arrive, who owns the next step, where follow-up stalls, and what should be built first.",
    bestFor:
      "Operators who can point to repeated missed follow-up, stale estimates, slow updates, or reporting cleanup but need a clear build plan.",
    outcomes: [
      "Workflow leak map",
      "First-build recommendation",
      "Human review and failure points",
      "30/60/90-day implementation path"
    ]
  },
  {
    name: "Workflow Automation Sprint",
    summary:
      "A scoped build for one recurring process such as lead intake, estimate follow-up, customer updates, reporting, or internal handoffs.",
    bestFor:
      "Teams with a repeated workflow, a clear owner, and enough examples to define what good handling should look like.",
    outcomes: [
      "Capture and routing logic",
      "Reminders, summaries, or status views",
      "Validation and handoff rules",
      "Team rollout and tuning"
    ]
  },
  {
    name: "AI Agent Build",
    summary:
      "A practical AI assistant for bounded work: qualifying requests, summarizing context, drafting follow-up, or guiding an internal process.",
    bestFor:
      "Teams that need AI help inside an existing workflow, with clear review points and a defined path when the assistant is uncertain.",
    outcomes: [
      "Agent scope and non-goals",
      "Prompt, tool, and data design",
      "Review and escalation rules",
      "Operational test cases"
    ]
  },
  {
    name: "AI Operations Retainer",
    summary:
      "Ongoing support after the first build: tune the workflow, extend the automation, improve visibility, and keep AI usage aligned with daily operations.",
    bestFor:
      "Businesses that want an operating partner to keep improving the systems the team now depends on.",
    outcomes: [
      "Monthly workflow review",
      "System tuning and cleanup",
      "Reporting improvements",
      "Next-build discovery"
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
