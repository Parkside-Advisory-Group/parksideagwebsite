export type LeadTier = "high priority" | "good fit" | "nurture" | "not ready";

export interface IntakeSubmission {
  name: string;
  email: string;
  phone?: string;
  businessName: string;
  website?: string;
  industry: string;
  primaryPain: string;
  frequencyOfIssue: string;
  currentProcess: string;
  peopleInvolved: string;
  toolsUsed: string;
  estimatedTimeLost: string;
  estimatedBusinessImpact: string;
  desiredOutcome: string;
  urgency: string;
  permissionToFollowUp: boolean;
}

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
}

export interface IntakeRecord {
  id: string;
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
  status: "new" | "reviewed" | "contacted" | "closed";
  follow_up_notes: string;
}
