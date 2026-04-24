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

export const primaryCta = "Start an AI Operations Blueprint";
export const secondaryCta = "Explore Use Cases";

export const offers: Offer[] = [
  {
    name: "AI Operations Blueprint",
    summary:
      "A focused diagnostic that maps recurring workflow pain, identifies practical automation opportunities, and produces an implementation roadmap.",
    bestFor:
      "Operators who know manual work is slowing the business down but need a clear, scoped path before building.",
    outcomes: [
      "Workflow map and bottleneck summary",
      "Prioritized automation opportunities",
      "Tool and data readiness review",
      "Recommended implementation path"
    ]
  },
  {
    name: "Workflow Automation Sprint",
    summary:
      "A scoped implementation sprint for one recurring process such as intake, follow-up, reporting, handoffs, or internal routing.",
    bestFor:
      "Businesses with a defined workflow that repeats often and has clear ownership.",
    outcomes: [
      "Automation design and configuration",
      "Validation rules and handoff logic",
      "Team enablement documentation",
      "Launch support and tuning"
    ]
  },
  {
    name: "AI Agent Build",
    summary:
      "A practical AI assistant or agent that helps qualify requests, summarize work, draft follow-up, or guide internal processes.",
    bestFor:
      "Teams that need AI-supported execution inside an existing operating workflow.",
    outcomes: [
      "Agent scope and guardrails",
      "Prompt and tool design",
      "Human review points",
      "Operational testing plan"
    ]
  },
  {
    name: "AI Operations Retainer",
    summary:
      "Ongoing support to tune systems, extend automations, improve visibility, and keep AI-supported workflows aligned with operations.",
    bestFor:
      "Businesses that want a long-term operating partner for practical AI systems.",
    outcomes: [
      "Monthly improvement roadmap",
      "System monitoring and tuning",
      "Reporting and visibility improvements",
      "New workflow discovery"
    ]
  }
];

export const useCases: UseCase[] = [
  {
    title: "Client Intake",
    category: "Front office",
    description:
      "Capture consistent details, qualify requests, route next steps, and reduce back-and-forth during first contact.",
    signals: ["Incomplete lead details", "Slow response", "Manual routing"]
  },
  {
    title: "Follow-Up Discipline",
    category: "Revenue operations",
    description:
      "Keep prospects, customers, and internal owners moving with structured follow-up and clear accountability.",
    signals: ["Missed callbacks", "Unworked estimates", "No clear owner"]
  },
  {
    title: "Reporting Visibility",
    category: "Operations",
    description:
      "Create a reliable view of workflow status, aging items, handoffs, and recurring bottlenecks.",
    signals: ["Spreadsheet sprawl", "Status meetings", "Hidden delays"]
  },
  {
    title: "Internal Handoffs",
    category: "Delivery",
    description:
      "Standardize what moves from sales to operations, from intake to delivery, or from field work to admin follow-up.",
    signals: ["Missing context", "Repeated questions", "Delayed work starts"]
  },
  {
    title: "Document and Email Drafting",
    category: "Administrative work",
    description:
      "Use AI-supported drafting for summaries, next-step emails, internal notes, and recurring client updates.",
    signals: ["Manual summaries", "Delayed updates", "Inconsistent tone"]
  },
  {
    title: "Workflow Triage",
    category: "Management",
    description:
      "Sort requests by urgency, readiness, owner, and next action so teams can focus on the right work first.",
    signals: ["Queue confusion", "Urgent items buried", "Poor prioritization"]
  }
];
