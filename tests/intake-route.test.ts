import assert from "node:assert/strict";
import test from "node:test";

import { POST } from "../app/api/intake/route";

const completeBody = {
  name: "Dana Prospect",
  email: "dana@example.com",
  businessName: "Prospect Co",
  industry: "Commercial contractor",
  primaryPain: "Estimate follow-up sits in one inbox with no owner.",
  currentProcess: "The office checks email and follows up when someone remembers.",
  permissionToFollowUp: true,
  source: "opportunity-estimator",
  growthContext: "Strong starting point (19 of 23). Estimate or proposal follow-up."
};

async function post(body: string, headers?: HeadersInit): Promise<Response> {
  return POST(
    new Request("http://localhost/api/intake", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body
    })
  );
}

test("POST /api/intake returns 400 for an empty body", async () => {
  const response = await post("");
  const payload = await response.json();

  assert.equal(response.status, 400);
  assert.deepEqual(payload.errors, ["Intake must be sent as JSON."]);
  assert.equal("record" in payload, false);
});

test("POST /api/intake returns 400 field errors for an empty object", async () => {
  const response = await post("{}");
  const payload = await response.json();

  assert.equal(response.status, 400);
  assert.ok(payload.errors.includes("Name is required."));
  assert.equal("record" in payload, false);
});

test("POST /api/intake rejects credential-looking input without creating a record", async () => {
  const response = await post(
    JSON.stringify({
      ...completeBody,
      currentProcess: "The notes include a password and a private key."
    })
  );
  const payload = await response.json();

  assert.equal(response.status, 400);
  assert.ok(payload.errors.some((error: string) => error.includes("passwords")));
  assert.equal("record" in payload, false);
});

test("POST /api/intake accepts a complete payload", async () => {
  const response = await post(JSON.stringify(completeBody));
  const payload = await response.json();

  assert.equal(response.status, 200);
  assert.match(payload.correlationId, /^PS-INTAKE-/);
  assert.match(payload.record.growth_context, /Estimate or proposal follow-up/);
});
