import assert from "node:assert/strict";
import test from "node:test";

import { getBookingUrl } from "../lib/booking";
import {
  ESTIMATOR_MAX_SCORE,
  STRONG_STARTING_SCORE,
  buildEstimatorHref,
  buildIntakeHref,
  calculateEstimatorResult,
  initialEstimatorState,
  readEstimatorContext,
} from "../lib/opportunity/estimator";

const strongState = {
  ...initialEstimatorState,
  teamSize: "76-plus",
  workflowType: "estimate-follow-up",
  frequency: "daily-multiple",
  tools: ["Email", "Spreadsheets", "CRM"],
  ownership: "clear-owner",
  examples: "examples-ready",
  impact: "high-impact",
  urgency: "this-quarter",
};

test("calculateEstimatorResult keeps the published bands", () => {
  assert.equal(calculateEstimatorResult(strongState).score, ESTIMATOR_MAX_SCORE);
  assert.equal(calculateEstimatorResult(strongState).band, "Strong starting point");

  const promising = calculateEstimatorResult({
    ...initialEstimatorState,
    workflowType: "estimate-follow-up",
    frequency: "daily",
    ownership: "clear-owner",
    impact: "high-impact",
  });
  assert.equal(promising.score, 12);
  assert.equal(promising.band, "Promising but needs focus");
  assert.ok(promising.score < STRONG_STARTING_SCORE);

  const early = calculateEstimatorResult({
    ...initialEstimatorState,
    workflowType: "broad-ai",
    frequency: "occasional",
    ownership: "no-owner",
    impact: "low-impact",
  });
  assert.equal(early.band, "Prepare before automating");
});

test("estimator links carry whitelisted answers into intake", () => {
  const href = buildIntakeHref(strongState);
  const params = new URLSearchParams(href.split("?")[1]);
  const context = readEstimatorContext(params);

  assert.equal(context?.result.band, "Strong starting point");
  assert.equal(context?.result.score, 23);
  assert.match(context?.summary ?? "", /Estimate or proposal follow-up/);
  assert.equal(buildEstimatorHref(strongState).startsWith("/opportunity-estimator?"), true);
});

test("readEstimatorContext ignores tampered scores and unknown values", () => {
  const params = new URLSearchParams({
    source: "opportunity-estimator",
    workflow: "not-a-workflow",
    score: "23",
    band: "Strong starting point",
  });

  assert.equal(readEstimatorContext(params), null);
});

test("getBookingUrl accepts only http(s) links", () => {
  const previous = process.env.NEXT_PUBLIC_BOOKING_URL;
  process.env.NEXT_PUBLIC_BOOKING_URL = "https://cal.com/parkside/20-min";
  assert.equal(getBookingUrl(), "https://cal.com/parkside/20-min");

  process.env.NEXT_PUBLIC_BOOKING_URL = "javascript:alert(1)";
  assert.equal(getBookingUrl(), null);

  process.env.NEXT_PUBLIC_BOOKING_URL = "";
  assert.equal(getBookingUrl(), null);

  if (previous === undefined) delete process.env.NEXT_PUBLIC_BOOKING_URL;
  else process.env.NEXT_PUBLIC_BOOKING_URL = previous;
});
