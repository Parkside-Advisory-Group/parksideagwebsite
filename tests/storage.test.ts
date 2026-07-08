import assert from "node:assert/strict";
import test from "node:test";

import { saveIntakeRecord } from "../lib/integrations/storage";
import type { IntakeRecord } from "../lib/schemas/lead.schema";

const baseRecord: IntakeRecord = {
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
  internal_summary: "Strong fit for workflow audit.",
  status: "new",
  follow_up_notes: "Follow up within one business day.",
  source: "test",
  team_size: "2-10",
  growth_context: "Testing storage"
};

test("saveIntakeRecord inserts the intake record into Supabase REST API", async () => {
  const originalUrl = process.env.SUPABASE_URL;
  const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const originalFetch = globalThis.fetch;

  process.env.SUPABASE_URL = "https://example-project.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-key";

  const calls: Array<{ url: string; init?: RequestInit }> = [];
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init });
    return new Response(null, { status: 201 });
  }) as typeof fetch;

  try {
    const result = await saveIntakeRecord(baseRecord);

    assert.deepEqual(result, { saved: true });
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "https://example-project.supabase.co/rest/v1/intake_leads");
    assert.equal(calls[0].init?.method, "POST");
    assert.equal((calls[0].init?.headers as Record<string, string>).apikey, "service-role-key");
    assert.equal((calls[0].init?.headers as Record<string, string>).Authorization, "Bearer service-role-key");
    assert.equal((calls[0].init?.headers as Record<string, string>).Prefer, "return=minimal");
    assert.deepEqual(JSON.parse(String(calls[0].init?.body)), baseRecord);
  } finally {
    if (originalUrl === undefined) delete process.env.SUPABASE_URL;
    else process.env.SUPABASE_URL = originalUrl;
    if (originalKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    else process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
    globalThis.fetch = originalFetch;
  }
});

test("saveIntakeRecord reports Supabase API errors without throwing", async () => {
  const originalUrl = process.env.SUPABASE_URL;
  const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const originalFetch = globalThis.fetch;

  process.env.SUPABASE_URL = "https://example-project.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-key";
  globalThis.fetch = (async () => new Response("table not found", { status: 404 })) as typeof fetch;

  try {
    const result = await saveIntakeRecord(baseRecord);

    assert.equal(result.saved, false);
    assert.match(result.reason ?? "", /Supabase insert failed \(404\): table not found/);
  } finally {
    if (originalUrl === undefined) delete process.env.SUPABASE_URL;
    else process.env.SUPABASE_URL = originalUrl;
    if (originalKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    else process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
    globalThis.fetch = originalFetch;
  }
});

test("saveIntakeRecord falls back when the Supabase table does not yet have a correlation_id column", async () => {
  const originalUrl = process.env.SUPABASE_URL;
  const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const originalFetch = globalThis.fetch;

  process.env.SUPABASE_URL = "https://example-project.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-key";

  const requestBodies: Array<Record<string, unknown>> = [];
  globalThis.fetch = (async (_url: string | URL | Request, init?: RequestInit) => {
    const body = JSON.parse(String(init?.body)) as Record<string, unknown>;
    requestBodies.push(body);

    if (requestBodies.length === 1) {
      return new Response("Could not find the 'correlation_id' column of 'intake_leads' in the schema cache", {
        status: 400
      });
    }

    return new Response(null, { status: 201 });
  }) as typeof fetch;

  try {
    const result = await saveIntakeRecord(baseRecord);

    assert.equal(result.saved, true);
    assert.match(result.reason ?? "", /without dedicated correlation_id column/i);
    assert.equal(requestBodies.length, 2);
    assert.equal(requestBodies[0].correlation_id, baseRecord.correlation_id);
    assert.equal("correlation_id" in requestBodies[1], false);
    assert.equal(requestBodies[1].internal_summary, baseRecord.internal_summary);
  } finally {
    if (originalUrl === undefined) delete process.env.SUPABASE_URL;
    else process.env.SUPABASE_URL = originalUrl;
    if (originalKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    else process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
    globalThis.fetch = originalFetch;
  }
});
