import { IntakeSubmission } from "../schemas/intake.schema";
import { LeadScoreBreakdown, LeadTier } from "../schemas/lead.schema";

const strongFrequencyTerms = ["daily", "every day", "weekly", "multiple", "often", "constant"];
const strongImpactTerms = ["revenue", "customer", "missed", "delay", "lost", "hours", "frustration", "follow-up"];
const urgentTerms = ["now", "asap", "urgent", "this week", "30 days", "immediately", "soon"];

function hasMeaningfulText(value: string | undefined, minimumLength = 12): boolean {
  return Boolean(value && value.trim().length >= minimumLength);
}

function includesAny(value: string, terms: string[]): boolean {
  const normalizedValue = value.toLowerCase();
  return terms.some((term) => normalizedValue.includes(term));
}

/**
 * Scores an intake submission across the approved 100-point lead model.
 */
export function scoreLead(submission: IntakeSubmission): LeadScoreBreakdown {
  const clarityOfPain = hasMeaningfulText(submission.primaryPain, 40)
    ? 20
    : hasMeaningfulText(submission.primaryPain)
      ? 12
      : 0;
  const recurrenceOfWorkflow = includesAny(submission.frequencyOfIssue, strongFrequencyTerms)
    ? 20
    : hasMeaningfulText(submission.frequencyOfIssue)
      ? 12
      : 0;
  const impactText = `${submission.estimatedTimeLost} ${submission.estimatedBusinessImpact}`;
  const businessImpact = includesAny(impactText, strongImpactTerms)
    ? 20
    : hasMeaningfulText(impactText)
      ? 12
      : 0;
  const toolReadiness = hasMeaningfulText(submission.toolsUsed, 18)
    ? 15
    : hasMeaningfulText(submission.toolsUsed, 4)
      ? 8
      : 0;
  const urgency = includesAny(submission.urgency, urgentTerms)
    ? 15
    : hasMeaningfulText(submission.urgency)
      ? 8
      : 0;
  const contactCompleteness =
    submission.name && submission.email && submission.businessName
      ? submission.phone
        ? 10
        : 8
      : 0;

  return {
    clarityOfPain,
    recurrenceOfWorkflow,
    businessImpact,
    toolReadiness,
    urgency,
    contactCompleteness
  };
}

/**
 * Converts a score breakdown into a total score from 0 to 100.
 */
export function getLeadScore(breakdown: LeadScoreBreakdown): number {
  return Object.values(breakdown).reduce((total, value) => total + value, 0);
}

/**
 * Assigns a lead tier from the approved score thresholds.
 */
export function getLeadTier(score: number): LeadTier {
  if (score >= 80) return "high priority";
  if (score >= 60) return "good fit";
  if (score >= 40) return "nurture";
  return "not ready";
}
