import { describe, expect, it } from "vitest";
import { defaultInputs, defaultScenarios, inputWarnings, simulate } from "../../src/simulator";

const moderate = defaultScenarios[1];

describe("profitability simulator", () => {
  it("computes the documented formulas from the inputs", () => {
    const input = { ...defaultInputs, monthlyLeads: 100, conversionRate: 10, averageSale: 1000, operatingExpenses: 10000, repetitiveHours: 50, hourlyCost: 40, investment: 12000, horizonMonths: 12 };
    const r = simulate(input, { key: "moderate", conversionUplift: 10, leadsUplift: 10, opexReduction: 5, automationShare: 40 });
    // sales: 100 × 10% = 10 → 110 × 11% = 12.1; extra = 2.1 × 1000
    expect(r.extraRevenue).toBeCloseTo(2100, 5);
    expect(r.opexSavings).toBeCloseTo(500, 5);
    expect(r.hoursSaved).toBeCloseTo(20, 5);
    expect(r.monthlyGain).toBeCloseTo(2100 + 500 + 800, 5);
    expect(r.totalGain).toBeCloseTo(3400 * 12, 5);
    expect(r.roi).toBeCloseTo((3400 * 12 - 12000) / 12000, 5);
    expect(r.paybackMonths).toBeCloseTo(12000 / 3400, 5);
    expect(r.cumulative).toHaveLength(12);
    expect(r.cumulative[0]).toBeCloseTo(3400 - 12000, 5);
  });

  it("orders the three scenarios from cautious to ambitious", () => {
    const [a, b, c] = defaultScenarios.map((s) => simulate(defaultInputs, s).monthlyGain);
    expect(a).toBeLessThan(b);
    expect(b).toBeLessThan(c);
  });

  it("never returns NaN, negative gains or a ROI without an investment", () => {
    const r = simulate({ ...defaultInputs, monthlyLeads: -5, conversionRate: Number.NaN, investment: 0 }, moderate);
    expect(Number.isFinite(r.monthlyGain)).toBe(true);
    expect(r.extraRevenue).toBeGreaterThanOrEqual(0);
    expect(r.roi).toBeNull();
    expect(r.paybackMonths).toBeNull();
  });

  it("caps the improved conversion rate at 100 %", () => {
    const r = simulate({ ...defaultInputs, conversionRate: 90 }, { ...moderate, conversionUplift: 500 });
    expect(r.extraRevenue).toBeLessThanOrEqual(defaultInputs.monthlyLeads * 2 * defaultInputs.averageSale);
  });

  it("warns when revenue and funnel data disagree", () => {
    expect(inputWarnings({ ...defaultInputs, monthlyRevenue: 1000 })).toContain("leads-sales");
    expect(inputWarnings({ ...defaultInputs, monthlyRevenue: 40000, monthlyLeads: 100, conversionRate: 10, averageSale: 4000 })).not.toContain("leads-sales");
  });
});
