/** Form edge cases in a real browser: invalid input and a failed send (network cut, server error). */
const { chromium } = require("playwright");
const BASE = process.env.BASE_URL || "http://127.0.0.1:3100";
const results = []; const check = (n, ok, d = "") => { results.push(ok); console.log(`${ok ? "PASS" : "FAIL"}  ${n}${d ? " — " + d : ""}`); };
(async () => {
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  await page.goto(BASE + "/fr/consultation", { waitUntil: "networkidle" });
  const form = page.locator("form.lead-form");
  await form.getByLabel(/Nom complet/).fill("Test Invalide");
  await form.getByLabel(/Courriel professionnel/).fill("pas-un-courriel");
  await form.getByLabel(/^Entreprise/).fill("Société Test");
  await form.getByLabel(/Secteur d’activité/).selectOption({ index: 1 });
  await form.getByLabel(/Votre contexte/).fill("Contexte de test pour la validation.");
  await form.getByRole("checkbox").last().check();
  await page.getByRole("button", { name: /demande de consultation/ }).click();
  await page.waitForTimeout(800);
  const invalid = await form.getByLabel(/Courriel professionnel/).evaluate((el) => !el.validity.valid || el.getAttribute("aria-invalid") === "true");
  const sentInvalid = await page.getByTestId("lead-reference").count();
  check("invalid e-mail is refused, nothing is saved", invalid && sentInvalid === 0);

  // Failed send: the server cannot be reached -> a clear message, entered data kept, no blank page.
  await form.getByLabel(/Courriel professionnel/).fill("test@exemple.test");
  const d = new Date(); d.setDate(d.getDate() + 7);
  await form.getByLabel(/Date souhaitée/).fill(d.toISOString().slice(0, 10)).catch(() => {});
  await form.getByLabel(/Plage horaire/).selectOption({ index: 1 }).catch(() => {});
  await form.getByLabel(/Type d’accompagnement/).selectOption({ index: 1 }).catch(() => {});
  await page.route("**/api/trpc/**", (r) => r.request().method() === "POST" ? r.abort("failed") : r.continue());
  await page.getByRole("button", { name: /demande de consultation/ }).click();
  await page.waitForTimeout(2500);
  const text = await page.locator("body").innerText();
  const msg = await page.getByRole("alert").first().innerText().catch(() => "");
  check("failed send shows a clear send-failure message (not a field error)", msg.length > 0 && !/champ est requis/i.test(msg) && !(await page.getByTestId("lead-reference").count()), msg.slice(0, 120));
  check("entered data is kept after a failed send", (await form.getByLabel(/Nom complet/).inputValue()) === "Test Invalide");
  check("page not blank after failure", text.length > 300);
  await browser.close();
  const failed = results.filter((r) => !r).length;
  console.log(`\n${results.length - failed}/${results.length} form checks passed`); process.exit(failed ? 1 : 0);
})();
