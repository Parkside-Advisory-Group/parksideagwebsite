import { IntakeSubmission, LeadSummary } from "./types";
import { getLeadScore, getLeadTier, scoreLead } from "./scoring";

function categorizeWorkflow(submission: IntakeSubmission): string {
  const text = `${submission.primaryPain} ${submission.currentProcess} ${submission.toolsUsed}`.toLowerCase();

  if (text.includes("lead") || text.includes("intake") || text.includes("inquiry")) return "Client intake";
  if (text.includes("follow") || text.includes("estimate") || text.includes("callback")) return "Follow-up discipline";
  if (text.includes("report") || text.includes("dashboard") || text.includes("visibility")) return "Reporting visibility";
  if (text.includes("handoff") || text.includes("approval") || text.includes("routing")) return "Internal handoffs";
  if (text.includes("email") || text.includes("document") || text.includes("summary")) return "Document and communication workflows";

  return "Workflow triage";
}

export function buildLeadSummary(submission: IntakeSubmission): LeadSummary {
  const breakdown = scoreLead(submission);
  const leadScore = getLeadScore(breakdown);
  const leadTier = getLeadTier(leadScore);
  const workflowCategory = categorizeWorkflow(submission);
  const recommendedFollowUp =
    leadTier === "high priority" || leadTier === "good fit"
      ? "Invite the prospect to an AI Operations Blueprint discussion and review workflow scope, tool access, and implementation readiness."
      : "Send a practical follow-up asking for more detail on recurrence, business impact, and current tools before scheduling.";

  return {
    prospect: submission.name,
    business: `${submission.businessName} (${submission.industry})`,
    contact: [submission.email, submission.phone].filter(Boolean).join(" | "),
    primaryPain: submission.primaryPain,
    workflowCategory,
    currentProcess: submission.currentProcess,
    toolsMentioned: submission.toolsUsed || "No tools provided.",
    estimatedImpact: [submission.estimatedTimeLost, submission.estimatedBusinessImpact].filter(Boolean).join(" | "),
    urgency: submission.urgency,
    leadScore,
    leadTier,
    recommendedOffer: "AI Operations Blueprint",
    recommendedFollowUp,
    risksAndNotes: [
      submission.permissionToFollowUp ? "Permission to follow up granted." : "No follow-up permission granted.",
      "Do not quote final pricing until discovery confirms scope.",
      "Do not request passwords or private credentials during intake."
    ]
  };
}

export function formatInternalSummary(summary: LeadSummary): string {
  return [
    `Prospect: ${summary.prospect}`,
    `Business: ${summary.business}`,
    `Contact: ${summary.contact}`,
    `Primary pain: ${summary.primaryPain}`,
    `Workflow category: ${summary.workflowCategory}`,
    `Current process: ${summary.currentProcess}`,
    `Tools mentioned: ${summary.toolsMentioned}`,
    `Estimated impact: ${summary.estimatedImpact}`,
    `Urgency: ${summary.urgency}`,
    `Lead score: ${summary.leadScore}`,
    `Lead tier: ${summary.leadTier}`,
    `Recommended offer: ${summary.recommendedOffer}`,
    `Recommended follow-up: ${summary.recommendedFollowUp}`,
    `Risks/notes: ${summary.risksAndNotes.join(" ")}`
  ].join("\n");
}
