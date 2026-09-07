import { chromium } from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createHash } from "node:crypto";
fs.mkdirSync("work/astra/verification", { recursive: true });
const browser = await chromium.launch({ headless: true });
const checks = [];
const failures = [];
async function check(name, fn) {
  try {
    await fn();
    checks.push(name);
    console.log("PASS", name);
  } catch (e) {
    failures.push({ name, error: String(e) });
    console.log("FAIL", name, String(e));
  }
}
const base = process.env.PREVIEW_URL || "http://localhost:3017";
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto(base, { waitUntil: "networkidle" });
await page.evaluate(
  () => (document.documentElement.style.scrollBehavior = "auto"),
);
await check("Home metadata, meaningful landmarks and live WebGL", async () => {
  assert.match(await page.title(), /Parkside/);
  assert.equal(await page.locator("h1").count(), 1);
  await page.waitForSelector('[data-webgl-state="ready"]');
});
await check("Visitor can pause and resume the actual canvas", async () => {
  await page.getByRole("button", { name: "Pause motion", exact: true }).click();
  await page.waitForTimeout(500);
  const canvas = page.locator(".atelier-hero-art canvas");
  const hash = async () =>
    createHash("sha256")
      .update(await canvas.screenshot())
      .digest("hex");
  const a = await hash();
  await page.waitForTimeout(500);
  assert.equal(await hash(), a);
  assert.equal(
    await page.locator("html").getAttribute("data-motion-paused"),
    "true",
  );
  await page
    .getByRole("button", { name: "Motion paused", exact: true })
    .click();
  await page.waitForTimeout(800);
  assert.notEqual(await hash(), a);
});
await check(
  "All four capability selections produce the corresponding detail",
  async () => {
    const titles = [
      "Every inquiry. A next step.",
      "Less assembling. More understanding.",
      "A clear owner. At every turn.",
      "Intelligence with a purpose.",
    ];
    for (let i = 0; i < 4; i++) {
      await page.locator(".workflow-options button").nth(i).click();
      assert.equal(
        await page.locator(".workflow-detail h3").innerText(),
        titles[i],
      );
      assert.equal(
        await page
          .locator('.workflow-options button[aria-pressed="true"]')
          .count(),
        1,
      );
    }
  },
);
await check("Every homepage internal link returns successfully", async () => {
  const links = await page
    .locator("a")
    .evaluateAll((as) => [
      ...new Set(
        as.map((a) => a.getAttribute("href")).filter((h) => h?.startsWith("/")),
      ),
    ]);
  for (const href of links) {
    const r = await page.request.get(base + href);
    assert.equal(r.status(), 200, href);
  }
});
await check(
  "Every route has one h1, canonical metadata, and no desktop overflow",
  async () => {
    for (const route of [
      "/services",
      "/blueprint",
      "/use-cases",
      "/about",
      "/field-notes",
      "/intake",
      "/growth-audit",
      "/opportunity-estimator",
      "/privacy",
    ]) {
      await page.goto(base + route, { waitUntil: "networkidle" });
      assert.equal(await page.locator("h1").count(), 1, route);
      assert.equal(
        await page.locator('link[rel="canonical"]').count(),
        1,
        route,
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        route,
      );
    }
  },
);
await check(
  "Estimator calculates and displays strongest readiness case",
  async () => {
    await page.goto(base + "/opportunity-estimator", {
      waitUntil: "networkidle",
    });
    for (const label of [
      "76+",
      "Lead intake or missed calls",
      "Several times a day",
      "One clear owner",
      "Yes, recent examples are available",
      "Revenue, response time, or customer trust",
      "This quarter",
    ])
      await page.getByRole("radio", { name: label, exact: true }).check();
    for (const label of ["Email", "Spreadsheets", "CRM"])
      await page.getByRole("checkbox", { name: label, exact: true }).check();
    await page.getByRole("button", { name: /See the recommendation/ }).click();
    assert.equal(
      await page.locator(".estimator-score > span").innerText(),
      "23",
    );
    assert.match(
      await page.locator(".estimator-result").innerText(),
      /Strong starting point/,
    );
  },
);
const mobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
await mobile.goto(base, { waitUntil: "networkidle" });
await check(
  "Mobile menu opens, traps focus, escapes, and navigates",
  async () => {
    await mobile.getByRole("button", { name: "Open menu" }).click();
    assert.equal(
      await mobile.evaluate(() => document.body.style.overflow),
      "hidden",
    );
    await mobile.keyboard.press("Shift+Tab");
    assert.equal(
      await mobile.evaluate(() =>
        document.activeElement?.getAttribute("aria-label"),
      ),
      "Close menu",
    );
    await mobile.keyboard.press("Escape");
    assert.equal(await mobile.locator(".atelier-menu-panel").count(), 0);
    await mobile.getByRole("button", { name: "Open menu" }).click();
    await mobile
      .locator(".atelier-menu-panel")
      .getByRole("link", { name: /Who we are/ })
      .click();
    await mobile.waitForURL("**/about");
    assert.notEqual(
      await mobile.evaluate(() => document.body.style.overflow),
      "hidden",
    );
  },
);
await check(
  "Closing the menu preserves the scrolled header background",
  async () => {
    await mobile.goto(base, { waitUntil: "networkidle" });
    await mobile.locator("#capabilities").scrollIntoViewIfNeeded();
    await mobile.waitForTimeout(450);
    await mobile.getByRole("button", { name: "Open menu" }).click();
    await mobile.getByRole("button", { name: "Close menu" }).click();
    await mobile.waitForTimeout(450);
    assert.equal(
      await mobile
        .locator("header")
        .evaluate((e) => getComputedStyle(e).backgroundColor),
      "rgb(122, 31, 43)",
    );
  },
);
await check(
  "Browser Back closes mobile menu and restores scrolling",
  async () => {
    await mobile.goto(base, { waitUntil: "networkidle" });
    await mobile.getByRole("button", { name: "Open menu" }).click();
    await mobile
      .locator(".atelier-menu-panel")
      .getByRole("link", { name: /What we do/ })
      .click();
    await mobile.waitForURL("**/services");
    await mobile.getByRole("button", { name: "Open menu" }).click();
    await mobile.goBack();
    await mobile.waitForURL(base + "/");
    await mobile.waitForTimeout(300);
    assert.equal(await mobile.locator(".atelier-menu-panel").count(), 0);
    assert.notEqual(
      await mobile.evaluate(() => document.body.style.overflow),
      "hidden",
    );
  },
);
await check(
  "Mobile workflow selection scrolls the changed response into view",
  async () => {
    await mobile.goto(base, { waitUntil: "networkidle" });
    await mobile.locator(".workflow-options button").nth(2).click();
    await mobile.waitForTimeout(1300);
    const box = await mobile.locator("#workflow-detail").boundingBox();
    assert(box && box.y >= 75 && box.y < 200, JSON.stringify(box));
    assert.match(
      await mobile.locator(".workflow-detail h3").innerText(),
      /A clear owner/,
    );
  },
);
await check(
  "Small phone through large desktop remain within viewport",
  async () => {
    for (const width of [
      320, 360, 390, 430, 600, 760, 768, 820, 1024, 1440, 1920,
    ]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base, { waitUntil: "domcontentloaded" });
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `width ${width}`,
      );
      const heading = await page.locator("h1").boundingBox();
      assert(heading && heading.x >= 0, `heading ${width}`);
    }
  },
);
const reduced = await browser.newPage({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
await check(
  "Reduced motion has a still sculpture, visible content and honest control",
  async () => {
    await reduced.goto(base, { waitUntil: "networkidle" });
    await reduced.waitForSelector('[data-webgl-state="ready"]');
    assert.equal(
      await reduced
        .getByRole("button", { name: "Reduced motion", exact: true })
        .isDisabled(),
      true,
    );
    const canvas = reduced.locator(".atelier-hero-art canvas");
    const a = createHash("sha256")
      .update(await canvas.screenshot())
      .digest("hex");
    await reduced.waitForTimeout(500);
    const b = createHash("sha256")
      .update(await canvas.screenshot())
      .digest("hex");
    assert.equal(a, b);
    const hidden = await reduced
      .locator("[data-reveal]")
      .evaluateAll(
        (es) => es.filter((e) => getComputedStyle(e).opacity !== "1").length,
      );
    assert.equal(hidden, 0);
    await reduced.screenshot({
      path: "work/astra/verification/reduced-motion.png",
    });
  },
);
await check("WebGL failure retains a visible static artwork", async () => {
  const p = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await p.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (
        type === "webgl2" ||
        type === "webgl" ||
        type === "experimental-webgl"
      )
        return null;
      return original.call(this, type, ...args);
    };
  });
  await p.goto(base, { waitUntil: "networkidle" });
  await p.waitForSelector('[data-webgl-state="unavailable"]');
  assert.equal(
    await p
      .locator(".sculpture-fallback")
      .evaluate((e) => getComputedStyle(e).opacity),
    "1",
  );
  await p.screenshot({ path: "work/astra/verification/webgl-fallback.png" });
  await p.close();
});
await check("A missing route returns 404", async () =>
  assert.equal(
    (await page.request.get(base + "/not-a-real-parkside-page")).status(),
    404,
  ),
);
await check("No unhandled browser errors", async () =>
  assert.deepEqual(errors, []),
);
const report = { date: new Date().toISOString(), base, checks, failures };
fs.writeFileSync(
  "work/astra/verification/results.json",
  JSON.stringify(report, null, 2),
);
await browser.close();
if (failures.length) process.exitCode = 1;
