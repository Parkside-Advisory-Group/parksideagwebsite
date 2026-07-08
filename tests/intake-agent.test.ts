import assert from "node:assert/strict";
import test from "node:test";

import { createIntakeRecord } from "../lib/agents/intake-agent";
import type { IntakeSubmission } from "../lib/schemas/intake.schema";

const submission: IntakeSubmission = {
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

test("createIntakeRecord assigns a Parkside correlation ID and threads it through the record", async () => {
  const record = await createIntakeRecord(submission);

  assert.match(record.correlation_id, /^PS-INTAKE-\d{8}-[A-F0-9]{4}$/);
  assert.match(record.internal_summary, new RegExp(`^Correlation ID: ${record.correlation_id}`));
  assert.match(record.follow_up_notes, new RegExp(`^Correlation ID: ${record.correlation_id} \| `));
});
