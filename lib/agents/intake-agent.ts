import { IntakeSubmission } from "../schemas/intake.schema";
import { IntakeRecord, LeadSummary } from "../schemas/lead.schema";
import { getLeadScore, getLeadTier, scoreLead } from "./lead-scorer";

const intakePromptPath = "lib/prompts/intake-system.md";

export interface IntakeGuidanceResult {
  summary: LeadSummary;
  internalSummary: string;
  promptUsed: string;
  aiEnabled: boolean;
  guardrails: string[];
}

function categorizeWorkflow(submission: IntakeSubmission): string {
  const text = `${submission.primaryPain} ${submission.currentProcess} ${submission.toolsUsed}`.toLowerCase();

  if (text.includes("lead") || text.includes("intake") || text.includes("inquiry")) return "Client intake";
  if (text.includes("follow") || text.includes("estimate") || text.includes("callback")) return "Follow-up discipline";
  if (text.includes("report") || text.includes("dashboard") || text.includes("visibility")) return "Reporting visibility";
  if (text.includes("handoff") || text.includes("approval") || text.includes("routing")) return "Internal handoffs";
  if (text.includes("email") || text.includes("document") || text.includes("summary")) {
    return "Document and communication workflows";
  }

  return "Workflow triage";
}

/**
 * Builds guarded intake guidance from submitted form data.
 */
export async function generateIntakeGuidance(submission: IntakeSubmission): Promise<IntakeGuidanceResult> {
  const summary = buildLeadSummary(submission);

  return {
    summary,
    internalSummary: formatInternalSummary(summary),
    promptUsed: intakePromptPath,
    aiEnabled: Boolean(process.env.OPENAI_API_KEY),
    guardrails: [
      "Do not quote final pricing.",
      "Do not promise exact savings.",
      "Do not guarantee technical feasibility before discovery.",
      "Do not request passwords, API keys, private credentials, or login access."
    ]
  };
}

/**
 * Creates the internal lead summary used by intake records and notifications.
 */
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

/**
 * Formats a lead summary for internal review and notification emails.
 */
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

/**
 * Creates the normalized intake record returned by the intake API.
 */
export async function createIntakeRecord(submission: IntakeSubmission): Promise<IntakeRecord> {
  const guidance = await generateIntakeGuidance(submission);

  return {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    name: submission.name,
    email: submission.email,
    phone: submission.phone,
    business_name: submission.businessName,
    website: submission.website,
    industry: submission.industry,
    primary_pain: submission.primaryPain,
    workflow_category: guidance.summary.workflowCategory,
    current_process: submission.currentProcess,
    tools_used: submission.toolsUsed,
    estimated_time_lost: submission.estimatedTimeLost,
    estimated_business_impact: submission.estimatedBusinessImpact,
    desired_outcome: submission.desiredOutcome,
    urgency: submission.urgency,
    lead_score: guidance.summary.leadScore,
    lead_tier: guidance.summary.leadTier,
    internal_summary: guidance.internalSummary,
    status: "new",
    follow_up_notes: guidance.summary.recommendedFollowUp
  };
}
