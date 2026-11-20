import assert from "node:assert/strict";
import test from "node:test";

import { getLeadScore, getLeadTier, scoreLead } from "../lib/intake/scoring";
import type { IntakeSubmission } from "../lib/intake/types";
import { validateIntakeSubmission } from "../lib/intake/validation";

const completeSubmission: IntakeSubmission = {
  name: "Dana Prospect",
  email: "dana@example.com",
  phone: "555-0100",
  businessName: "Prospect Co",
  website: "https://example.com",
  industry: "Professional services",
  primaryPain:
    "Inbound leads and follow-up tasks are scattered across email, notes, and spreadsheets with no single owner.",
  frequencyOfIssue: "This happens daily and often creates multiple handoffs.",
  currentProcess: "The team checks inboxes, updates a spreadsheet, and follows up manually.",
  peopleInvolved: "Owner, sales coordinator, and operations lead",
  toolsUsed: "Gmail, Google Sheets, HubSpot, and QuickBooks",
  estimatedTimeLost: "8 hours per week",
  estimatedBusinessImpact: "Missed follow-up creates revenue leakage and customer frustration.",
  desiredOutcome: "A cleaner intake and follow-up workflow with clear ownership.",
  urgency: "We need to improve this in the next 30 days.",
  permissionToFollowUp: true,
  source: "growth-audit",
  teamSize: "2-10",
  growthContext: "New referral volume is outgrowing the old process."
};

test("validateIntakeSubmission accepts a complete intake without guardrail errors", () => {
  assert.deepEqual(validateIntakeSubmission(completeSubmission), []);
});

test("validateIntakeSubmission rejects missing required fields and permission", () => {
  const errors = validateIntakeSubmission({
    ...completeSubmission,
    name: " ",
    email: "not-an-email",
    businessName: "",
    industry: "",
    primaryPain: "",
    currentProcess: "",
    permissionToFollowUp: false
  });

  assert.deepEqual(errors, [
    "Name is required.",
    "A valid email is required.",
    "Business name is required.",
    "Business type is required.",
    "Primary workflow pain is required.",
    "Current process is required.",
    "Permission to follow up is required."
  ]);
});

test("validateIntakeSubmission returns field errors for empty or malformed payloads", () => {
  assert.deepEqual(validateIntakeSubmission({}), [
    "Name is required.",
    "A valid email is required.",
    "Business name is required.",
    "Business type is required.",
    "Primary workflow pain is required.",
    "Current process is required.",
    "Permission to follow up is required."
  ]);
  assert.deepEqual(validateIntakeSubmission(null), ["A complete intake is required."]);
  assert.deepEqual(validateIntakeSubmission([]), ["A complete intake is required."]);
  assert.ok(
    validateIntakeSubmission({
      ...completeSubmission,
      name: 12,
      email: "dana@example.com"
    }).includes("Name is required.")
  );
});

test("validateIntakeSubmission blocks pricing promises and credential requests", () => {
  const errors = validateIntakeSubmission({
    ...completeSubmission,
    desiredOutcome: "Guarantee exact savings for a fixed price of $500.",
    currentProcess: "The form includes a password and private key."
  });

  assert.deepEqual(errors, [
    "Please avoid final pricing or guaranteed savings claims in intake.",
    "Do not submit passwords, logins, API secrets, or private credentials."
  ]);
});

test("scoreLead assigns the highest tier for a clear recurring high-impact lead", () => {
  const breakdown = scoreLead(completeSubmission);

  assert.deepEqual(breakdown, {
    clarityOfPain: 20,
    recurrenceOfWorkflow: 20,
    businessImpact: 20,
    toolReadiness: 15,
    urgency: 15,
    contactCompleteness: 10
  });
  assert.equal(getLeadScore(breakdown), 100);
  assert.equal(getLeadTier(getLeadScore(breakdown)), "high priority");
});

test("getLeadTier follows the approved threshold boundaries", () => {
  assert.equal(getLeadTier(80), "high priority");
  assert.equal(getLeadTier(60), "good fit");
  assert.equal(getLeadTier(40), "nurture");
  assert.equal(getLeadTier(39), "not ready");
});
