/* Automated accessibility audit (axe-core, WCAG 2.1 A/AA + best practices) on the main public pages, in French and English.
 *   BASE_URL=http://127.0.0.1:3000 node e2e/a11y.cjs */
const { chromium } = require("playwright");
const path = require("node:path");
const BASE = process.env.BASE_URL || "http://127.0.0.1:3000";
const pages = ["/fr", "/en", "/fr/expertises", "/fr/expertises/publicite-numerique-ppc", "/en/expertise/artificial-intelligence-automation".replace("artificial-intelligence-automation", "intelligence-artificielle-automatisation"), "/fr/solutions", "/fr/secteurs/sport-bien-etre", "/fr/tarifs", "/fr/simulateur", "/fr/intelligence-artificielle", "/fr/a-propos", "/fr/methode", "/fr/diagnostic", "/fr/consultation", "/fr/contact", "/fr/confidentialite", "/fr/connexion", "/en/pricing", "/en/simulator"];
(async () => {
  const browser = await chromium.launch({ args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader"] });
  // axe is injected as a script, so the audit context bypasses the CSP; the CSP itself is checked in a second pass below.
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "fr-CA", bypassCSP: true });
  const page = await ctx.newPage();
  const csp = [];
  page.on("console", (m) => { if (/Content Security Policy|Refused to/i.test(m.text())) csp.push(m.text().slice(0, 160)); });
  let total = 0; const summary = {};
  for (const p of pages) {
    await page.goto(BASE + p, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    await page.addScriptTag({ path: path.join(__dirname, "../node_modules/axe-core/axe.min.js") });
    const result = await page.evaluate(async () => await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] } }));
    for (const v of result.violations) {
      total += v.nodes.length;
      const key = `${v.id} (${v.impact})`;
      (summary[key] ||= { help: v.help, pages: new Set(), sample: v.nodes[0].target.join(" ") + " :: " + (v.nodes[0].failureSummary || "").split("\n").slice(1, 3).join(" ") });
      summary[key].pages.add(p);
    }
    console.log(`${result.violations.length === 0 ? "PASS" : "FAIL"}  ${p}  ${result.violations.map((v) => v.id).join(", ")}`);
  }
  // Chat panel open
  await page.goto(BASE + "/fr", { waitUntil: "networkidle" });
  await page.locator(".assistant-launcher").click(); await page.waitForTimeout(500);
  await page.addScriptTag({ path: path.join(__dirname, "../node_modules/axe-core/axe.min.js") });
  const chat = await page.evaluate(async () => await window.axe.run(document.querySelector(".assistant-panel"), { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } }));
  console.log(`${chat.violations.length === 0 ? "PASS" : "FAIL"}  advisor panel  ${chat.violations.map((v) => v.id).join(", ")}`);
  for (const v of chat.violations) { total += v.nodes.length; summary[`${v.id} (${v.impact})`] = { help: v.help, pages: new Set(["advisor"]), sample: v.nodes[0].target.join(" ") }; }
  for (const [k, v] of Object.entries(summary)) console.log(`\n${k}: ${v.help}\n  pages: ${[...v.pages].join(", ")}\n  e.g. ${v.sample}`);
  const strict = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "fr-CA" })).newPage();
  strict.on("console", (m) => { if (/Content Security Policy|Refused to|violates/i.test(m.text())) csp.push(m.text().slice(0, 200)); });
  strict.on("pageerror", (e) => { if (/Content Security Policy/i.test(e.message)) csp.push(e.message.slice(0, 200)); });
  for (const p of ["/fr", "/en", "/fr/intelligence-artificielle", "/fr/simulateur"]) { await strict.goto(BASE + p, { waitUntil: "networkidle" }); await strict.locator("main").evaluate((el) => el.scrollIntoView()).catch(() => undefined); await strict.waitForTimeout(2500); if (p === "/fr") { await strict.locator(".sculpture").scrollIntoViewIfNeeded(); await strict.waitForFunction(() => document.querySelector("model-viewer")?.loaded === true, null, { timeout: 25000 }).catch(() => csp.push("3D model did not load under the CSP")); } }
  console.log(csp.length ? `\nCSP messages:\n${csp.join("\n")}` : "\nNo CSP violations.");
  console.log(`\n${total} violating nodes`);
  await browser.close();
  process.exit(total ? 1 : 0);
})();
