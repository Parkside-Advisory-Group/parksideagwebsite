import assert from "node:assert/strict";
import test from "node:test";

import { sendIntakeNotification } from "../lib/email/send-intake-notification";
import type { IntakeRecord } from "../lib/schemas/lead.schema";

const record: IntakeRecord = {
  id: "11111111-1111-4111-8111-111111111111",
  correlation_id: "PS-INTAKE-20260521-1111",
  created_at: "2026-05-21T00:00:00.000Z",
  name: "Test Prospect",
  email: "test@example.com",
  phone: "555-0100",
  business_name: "Test Company",
  website: "https://example.com",
  industry: "Professional services",
  primary_pain: "Manual follow-up tracking",
  workflow_category: "sales",
  current_process: "Spreadsheet and inbox reminders",
  tools_used: "Gmail, Sheets",
  estimated_time_lost: "5 hours per week",
  estimated_business_impact: "Missed opportunities",
  desired_outcome: "Cleaner handoff process",
  urgency: "this month",
  lead_score: 82,
  lead_tier: "high priority",
  internal_summary: "Correlation ID: PS-INTAKE-20260521-1111\nStrong fit for workflow audit.",
  status: "new",
  follow_up_notes: "Correlation ID: PS-INTAKE-20260521-1111 | Follow up within one business day.",
  source: "test",
  team_size: "2-10",
  growth_context: "Testing notification"
};

test("sendIntakeNotification includes the correlation ID in the email subject", async () => {
  const originalKey = process.env.RESEND_API_KEY;
  const originalRecipient = process.env.PARKSIDE_NOTIFY_EMAIL;
  const originalFetch = globalThis.fetch;

  process.env.RESEND_API_KEY = "resend-key";
  process.env.PARKSIDE_NOTIFY_EMAIL = "info@parksideag.com";

  const calls: Array<{ url: string; init?: RequestInit }> = [];
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init });
    return new Response(null, { status: 200 });
  }) as typeof fetch;

  try {
    const result = await sendIntakeNotification(record);

    assert.deepEqual(result, { sent: true });
    assert.equal(calls.length, 1);
    const payload = JSON.parse(String(calls[0].init?.body)) as Record<string, string>;
    assert.equal(payload.subject, "New Parkside intake [PS-INTAKE-20260521-1111]: Test Company");
    assert.match(payload.text, /^Correlation ID: PS-INTAKE-20260521-1111/m);
  } finally {
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
    if (originalRecipient === undefined) delete process.env.PARKSIDE_NOTIFY_EMAIL;
    else process.env.PARKSIDE_NOTIFY_EMAIL = originalRecipient;
    globalThis.fetch = originalFetch;
  }
});
