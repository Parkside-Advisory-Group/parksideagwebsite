export type LeadTier = "high priority" | "good fit" | "nurture" | "not ready";

export type LeadStatus = "new" | "reviewed" | "contacted" | "closed";

export interface LeadScoreBreakdown {
  clarityOfPain: number;
  recurrenceOfWorkflow: number;
  businessImpact: number;
  toolReadiness: number;
  urgency: number;
  contactCompleteness: number;
}

export interface LeadSummary {
  prospect: string;
  business: string;
  contact: string;
  primaryPain: string;
  workflowCategory: string;
  currentProcess: string;
  toolsMentioned: string;
  estimatedImpact: string;
  urgency: string;
  leadScore: number;
  leadTier: LeadTier;
  recommendedOffer: string;
  recommendedFollowUp: string;
  risksAndNotes: string[];
  source?: string;
  teamSize?: string;
  growthContext?: string;
}

export interface IntakeRecord {
  id: string;
  /** Parkside correlation ID used across intake, review, and follow-up. */
  correlation_id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  business_name: string;
  website?: string;
  industry: string;
  primary_pain: string;
  workflow_category: string;
  current_process: string;
  tools_used: string;
  estimated_time_lost: string;
  estimated_business_impact: string;
  desired_outcome: string;
  urgency: string;
  lead_score: number;
  lead_tier: LeadTier;
  internal_summary: string;
  status: LeadStatus;
  follow_up_notes: string;
  /** Entry point that generated this record. e.g. "intake" or "opportunity-estimator". */
  source?: string;
  /** Team size, captured by the Snapshot form. */
  team_size?: string;
  /** What prompted the prospect to explore AI or systems now — Snapshot context field. */
  growth_context?: string;
}
