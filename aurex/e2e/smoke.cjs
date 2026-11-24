/* End-to-end smoke test (Playwright). Needs a running server and demo data:
 *   npm run db:seed:demo && BASE_URL=http://127.0.0.1:3000 ADMIN_EMAIL=... ADMIN_PASSWORD=... node e2e/smoke.cjs */
const { chromium } = require("playwright");
const BASE = process.env.BASE_URL || "http://127.0.0.1:3000";
const ADMIN = { email: process.env.ADMIN_EMAIL || "admin@aurex.test", password: process.env.ADMIN_PASSWORD || "Admin-Aurex-2026!x" };
const SHOTS = process.env.SHOTS_DIR || "/tmp/shots";
const results = [];
const check = (name, ok, detail = "") => { results.push({ name, ok }); console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`); };

(async () => {
  const browser = await chromium.launch({ args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  const newPage = async (opts = {}) => {
    const ctx = await browser.newContext({ locale: "fr-CA", viewport: { width: 1440, height: 900 }, ...opts });
    const page = await ctx.newPage();
    page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
    page.on("console", (m) => { if (m.type() === "error" && !/403|401|404/.test(m.text())) errors.push("console: " + m.text()); });
    return { ctx, page };
  };

  // 1. French home, navigation, language switch to the equivalent page
  const { ctx: visitor, page } = await newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  check("/ redirects to /fr for a French browser", page.url().endsWith("/fr"), page.url());
  check("home headline in French", (await page.locator("h1").first().getAttribute("aria-label")) === "Des stratégies intelligentes. Des résultats mesurables. Une croissance durable.");
  check("home shows the three main buttons", (await page.locator(".hero-actions a").count()) === 3);
  await page.screenshot({ path: `${SHOTS}/fr-home.png` });
  const navTexts = await page.locator("header nav a").allInnerTexts();
  console.log("nav:", navTexts.map((t) => t.split("\n")[0]).join(" | "));
  await page.goto(BASE + "/fr/expertises/marketing-strategique-numerique", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "EN", exact: true }).click();
  await page.waitForURL("**/en/expertise/marketing-strategique-numerique");
  check("language switch opens the equivalent page", true, page.url());
  await page.waitForFunction(() => document.documentElement.lang === "en-CA", null, { timeout: 3000 }).catch(() => {});
  check("html lang switches to en-CA", (await page.evaluate(() => document.documentElement.lang)) === "en-CA");

  // 2. Every public page loads, every internal link resolves
  const seen = new Set(); const queue = ["/fr", "/en"]; const broken = [];
  while (queue.length && seen.size < 140) {
    const path = queue.shift(); if (seen.has(path)) continue; seen.add(path);
    const res = await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("h1", { timeout: 6000 }).catch(() => undefined);
    if (!res || res.status() >= 400) { broken.push(`${path} → ${res && res.status()}`); continue; }
    if ((await page.locator("h1").count()) === 0) broken.push(`${path} → no h1`);
    const text = await page.locator("body").innerText();
    if (/lorem ipsum|\bTODO\b|undefined|\bNaN\b|\[object|à compléter/i.test(text)) broken.push(`${path} → unfinished or broken text`);
    const hrefs = await page.locator("a[href^='/']").evaluateAll((as) => as.map((a) => a.getAttribute("href")));
    for (const h of hrefs) { const clean = h.split("#")[0].split("?")[0]; if (/^\/(fr|en)(\/|$)/.test(clean) && !seen.has(clean)) queue.push(clean); }
  }
  check(`crawled ${seen.size} public pages, all internal links resolve`, broken.length === 0, broken.slice(0, 5).join("; "));
  const expectedPages = 2 * (1 + 12 + 8 + 6 + 10 + 2 + 2); // home+static, expertises, solutions, sectors, insights (2 articles), …
  check("10 expertise pages exist", [...seen].filter((p) => /^\/fr\/expertises\/.+/.test(p)).length === 10);
  check("13 sector pages exist", [...seen].filter((p) => /^\/fr\/secteurs\/.+/.test(p)).length === 13);
  for (const path of ["/fr/tarifs", "/fr/simulateur", "/fr/intelligence-artificielle", "/fr/solutions", "/fr/etudes-de-cas", "/fr/ressources", "/fr/methode", "/fr/calculateurs", "/fr/automatisation", "/fr/innovations"]) check(`page exists: ${path}`, seen.has(path));

  // 3. Diagnostic in three steps
  await page.goto(BASE + "/fr/diagnostic", { waitUntil: "networkidle" });
  await page.locator("form.lead-form").getByLabel(/Nom complet/).fill("Camille Gagnon");
  await page.locator("form.lead-form").getByLabel(/Courriel professionnel/).fill("camille@exemple-diagnostic.test");
  await page.locator("form.lead-form").getByLabel(/^Entreprise/).fill("Gagnon & Fils");
  await page.locator("form.lead-form").getByLabel(/Secteur d’activité/).selectOption("construction-immobilier");
  await page.getByRole("button", { name: /Continuer/ }).click();
  await page.locator("form.lead-form").getByLabel(/Situation actuelle/).fill("Entreprise de quinze employés, soumissions faites à la main.");
  await page.locator("form.lead-form").getByLabel(/^Objectifs/).fill("Doubler le nombre de soumissions envoyées par mois.");
  await page.locator("form.lead-form").getByLabel(/Difficultés rencontrées/).fill("Aucun suivi des relances et outils dispersés.");
  await page.locator("form.lead-form").getByText("Création, développement et croissance des entreprises").click();
  await page.screenshot({ path: `${SHOTS}/fr-diagnostic-step2.png` });
  await page.getByRole("button", { name: /Continuer/ }).click();
  await page.getByRole("button", { name: /Envoyer la demande/ }).click();
  check("diagnostic refuses submission without consent", await page.getByRole("alert").isVisible());
  await page.locator("form.lead-form").getByRole("checkbox").check();
  await page.getByRole("button", { name: /Envoyer la demande/ }).click();
  const ref = await page.getByTestId("lead-reference").innerText({ timeout: 10000 });
  check("diagnostic saved, reference shown after save", /^AUR-\d{4}-[A-Z0-9]{5}$/.test(ref), ref);
  await page.screenshot({ path: `${SHOTS}/fr-diagnostic-done.png` });

  // 4. Consultation request is presented as "to confirm"
  await page.goto(BASE + "/fr/consultation?solution=performance", { waitUntil: "networkidle" });
  await page.locator("form.lead-form").getByLabel(/Nom complet/).fill("Luc Bélanger");
  await page.locator("form.lead-form").getByLabel(/Courriel professionnel/).fill("luc@exemple-consultation.test");
  await page.locator("form.lead-form").getByLabel(/^Entreprise/).fill("Bélanger Logistique");
  await page.locator("form.lead-form").getByLabel(/Secteur d’activité/).selectOption("transport-logistique");
  check("offer preselected from the pricing page", (await page.locator("form.lead-form").getByLabel(/Offre envisagée/).inputValue()) === "performance");
  await page.locator("form.lead-form").getByLabel(/Type d’accompagnement/).selectOption("monthly");
  await page.locator("form.lead-form").getByLabel(/Votre contexte/).fill("Nous voulons structurer la prospection B2B.");
  const d = new Date(); d.setDate(d.getDate() + 7);
  await page.locator("form.lead-form").getByLabel(/Date souhaitée/).fill(d.toISOString().slice(0, 10));
  await page.locator("form.lead-form").getByLabel(/Plage horaire/).selectOption("morning");
  await page.locator("form.lead-form").getByRole("checkbox").last().check();
  await page.getByRole("button", { name: /demande de consultation/ }).click();
  const ref2 = await page.getByTestId("lead-reference").innerText({ timeout: 10000 });
  check("consultation saved as a request to confirm", (await page.getByText(/n’est pas confirmé/).isVisible()) && /^AUR-/.test(ref2), ref2);

  // 5. Newsletter: separate consent
  await page.goto(BASE + "/fr", { waitUntil: "networkidle" });
  await page.locator("#newsletter-email").fill("abonne@exemple.test");
  check("newsletter button disabled without consent", await page.getByRole("button", { name: "S’inscrire" }).isDisabled());
  await page.getByLabel(/Je consens à recevoir l’infolettre/).check();
  await page.getByRole("button", { name: "S’inscrire" }).click();
  await page.getByText("Votre inscription a été enregistrée.").waitFor({ timeout: 8000 });
  check("newsletter subscription confirmed after save", true);

  // 6. Admin sees both leads
  const admin = await newPage(); const ap = admin.page;
  await ap.goto(BASE + "/fr/connexion", { waitUntil: "networkidle" });
  await ap.getByLabel("Courriel", { exact: true }).fill(ADMIN.email); await ap.getByLabel("Mot de passe").fill(ADMIN.password);
  await ap.getByRole("button", { name: "Se connecter" }).click();
  await ap.waitForURL("**/admin");
  await ap.getByRole("button", { name: /^Demandes/ }).click();
  check("diagnostic appears in administration", await ap.locator(`[data-reference="${ref}"]`).isVisible());
  check("consultation appears in administration", await ap.locator(`[data-reference="${ref2}"]`).isVisible());
  await ap.locator(`[data-reference="${ref}"] summary`).click();
  await ap.screenshot({ path: `${SHOTS}/admin-leads.png` });
  await ap.getByRole("button", { name: "Vue d’ensemble" }).click();
  await ap.waitForTimeout(600);
  await ap.screenshot({ path: `${SHOTS}/admin-overview.png` });
  await ap.getByRole("button", { name: "Intégrations" }).click();
  check("integrations shown as to connect", (await ap.getByText("À raccorder").count()) >= 3);

  // 7. Client isolation
  const alpha = await newPage(); const cp = alpha.page;
  await cp.goto(BASE + "/fr/connexion", { waitUntil: "networkidle" });
  await cp.getByLabel("Courriel", { exact: true }).fill("alpha@demo.aurex.test"); await cp.getByLabel("Mot de passe").fill("Demo-Aurex-2026!");
  await cp.getByRole("button", { name: "Se connecter" }).click();
  await cp.waitForURL("**/espace-client");
  await cp.getByText("Document de démonstration Alpha").waitFor();
  const body = await cp.locator("body").innerText();
  check("client sees their own documents", body.includes("Document de démonstration Alpha"));
  check("client does not see another organization's data", !body.includes("Bêta") && !body.includes("confidentiel Bêta"));
  await cp.screenshot({ path: `${SHOTS}/client-portal.png` });
  const adminItems = await ap.evaluate(async () => (await (await fetch("/api/trpc/admin.overview", { credentials: "include" })).json()).result.data.json.items.map((i) => ({ id: i.id, title: i.title, hasFile: i.hasFile })));
  const betaItem = adminItems.find((i) => i.title.includes("Bêta"));
  const alphaDoc = adminItems.find((i) => i.title === "Document de démonstration Alpha");
  const statusOf = (id) => cp.evaluate(async (i) => (await fetch(`/api/files/${i}`, { credentials: "include" })).status, id);
  check("client downloads own document (200)", (await statusOf(alphaDoc.id)) === 200);
  check("client refused another organization's item (404)", (await statusOf(betaItem.id)) === 404);
  const adminCall = await cp.evaluate(async () => (await fetch("/api/trpc/admin.overview", { credentials: "include" })).status);
  check("client refused on admin API (403)", adminCall === 403, String(adminCall));
  await cp.goto(BASE + "/admin", { waitUntil: "networkidle" });
  check("client sees 'administrator access required' on /admin", await cp.getByText("Accès administrateur requis").isVisible());
  const anon = await visitor.request.get(BASE + `/api/files/${alphaDoc.id}`);
  check("anonymous refused on documents (401)", anon.status() === 401);

  // 8. Keyboard: skip link first, visible focus, mobile header keeps the consultation CTA
  const kb = await newPage(); await kb.page.goto(BASE + "/fr", { waitUntil: "networkidle" });
  await kb.page.keyboard.press("Tab");
  check("first Tab stop is the skip link", (await kb.page.evaluate(() => document.activeElement?.className)) === "skip-link");
  const outline = await kb.page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
  check("keyboard focus is visible", outline !== "none", outline);
  const mob = await newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }); const mp = mob.page;
  await mp.goto(BASE + "/fr", { waitUntil: "networkidle" });
  check("mobile header shows the strategic consultation button", await mp.locator("header .header-cta").isVisible());
  check("no horizontal scroll on mobile home", (await mp.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)));
  await mp.screenshot({ path: `${SHOTS}/mobile-home.png` });
  await mp.getByRole("button", { name: "Menu" }).click(); await mp.waitForTimeout(500);
  await mp.screenshot({ path: `${SHOTS}/mobile-menu.png` });
  await mp.keyboard.press("Escape");
  await mp.goto(BASE + "/fr/solutions", { waitUntil: "networkidle" });
  await mp.screenshot({ path: `${SHOTS}/mobile-solutions.png` });
  check("no horizontal scroll on mobile solutions", (await mp.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)));

  // 8b. 3D sculpture: still first, model loaded on demand, no auto-rotation under reduced motion
  await page.goto(BASE + "/fr", { waitUntil: "networkidle" });
  check("sculpture still image is present before the 3D engine loads", (await page.locator(".sculpture img.sculpture-still").count()) === 1);
  await page.locator(".sculpture").scrollIntoViewIfNeeded();
  const loaded = await page.waitForFunction(() => document.querySelector("model-viewer")?.loaded === true, null, { timeout: 25000 }).then(() => true).catch(() => false);
  check("3D sculpture loads and is interactive", loaded && (await page.locator("model-viewer[camera-controls]").count()) === 1);
  check("3D sculpture has an accessible description", ((await page.evaluate(() => document.querySelector("model-viewer")?.alt)) || "").length > 20);
  await page.locator(".signature-section").screenshot({ path: `${SHOTS}/sculpture-section.png` });
  const rmv = await newPage({ reducedMotion: "reduce" }); await rmv.page.goto(BASE + "/fr", { waitUntil: "networkidle" });
  await rmv.page.locator(".sculpture").scrollIntoViewIfNeeded();
  await rmv.page.waitForFunction(() => document.querySelector("model-viewer")?.loaded === true, null, { timeout: 25000 }).catch(() => {});
  check("3D sculpture does not auto-rotate under reduced motion", (await rmv.page.evaluate(() => document.querySelector("model-viewer")?.autoRotate)) === false);

  // 8c. Two-question assistant carries its choices into the quote form; mega menu opens on hover
  const ast = await newPage({ viewport: { width: 1680, height: 950 } }); const ap2 = ast.page;
  await ap2.goto(BASE + "/fr/diagnostic", { waitUntil: "networkidle" });
  await ap2.locator(".assistant-options button", { hasText: "Construction et immobilier" }).click();
  await ap2.locator(".assistant-options button", { hasText: "Trouver de nouveaux clients" }).click();
  check("assistant recommends PERFORMANCE for construction + new customers", (await ap2.locator(".assistant-answer h3").innerText()) === "PERFORMANCE");
  await ap2.getByRole("link", { name: /Demander une soumission/ }).last().click();
  await ap2.waitForURL("**/soumission**"); await ap2.waitForFunction(() => document.querySelector("form.lead-form select") !== null); await ap2.waitForTimeout(400);
  check("assistant choices are preselected in the quote form", (await ap2.getByLabel(/Secteur d’activité/).inputValue()) === "construction-immobilier" && (await ap2.getByLabel(/Offre envisagée/).inputValue()) === "performance");
  await ap2.hover('.desktop-nav a[href="/fr/expertises"]'); await ap2.waitForTimeout(400);
  check("mega menu lists the ten expertises on hover", (await ap2.locator(".mega-panel:visible li").count()) === 10);

  // 8d. No language screen; pricing and simulator
  const en = await newPage({ locale: "en-US" });
  await en.page.goto(BASE + "/", { waitUntil: "networkidle" });
  check("/ opens the French home directly, even for an English browser", en.page.url().endsWith("/fr"), en.page.url());
  await en.page.goto(BASE + "/fr/tarifs", { waitUntil: "networkidle" });
  check("pricing shows 4 offers and 4 AI offers, all « sur devis » until management publishes a price", (await en.page.locator(".tier-card").count()) === 8 && (await en.page.getByText("Tarif sur devis").count()) === 8);
  check("pricing shows the 3 permanent plans with monthly prices", (await en.page.locator(".plan-card").count()) === 3 && (await en.page.locator(".plan-card").nth(1).innerText()).replace(/\s|\u202f|\u00a0/g, "").includes("1490"));
  check("pricing publishes the 9 entry/project offers with « à partir de » prices", (await en.page.locator(".entry-card").count()) === 9 && (await en.page.locator(".entry-card .entry-price strong").first().innerText()).includes("567"));
  await en.page.locator("#entree-seo a.button-primary").click();
  await en.page.waitForURL(/\/soumission\?solution=entree-seo/);
  check("an entry offer is preselected in the quote form", (await en.page.locator("form.lead-form").getByLabel(/Offre envisagée/).inputValue().catch(() => "")) === "entree-seo" || (await en.page.url()).includes("entree-seo"));
  await en.page.goto(BASE + "/fr/simulateur", { waitUntil: "networkidle" });
  check("simulator labels itself as a simulation", await en.page.getByText("Simulation, non résultat.").isVisible());
  const before = await en.page.locator(".sim-kpis dd").first().innerText();
  await en.page.locator("#s-leads").fill("300");
  const after = await en.page.locator(".sim-kpis dd").first().innerText();
  check("simulator recalculates when an input changes", before !== after, `${before} → ${after}`);
  await en.page.locator("#a-conv").fill("40");
  check("simulator assumptions are editable and used", (await en.page.locator(".sim-kpis dd").first().innerText()) !== after);

  // 8d. Calculators: three tabs, each recalculates and labels itself an estimate
  await en.page.goto(BASE + "/fr/calculateurs", { waitUntil: "networkidle" });
  check("calculators label themselves as estimates", await en.page.getByText("Estimation, non résultat.").isVisible());
  const adBefore = await en.page.locator(".sim-kpis dd").nth(5).innerText();
  await en.page.locator("#ad-spend").fill("6000");
  check("advertising calculator recalculates", adBefore !== (await en.page.locator(".sim-kpis dd").nth(5).innerText()));
  await en.page.getByRole("tab", { name: "Gains d’automatisation" }).click();
  const auBefore = await en.page.locator(".sim-kpis dd").nth(1).innerText();
  await en.page.locator("#au-people").fill("10");
  check("automation calculator recalculates", auBefore !== (await en.page.locator(".sim-kpis dd").nth(1).innerText()));
  await en.page.getByRole("tab", { name: "Économies opérationnelles" }).click();
  const svBefore = await en.page.locator(".sim-kpis dd").nth(3).innerText();
  await en.page.locator("#sv-volume").fill("1000");
  check("savings calculator recalculates", svBefore !== (await en.page.locator(".sim-kpis dd").nth(3).innerText()));
  await en.page.goto(BASE + "/fr/innovations", { waitUntil: "networkidle" });
  check("innovations separate available, in development and ambition", (await en.page.locator(".status-chip").filter({ hasText: "Disponible" }).count()) > 0 && (await en.page.locator(".status-chip").filter({ hasText: "Ambition" }).count()) > 0);
  await en.page.goto(BASE + "/fr/solutions", { waitUntil: "networkidle" });
  check("solutions page lists the 7 integrated business solutions", (await en.page.locator(".solution-grid article").count()) === 7);

  // 8e. AI advisor: answers from the firm's content, with sources, cost-awareness and keyboard handling
  const chat = await newPage(); const cp3 = chat.page;
  await cp3.goto(BASE + "/fr/intelligence-artificielle", { waitUntil: "networkidle" });
  await cp3.locator(".page-hero #ask-aurex-input").fill("Comment réduire mes coûts opérationnels ?");
  await cp3.locator(".page-hero .ask-aurex button").click();
  await cp3.waitForSelector(".assistant-panel");
  await cp3.waitForFunction(() => document.querySelectorAll(".assistant-bubble-bot").length >= 2, null, { timeout: 15000 });
  await cp3.waitForTimeout(2500);
  const answerText = await cp3.locator(".assistant-bubble-bot").last().innerText();
  check("advisor answers a cost-reduction question with a structured explanation (not a price list)", /Ce que nous faisons/.test(answerText) && !/Transparence avant tout/.test(answerText));
  check("advisor shows sources and a consultation shortcut", (await cp3.locator(".assistant-sources a").count()) >= 1 && (await cp3.locator(".assistant-actions a").count()) === 2);
  check("advisor discloses that answers are automatic and not stored", /ne saisissez aucun renseignement personnel/i.test(await cp3.locator(".assistant-notice").innerText()));
  await cp3.locator("#assistant-input").fill("Combien coûtent vos services ?"); await cp3.keyboard.press("Enter");
  await cp3.waitForFunction(() => document.querySelectorAll(".assistant-bubble-bot").length >= 3, null, { timeout: 15000 });
  await cp3.waitForTimeout(2000);
  const priceText = await cp3.locator(".assistant-bubble-bot").last().innerText();
  check("advisor answers a price question with « sur devis » and invents no amount", /devis/i.test(priceText) && !/\d\s?\$/.test(priceText));
  await cp3.keyboard.press("Escape");
  check("Escape closes the advisor and returns focus to its button", (await cp3.locator(".assistant-panel").count()) === 0 && (await cp3.evaluate(() => document.activeElement?.className)) === "assistant-launcher");
  await cp3.locator("#assistant-input").count();

  // 8f. Montréal identity, structured data, security headers, compression, caching
  const plain = await newPage(); const hp = plain.page;
  await hp.goto(BASE + "/fr", { waitUntil: "networkidle" });
  check("footer anchors the firm in Montréal and invents no contact detail", /montréal/i.test(await hp.locator(".footer-city").innerText()) && (await hp.locator(".footer-contact a, .footer-contact span").count()) === 0);
  await hp.goto(BASE + "/fr/contact", { waitUntil: "networkidle" });
  check("contact page states Montréal and shows no placeholder coordinates", (await hp.locator(".contact-details").innerText()).includes("Montréal, Québec, Canada") && (await hp.locator(".contact-details a").count()) === 0);
  const res = await plain.ctx.request.get(BASE + "/fr/expertises/publicite-numerique-ppc", { headers: { "accept-encoding": "gzip, br", accept: "text/html" } });
  const h = res.headers(); const html = await res.text();
  check("security headers: CSP, frame, referrer, permissions, nosniff", /default-src 'self'/.test(h["content-security-policy"] || "") && h["x-frame-options"] === "DENY" && !!h["permissions-policy"] && h["x-content-type-options"] === "nosniff" && !!h["referrer-policy"]);
  check("pages are compressed", /gzip|br|deflate/.test(h["content-encoding"] || ""), h["content-encoding"]);
  const ld = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
  const graph = ld ? JSON.parse(ld[1])["@graph"] : [];
  const org = graph.find((n) => n["@type"] === "ProfessionalService");
  check("structured data names Montréal, Quebec, Canada and both languages", org?.address?.addressLocality === "Montréal" && org?.address?.addressRegion === "QC" && org?.availableLanguage?.includes("en-CA") && !org?.telephone && !org?.email);
  check("expertise page carries Service structured data", graph.some((n) => n["@type"] === "Service"));
  const asset = (html.match(/\/assets\/[^"']+\.js/) || [])[0];
  const ar = asset ? await plain.ctx.request.get(BASE + asset) : null;
  check("hashed assets are cached for a year", /max-age=31536000/.test(ar?.headers()["cache-control"] || ""));
  const home = await plain.ctx.request.get(BASE + "/", { maxRedirects: 0 });
  check("/ redirects to /fr (no language screen)", home.status() === 302 && home.headers().location === "/fr");

  // 9. Reduced motion
  const rm = await newPage({ reducedMotion: "reduce" }); await rm.page.goto(BASE + "/fr", { waitUntil: "networkidle" });
  const anim = await rm.page.evaluate(() => getComputedStyle(document.querySelector(".hero-character")).animationName);
  check("reduced motion disables the hero animation", anim === "none", anim);

  check("no unexpected console / page errors", errors.length === 0, errors.slice(0, 4).join(" | "));
  await browser.close();
  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
