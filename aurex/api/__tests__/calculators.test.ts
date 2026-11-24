import { describe, expect, it } from "vitest";
import { adProfitability, automationGains, defaultAdInputs, defaultAutomationInputs, defaultSavingsInputs, operationalSavings } from "../../src/calculators";

describe("advertising profitability", () => {
  it("follows the documented chain from spend to net profit", () => {
    const r = adProfitability({ spend: 1000, cpc: 2, conversionRate: 5, averageOrder: 100, marginRate: 50, feeRate: 10, fixedFee: 100 });
    expect(r.clicks).toBe(500);
    expect(r.orders).toBe(25);
    expect(r.revenue).toBe(2500);
    expect(r.grossProfit).toBe(1250);
    expect(r.managementCost).toBe(200);
    expect(r.netProfit).toBe(1250 - 1200);
    expect(r.roas).toBe(2.5);
    expect(r.cpa).toBe(40);
    expect(r.breakEvenRoas).toBeCloseTo(2.4, 5);
  });
  it("never returns NaN or Infinity on empty or invalid inputs", () => {
    const r = adProfitability({ ...defaultAdInputs, spend: 0, cpc: Number.NaN, conversionRate: -3 });
    for (const value of [r.clicks, r.orders, r.revenue, r.netProfit]) expect(Number.isFinite(value)).toBe(true);
    expect(r.roas).toBeNull();
    expect(r.cpa).toBeNull();
  });
});

describe("automation gains", () => {
  it("converts freed hours into net monthly value, payback and return", () => {
    const r = automationGains({ people: 2, hoursPerWeek: 6, hourlyCost: 40, automatedShare: 50, monthlyToolCost: 100, setupCost: 3000, horizonMonths: 12 });
    expect(r.monthlyHours).toBeCloseTo(2 * 6 * 52 / 12, 5);
    expect(r.hoursSaved).toBeCloseTo(26, 5);
    expect(r.grossSavings).toBeCloseTo(1040, 5);
    expect(r.netMonthly).toBeCloseTo(940, 5);
    expect(r.paybackMonths).toBeCloseTo(3000 / 940, 5);
    expect(r.roi).toBeCloseTo((940 * 12 - 3000) / 3000, 5);
  });
  it("gives no payback when tools cost more than the time they free", () => {
    const r = automationGains({ ...defaultAutomationInputs, automatedShare: 0 });
    expect(r.paybackMonths).toBeNull();
    expect(r.netMonthly).toBeLessThan(0);
  });
});

describe("operational savings", () => {
  it("adds process savings and avoided errors", () => {
    const r = operationalSavings({ monthlyVolume: 100, costPerUnit: 20, costReduction: 10, errorRate: 10, errorCost: 50, errorReduction: 50, investment: 1000, horizonMonths: 6 });
    expect(r.processSavings).toBe(200);
    expect(r.errorsAvoided).toBe(5);
    expect(r.errorSavings).toBe(250);
    expect(r.monthlySavings).toBe(450);
    expect(r.netTotal).toBe(450 * 6 - 1000);
    expect(r.paybackMonths).toBeCloseTo(1000 / 450, 5);
  });
  it("caps percentages and handles defaults without NaN", () => {
    const r = operationalSavings({ ...defaultSavingsInputs, costReduction: 900, errorReduction: 900 });
    expect(Number.isFinite(r.monthlySavings)).toBe(true);
    expect(r.processSavings).toBe(defaultSavingsInputs.monthlyVolume * defaultSavingsInputs.costPerUnit);
  });
});

import { entryOffers, aiTiers, plans, tiers, packs, serviceDomains, expertises } from "../../src/content";
describe("published entry offers", () => {
  it("have unique slugs, positive prices and a defined scope", () => {
    const slugs = entryOffers.map((o) => o.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.some((s) => [...tiers, ...aiTiers].some((t) => t.slug === s))).toBe(false);
    for (const o of entryOffers) {
      expect(o.price).toBeGreaterThan(0);
      expect(o.scope.fr.length).toBeGreaterThan(0);
      expect(o.scope.fr.length).toBe(o.scope.en.length);
      if (o.upgrade) expect(o.upgrade.price).toBeGreaterThan(o.price);
    }
  });
  it("includes the management-approved entry prices", () => {
    const price = (slug: string) => entryOffers.find((o) => o.slug === slug)?.price;
    expect([price("entree-seo"), price("entree-reseaux"), price("entree-ads"), price("entree-site"), price("entree-automatisation"), price("entree-assistant"), price("entree-diagnostic")]).toEqual([239, 365, 449, 469, 990, 1190, 567]);
  });
});

describe("permanent plans", () => {
  // Internal working-hour estimates (never shown on the site) used to check margins at 55 $/h.
  const internalHours: Record<string, number> = { "plan-essentiel": 1.2, "plan-croissance": 3.4, "plan-developpement": 6.2, "plan-partenaire": 17.4 };
  it("start at 100, 300, 500 and 1 500 $ per month, with a lower yearly rate", () => {
    expect(plans.map((p) => p.monthly)).toEqual([100, 300, 500, 1500]);
    for (const p of plans) { expect(p.yearly).toBeLessThan(p.monthly); expect(p.includes.fr.length).toBe(p.includes.en.length); expect(p.excludes.fr.length).toBeGreaterThan(0); expect(p.options.fr.length).toBe(p.options.en.length); }
  });
  it("keep a gross margin of at least 30 % at 55 $/h on the monthly price", () => {
    for (const p of plans) expect((p.monthly - internalHours[p.slug] * 55) / p.monthly).toBeGreaterThanOrEqual(0.3);
  });
  it("show no working hours in published data", () => {
    expect(JSON.stringify(plans)).not.toMatch(/"hours"|heures de travail/i);
  });
  it("offer the free basic site only from CROISSANCE upward", () => {
    expect(plans.filter((p) => p.siteOffer).map((p) => p.slug)).toEqual(["plan-croissance", "plan-developpement", "plan-partenaire"]);
  });
  it("do not reuse slugs of other offers", () => {
    const others = new Set([...tiers, ...aiTiers, ...entryOffers].map((o) => o.slug));
    for (const p of plans) expect(others.has(p.slug)).toBe(false);
  });
});

describe("domains and packs", () => {
  it("present six domains that point to existing expertise pages", () => {
    expect(serviceDomains).toHaveLength(6);
    for (const d of serviceDomains) for (const slug of d.expertises) expect(expertises.some((e) => e.slug === slug)).toBe(true);
    const covered = new Set(serviceDomains.flatMap((d) => d.expertises));
    for (const e of expertises) expect(covered.has(e.slug)).toBe(true);
  });
  it("define six packs with unique slugs, not overlapping other offers", () => {
    expect(packs.map((p) => p.name)).toEqual(["Pack Lancement", "Pack Acquisition", "Pack Croissance", "Pack Opérations", "Pack Automatisation IA", "Partenaire AUREX"]);
    const others = new Set([...tiers, ...aiTiers, ...entryOffers, ...plans].map((o) => o.slug));
    for (const p of packs) { expect(others.has(p.slug)).toBe(false); expect(p.services.fr.length).toBe(p.services.en.length); }
  });
  it("starts the launch pack at the sum of the published services it combines", () => {
    const price = (slug: string) => entryOffers.find((o) => o.slug === slug)!.price;
    expect(price("entree-diagnostic") + price("entree-identite") + price("entree-site")).toBe(1726);
    expect(price("entree-campagne") + 469).toBe(919);
  });
});
