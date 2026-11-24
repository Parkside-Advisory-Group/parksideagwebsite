import assert from "node:assert/strict";
import test from "node:test";
import {
  heroHeadline,
  offers,
  primaryCta,
  securityCheckDisclaimer
} from "../lib/content";

const disclaimer =
  "The AI-Ready Security Check is a practical operations and risk review. It is not a penetration test, audit, or certification. It is not legal, compliance, or insurance advice, and it does not guarantee against a breach. The client's IT provider or a qualified security firm should carry out any IT changes.";

test("the offer ladder keeps the approved names, fees, and security disclaimer", () => {
  assert.equal(heroHeadline, "Estimates shouldn't go quiet.");
  assert.equal(primaryCta, "Book a free Snapshot");
  assert.deepEqual(
    offers.map((offer) => offer.name),
    ["Snapshot", "Security Check", "Blueprint", "Build"]
  );
  assert.equal(offers[0].feeLabel, "Free");
  assert.equal(offers[1].feeLabel, "$500");
  assert.equal(offers[2].feeLabel, "From $1,500");
  assert.equal(offers[3].feeLabel, "Quoted after the Blueprint");
  assert.equal(securityCheckDisclaimer, disclaimer);
});
