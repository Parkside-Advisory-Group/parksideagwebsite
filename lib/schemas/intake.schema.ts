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
  /** Identifies the intake entry point. Use "growth-audit" for the Growth Audit form. */
  source?: string;
  /** Team size — captured by the Growth Audit form. */
  teamSize?: string;
  /** What prompted the prospect to explore AI or systems now — Growth Audit context field. */
  growthContext?: string;
}

const pricingPromisePattern = /(guarantee|guaranteed|exact savings|final price|fixed price|\$\d+)/i;
const credentialPattern = /(password|api secret|private key|login|credential)/i;

/**
 * Validates required intake fields and guardrails before record creation.
 */
export function validateIntakeSubmission(submission: IntakeSubmission): string[] {
  const errors: string[] = [];

  if (!submission.name.trim()) errors.push("Name is required.");
  if (!submission.email.includes("@")) errors.push("A valid email is required.");
  if (!submission.businessName.trim()) errors.push("Business name is required.");
  if (!submission.industry.trim()) errors.push("Business type is required.");
  if (!submission.primaryPain.trim()) errors.push("Primary workflow pain is required.");
  if (!submission.currentProcess.trim()) errors.push("Current process is required.");
  if (!submission.permissionToFollowUp) errors.push("Permission to follow up is required.");

  const combinedText = Object.values(submission).join(" ");
  if (pricingPromisePattern.test(combinedText)) {
    errors.push("Please avoid final pricing or guaranteed savings claims in intake.");
  }
  if (credentialPattern.test(combinedText)) {
    errors.push("Do not submit passwords, logins, API secrets, or private credentials.");
  }

  return errors;
}
