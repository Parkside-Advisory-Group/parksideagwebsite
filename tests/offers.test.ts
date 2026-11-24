import assert from "node:assert/strict";
import test from "node:test";
import {
  heroHeadline,
  offers,
  securityCheckDisclaimer
} from "../lib/content";

const disclaimer =
  "The AI-Ready Security Check is a practical operations and risk review. It is not a penetration test, audit, or certification. It is not legal, compliance, or insurance advice, and it does not guarantee against a breach. The client's IT provider or a qualified security firm should carry out any IT changes.";

test("the offer ladder keeps the approved names, fees, and security disclaimer", () => {
  assert.equal(heroHeadline, "Estimates shouldn't go quiet.");
  assert.deepEqual(
    offers.map((offer) => offer.name),
    [
      "Free AI Workflow Savings Snapshot",
      "AI-Ready Security Check",
      "AI Operations Blueprint",
      "Build"
    ]
  );
  assert.equal(offers[0].feeLabel, "Free");
  assert.equal(offers[1].feeLabel, "$500 fixed fee");
  assert.equal(offers[2].feeLabel, "Founder-cohort target $1,500");
  assert.match(offers[2].summary, /30-day AI Operator Pilot/);
  assert.match(offers[2].summary, /credited if the Blueprint is signed within 30 days/);
  assert.equal(offers[3].feeLabel, "Quoted after the Blueprint");
  assert.equal(securityCheckDisclaimer, disclaimer);
});
