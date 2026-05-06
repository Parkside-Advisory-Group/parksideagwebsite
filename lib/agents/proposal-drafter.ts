import { LeadSummary } from "../schemas/lead.schema";

export interface ProposalOutline {
  audience: "internal";
  promptUsed: string;
  sections: string[];
  guardrails: string[];
}

/**
 * Drafts an internal-only proposal outline after discovery context exists.
 */
export function draftInternalProposalOutline(summary: LeadSummary): ProposalOutline {
  return {
    audience: "internal",
    promptUsed: "lib/prompts/proposal-draft.md",
    sections: [
      `Client workflow context: ${summary.workflowCategory}`,
      `Operational pain: ${summary.primaryPain}`,
      `Current process: ${summary.currentProcess}`,
      `Recommended offer: ${summary.recommendedOffer}`,
      `Lead tier: ${summary.leadTier}`,
      `Next step: ${summary.recommendedFollowUp}`,
      "Assumptions: confirm workflow owners, systems involved, data access, and launch constraints during discovery.",
      "Dependencies: approved scope, tool access through client-owned accounts, and human review checkpoints.",
      "Implementation risks: unclear ownership, incomplete process details, low recurrence, or unavailable system access."
    ],
    guardrails: [
      "Internal use only.",
      "Do not send externally.",
      "Do not quote final pricing.",
      "Do not promise exact savings or guaranteed outcomes."
    ]
  };
}
