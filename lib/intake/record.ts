import { IntakeRecord, IntakeSubmission } from "./types";
import { buildLeadSummary, formatInternalSummary } from "./summary";

export function createIntakeRecord(submission: IntakeSubmission): IntakeRecord {
  const summary = buildLeadSummary(submission);

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
    workflow_category: summary.workflowCategory,
    current_process: submission.currentProcess,
    tools_used: submission.toolsUsed,
    estimated_time_lost: submission.estimatedTimeLost,
    estimated_business_impact: submission.estimatedBusinessImpact,
    desired_outcome: submission.desiredOutcome,
    urgency: submission.urgency,
    lead_score: summary.leadScore,
    lead_tier: summary.leadTier,
    internal_summary: formatInternalSummary(summary),
    status: "new",
    follow_up_notes: summary.recommendedFollowUp
  };
}
