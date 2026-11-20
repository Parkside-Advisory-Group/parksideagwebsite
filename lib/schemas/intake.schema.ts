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
  /** Identifies the intake entry point, such as "intake" or "opportunity-estimator". */
  source?: string;
  /** Team size — captured by the Snapshot form. */
  teamSize?: string;
  /** What prompted the prospect to explore AI or systems now — Snapshot context field. */
  growthContext?: string;
}

const pricingPromisePattern = /(guarantee|guaranteed|exact savings|final price|fixed price|\$\d+)/i;
const credentialPattern = /(password|api secret|private key|login|credential)/i;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Validates required intake fields and guardrails before record creation.
 * Malformed payloads return field errors and never throw.
 */
export function validateIntakeSubmission(submission: unknown): string[] {
  if (!isRecord(submission)) {
    return ["A complete intake is required."];
  }

  const errors: string[] = [];
  const name = readString(submission.name);
  const email = readString(submission.email);
  const businessName = readString(submission.businessName);
  const industry = readString(submission.industry);
  const primaryPain = readString(submission.primaryPain);
  const currentProcess = readString(submission.currentProcess);

  if (!name) errors.push("Name is required.");
  if (!email.includes("@")) errors.push("A valid email is required.");
  if (!businessName) errors.push("Business name is required.");
  if (!industry) errors.push("Business type is required.");
  if (!primaryPain) errors.push("Primary workflow pain is required.");
  if (!currentProcess) errors.push("Current process is required.");
  if (submission.permissionToFollowUp !== true) errors.push("Permission to follow up is required.");

  const combinedText = Object.values(submission)
    .filter((value): value is string => typeof value === "string")
    .join(" ");
  if (pricingPromisePattern.test(combinedText)) {
    errors.push("Please avoid final pricing or guaranteed savings claims in intake.");
  }
  if (credentialPattern.test(combinedText)) {
    errors.push("Do not submit passwords, logins, API secrets, or private credentials.");
  }

  return errors;
}

const optionalTextFields = [
  "phone",
  "website",
  "frequencyOfIssue",
  "peopleInvolved",
  "toolsUsed",
  "estimatedTimeLost",
  "estimatedBusinessImpact",
  "desiredOutcome",
  "urgency",
  "source",
  "teamSize",
  "growthContext"
] as const;

/** Fills optional text fields so downstream scoring never reads a missing string. */
export function normalizeIntakeSubmission(submission: IntakeSubmission): IntakeSubmission {
  const normalized: IntakeSubmission = { ...submission };

  for (const field of optionalTextFields) {
    const value = normalized[field];
    if (typeof value !== "string") {
      delete normalized[field];
    }
  }

  normalized.frequencyOfIssue ??= "";
  normalized.peopleInvolved ??= "";
  normalized.toolsUsed ??= "";
  normalized.estimatedTimeLost ??= "";
  normalized.estimatedBusinessImpact ??= "";
  normalized.desiredOutcome ??= "";
  normalized.urgency ??= "";

  return normalized;
}
