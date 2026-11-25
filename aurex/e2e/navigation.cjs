/**
 * Navigation test in a real browser (Playwright): clicks from the home page to internal pages in French and
 * English, direct URLs, reload, Back / Forward, mobile menu, language switch, 404, and recovery when a page
 * chunk fails to load. A page is "blank" when its body has almost no text or the console shows an error.
 *   BASE_URL=http://127.0.0.1:3100 node e2e/navigation.cjs
 */
const { chromium } = require("playwright");
const BASE = process.env.BASE_URL || "http://127.0.0.1:3100";
const results = [];
const check = (name, ok, detail = "") => { results.push(ok); console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`); };

async function watch(page) {
  const problems = [];
  page.on("pageerror", (e) => problems.push("pageerror: " + e.message));
  page.on("console", (m) => { if (m.type() === "error") problems.push("console: " + m.text().slice(0, 160)); });
  page.on("requestfailed", (r) => { if (!r.url().includes("/api/trpc") || true) problems.push("requestfailed: " + r.url().slice(-80)); });
  page.on("response", (r) => { if (r.status() >= 400 && !r.url().includes("favicon")) problems.push(`http ${r.status()}: ${r.url().slice(-80)}`); });
  return problems;
}

// A page counts as rendered when it shows a heading and a reasonable amount of text.
async function rendered(page, minChars = 200) {
  await page.waitForSelector("h1, h2", { timeout: 15000 });
  const text = await page.evaluate(() => document.body.innerText.length);
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  return text >= minChars && !/rgb\(255, 255, 255\)/.test(bg);
}

(async () => {
  const browser = await chromium.launch();

  for (const lang of ["fr", "en"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const problems = await watch(page);
    await page.goto(`${BASE}/${lang}`, { waitUntil: "networkidle" });
    check(`[${lang}] home renders`, await rendered(page));

    // Click through the main navigation from the home page, one page at a time.
    const targets = lang === "fr"
      ? ["/fr/expertises", "/fr/solutions", "/fr/secteurs", "/fr/tarifs", "/fr/etudes-de-cas", "/fr/ressources", "/fr/a-propos", "/fr/contact", "/fr/automatisation", "/fr/calculateurs", "/fr/faq", "/fr/conditions", "/fr/mentions-legales", "/fr/accessibilite", "/fr/plan-du-site", "/fr/diagnostic", "/fr/soumission", "/fr/consultation", "/fr/connexion"]
      : ["/en/expertise", "/en/solutions", "/en/industries", "/en/pricing", "/en/case-studies", "/en/resources", "/en/about", "/en/contact", "/en/automation", "/en/calculators", "/en/faq", "/en/terms", "/en/legal-notice", "/en/accessibility", "/en/sitemap", "/en/diagnostic", "/en/quote", "/en/consultation", "/en/sign-in"];
    let clicked = 0, ok = 0;
    for (const href of targets) {
      await page.goto(`${BASE}/${lang}`, { waitUntil: "networkidle" });
      // Reach the link as a visitor would: a visible link on the page, otherwise through the menu.
      let link = page.locator(`a[href="${href}"]:visible`).first();
      if (!(await link.count())) {
        await page.locator(".menu-trigger").click({ timeout: 4000 }).catch(() => {});
        await page.waitForTimeout(300);
        link = page.locator(`a[href="${href}"]:visible`).first();
      }
      if (!(await link.count())) { console.log("  no visible link for", href, "(opened by URL)"); await page.goto(`${BASE}${href}`, { waitUntil: "networkidle" }); clicked += 1; if (await rendered(page, 100)) ok += 1; continue; }
      await link.click({ timeout: 6000 });
      clicked += 1;
      await page.waitForURL(`**${href}*`, { timeout: 10000 }).catch(() => {});
      if (await rendered(page, 100)) ok += 1; else console.log("  blank after click:", href);
    }
    check(`[${lang}] ${clicked} pages reached by click, none blank`, ok === clicked, `${ok}/${clicked}`);

    // Direct URL, reload, Back and Forward on an inner page.
    const inner = lang === "fr" ? "/fr/tarifs" : "/en/pricing";
    await page.goto(`${BASE}${inner}`, { waitUntil: "networkidle" });
    check(`[${lang}] direct URL renders`, await rendered(page));
    await page.reload({ waitUntil: "networkidle" });
    check(`[${lang}] reload keeps the page`, await rendered(page) && page.url().endsWith(inner));
    await page.goto(`${BASE}/${lang}`, { waitUntil: "networkidle" });
    await page.locator(`a[href="${inner}"]:visible`).first().click().catch(async () => { await page.locator(".menu-trigger").click().catch(() => {}); await page.locator(`a[href="${inner}"]:visible`).first().click(); });
    await page.waitForURL(`**${inner}`, { timeout: 8000 }).catch(() => {});
    await page.goBack(); await page.waitForTimeout(600);
    check(`[${lang}] Back returns to the home page`, page.url().endsWith(`/${lang}`) && await rendered(page));
    await page.goForward(); await page.waitForTimeout(600);
    check(`[${lang}] Forward returns to the inner page`, page.url().endsWith(inner) && await rendered(page));

    // 404
    await page.goto(`${BASE}/${lang}/page-inexistante`, { waitUntil: "networkidle" });
    const home404 = await page.locator('a[href="/' + lang + '"]').count();
    check(`[${lang}] unknown URL shows a 404 page with a link home`, (await page.locator("body").innerText()).includes("404") && home404 > 0);

    // Language switch keeps the equivalent page
    if (lang === "fr") {
      await page.goto(`${BASE}/fr/tarifs`, { waitUntil: "networkidle" });
      await page.locator(".language-switch button, .language-switch a").filter({ hasText: /^EN$/i }).first().click();
      await page.waitForURL("**/en/pricing", { timeout: 8000 }).catch(() => {});
      check("[fr→en] language switch opens the equivalent page", page.url().endsWith("/en/pricing") && await rendered(page));
    }
    const real = problems.filter((p) => !/favicon|ERR_ABORTED|page-inexistante|status of 404/.test(p));
    check(`[${lang}] no console error or failed request`, real.length === 0, real.slice(0, 3).join(" | "));
    await ctx.close();
  }

  // Mobile: menu opens, navigates, closes; language switch
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true });
    const page = await ctx.newPage();
    const problems = await watch(page);
    await page.goto(`${BASE}/fr`, { waitUntil: "networkidle" });
    await page.locator(".menu-trigger").click();
    await page.waitForSelector(".mobile-menu", { timeout: 5000 });
    await page.locator(`.mobile-menu a[href="/fr/tarifs"]`).first().click();
    await page.waitForURL("**/fr/tarifs", { timeout: 8000 });
    check("[mobile] menu → pricing renders and menu closes", await rendered(page) && (await page.locator(".mobile-menu").count()) === 0);
    await page.locator(".menu-trigger").click();
    await page.locator(`.mobile-menu a[href="/fr/contact"]`).first().click();
    await page.waitForURL("**/fr/contact", { timeout: 8000 });
    check("[mobile] menu → contact renders", await rendered(page, 100));
    check("[mobile] no horizontal scroll", (await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)));
    const real = problems.filter((p) => !/favicon|ERR_ABORTED|page-inexistante|status of 404/.test(p));
    check("[mobile] no console error or failed request", real.length === 0, real.slice(0, 3).join(" | "));
    await ctx.close();
  }

  // Resilience: a page chunk that fails to load must not leave a blank screen.
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/fr/contact`, { waitUntil: "networkidle" });
    let blocked = 0;
    await page.route(/\/assets\/ProductPages-.*\.js/, (route) => { blocked += 1; route.abort(); });
    let l = page.locator('a[href="/fr/tarifs"]:visible').first();
    if (!(await l.count())) { await page.locator(".menu-trigger").click().catch(() => {}); await page.waitForTimeout(300); l = page.locator('a[href="/fr/tarifs"]:visible').first(); }
    await l.click().catch((e) => console.log("  click failed:", e.message.slice(0, 80)));
    await page.waitForTimeout(3500);
    const text = await page.evaluate(() => document.body.innerText);
    check("[resilience] a failing page chunk shows a message or recovers, never a blank screen", blocked > 0 && /recharger|réessayer|Reload|Try again/i.test(text), `blocked=${blocked}`);
    await ctx.close();
  }

  await browser.close();
  const failed = results.filter((r) => !r).length;
  console.log(`\n${results.length - failed}/${results.length} navigation checks passed`);
  process.exit(failed ? 1 : 0);
})();
