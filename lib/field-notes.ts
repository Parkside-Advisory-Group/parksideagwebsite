export interface FieldNote {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  intro: string;
  sections: Array<{
    heading: string;
    body: string[];
  }>;
  takeaway: string;
}

export const fieldNotes: FieldNote[] = [
  {
    slug: "indiana-ai-readiness-small-business-starting-point",
    title: "Indiana Is Pushing AI Readiness. Small Businesses Still Need a Starting Point.",
    description:
      "Indiana's AI push is the right signal. The practical question for small businesses is which workflow to fix first.",
    date: "2026-05-05",
    category: "AI Readiness",
    readTime: "4 min read",
    intro:
      "Indiana's push toward AI readiness is a good signal for business owners. The risk is that small businesses hear the message, buy random tools, and still have the same missed follow-up, reporting cleanup, and handoff problems six months later.",
    sections: [
      {
        heading: "The first step is not tool selection.",
        body: [
          "The first step is choosing a workflow where better capture, routing, visibility, or follow-up would matter quickly.",
          "That might be lead intake. It might be stale estimates. It might be customer updates, weekly reporting, or internal handoffs. The useful starting point is where work already stalls."
        ]
      },
      {
        heading: "Map the work before adding AI.",
        body: [
          "A small business does not need an AI strategy document before it understands how the current process moves from first contact to done.",
          "Parkside looks for the trigger, owner, deadline, review point, and failure path. Once those are visible, AI and automation can support the work instead of creating another layer of confusion."
        ]
      }
    ],
    takeaway:
      "If Indiana businesses are going to become AI-ready, the practical path is workflow clarity first, then the first useful system."
  },
  {
    slug: "most-businesses-do-not-need-ai-chatbot-first",
    title: "Most Businesses Do Not Need an AI Chatbot First.",
    description:
      "Chatbots are visible, but many businesses get faster value by fixing follow-up, routing, reporting, and ownership first.",
    date: "2026-05-06",
    category: "Workflow Strategy",
    readTime: "3 min read",
    intro:
      "A chatbot can be useful. It is just rarely the best first build for a business whose work is already scattered across inboxes, spreadsheets, calls, texts, and memory.",
    sections: [
      {
        heading: "The visible problem is not always the costly one.",
        body: [
          "A customer-facing chatbot feels like progress because it is easy to see. But the money often leaks after the first contact: no clear owner, no follow-up date, no status, no next action, no review rhythm.",
          "If the business cannot see open work, aging items, blocked handoffs, or stale opportunities, a chatbot will not fix the operating layer underneath."
        ]
      },
      {
        heading: "A better first build is narrow and owned.",
        body: [
          "Useful first systems are often boring: every new request gets captured with the right details, routed to an owner, followed up on schedule, and summarized for review.",
          "That is not flashy. It is operational leverage."
        ]
      }
    ],
    takeaway:
      "Before adding a chatbot, ask which recurring workflow needs clearer ownership, follow-up, and visibility."
  },
  {
    slug: "the-leak-is-usually-in-the-handoff",
    title: "The Leak Is Usually in the Handoff.",
    description:
      "Tasks do not always fail where the work happens. They often fail when ownership moves from one person or system to another.",
    date: "2026-05-07",
    category: "Operations",
    readTime: "3 min read",
    intro:
      "When a business is busy, the task itself is not always the issue. The leak often appears after the task: who owns the next step, when it is due, where it is visible, and what happens if it stalls.",
    sections: [
      {
        heading: "Handoffs hide in normal work.",
        body: [
          "A lead comes in. An estimate goes out. A customer asks for an update. A field note needs to become an office task. A weekly report needs clean data.",
          "Each moment feels small, but every unclear handoff adds drag. Eventually the owner is chasing status instead of running the business."
        ]
      },
      {
        heading: "The fix starts with visibility.",
        body: [
          "Parkside looks for the owner, trigger, deadline, and review point. If those are unclear, automation comes later.",
          "A better workflow makes the next action visible before it tries to make the next action automatic."
        ]
      }
    ],
    takeaway:
      "If the same work keeps needing to be chased, inspect the handoff before buying another tool."
  },
  {
    slug: "why-estimate-follow-up-goes-cold",
    title: "Why Estimate Follow-Up Goes Cold.",
    description:
      "Stale estimates are not always a sales problem. Sometimes they are an ownership and visibility problem.",
    date: "2026-05-08",
    category: "Revenue Operations",
    readTime: "4 min read",
    intro:
      "A stale estimate can look like a sales issue from the outside. Inside the business, it is often simpler: there is no owner, no follow-up date, no status, no reason code, and no review rhythm.",
    sections: [
      {
        heading: "The estimate is not done when it is sent.",
        body: [
          "For contractors and service businesses, the period after an estimate is sent is where opportunity quietly ages out.",
          "If the team cannot see which estimates are open, which are aging, which need a call, and which are blocked by missing information, follow-up depends on memory. Memory does not scale."
        ]
      },
      {
        heading: "The first system can be simple.",
        body: [
          "A practical first build can capture the estimate, assign an owner, set a follow-up date, track status, and show aging opportunities in one view.",
          "AI may help draft the follow-up or summarize context, but the operating layer matters first."
        ]
      }
    ],
    takeaway:
      "Before automating sales follow-up, make every open estimate visible, owned, and reviewable."
  },
  {
    slug: "manual-reporting-missing-operating-layer",
    title: "Manual Reporting Is Usually a Missing Operating Layer.",
    description:
      "If the same spreadsheet has to be rebuilt every week, the report is not the problem. The information flow is.",
    date: "2026-05-09",
    category: "Reporting",
    readTime: "3 min read",
    intro:
      "Weekly reporting should not require rebuilding the same spreadsheet, copying the same data, and chasing the same updates every cycle.",
    sections: [
      {
        heading: "Reports reveal workflow gaps.",
        body: [
          "A painful report usually means the business lacks a dependable path for the underlying information.",
          "The status exists somewhere: inbox, field note, spreadsheet, CRM, text thread, meeting note, or someone's memory. The problem is that it does not flow into a useful operating view."
        ]
      },
      {
        heading: "Automation helps after the source is clear.",
        body: [
          "Parkside looks at where the information starts, who updates it, where it gets reviewed, and what decision the report should support.",
          "Then the first build can reduce manual cleanup without creating a black box."
        ]
      }
    ],
    takeaway:
      "If reporting hurts every week, fix the information path before asking AI to make prettier summaries."
  },
  {
    slug: "what-is-ai-operations-blueprint-audit",
    title: "What Parkside Means by an AI Operations Blueprint Audit.",
    description:
      "The Blueprint Audit maps one workflow, identifies where work stalls, and recommends the first practical build.",
    date: "2026-05-10",
    category: "Blueprint Audit",
    readTime: "4 min read",
    intro:
      "The AI Operations Blueprint Audit is not a generic software recommendation. It is a focused review of one painful workflow and the practical operating system that should come next.",
    sections: [
      {
        heading: "The audit starts with the real path of work.",
        body: [
          "Parkside reviews how a request, lead, estimate, report, customer update, or handoff moves today.",
          "The goal is to find the moment where work stalls: missing information, unclear ownership, no follow-up rhythm, poor visibility, broken tool handoff, or no human review point."
        ]
      },
      {
        heading: "The output is a first-build recommendation.",
        body: [
          "A good first build is narrow, visible, and owned. It may be an automation, an AI assist, a checklist, a reporting view, or a better capture/routing process.",
          "The point is not to automate everything. The point is to build the first system that reduces avoidable friction without reducing trust or accountability."
        ]
      }
    ],
    takeaway:
      "The Blueprint Audit gives the business a practical next step instead of another vague AI conversation."
  }
];

export function getFieldNote(slug: string): FieldNote | undefined {
  return fieldNotes.find((note) => note.slug === slug);
}
