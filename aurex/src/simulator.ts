/**
 * Profitability simulator: pure arithmetic on the visitor's own inputs and editable assumptions.
 * It estimates potential, it does not predict or promise results.
 */
export type SimInputs = {
  monthlyRevenue: number;       // CAD
  marketingBudget: number;      // CAD per month
  monthlyLeads: number;         // prospects per month
  conversionRate: number;       // % of prospects who buy
  averageSale: number;          // CAD per sale
  operatingExpenses: number;    // CAD per month
  repetitiveHours: number;      // hours per month spent on repetitive tasks
  hourlyCost: number;           // CAD per hour (assumption)
  investment: number;           // CAD, one-off cost of the engagement (entered by the visitor)
  horizonMonths: number;
};

export type Scenario = {
  key: "prudent" | "moderate" | "ambitious";
  conversionUplift: number;     // % relative improvement of the conversion rate
  leadsUplift: number;          // % relative increase in prospects
  opexReduction: number;        // % of operating expenses saved
  automationShare: number;      // % of repetitive hours automated
};

export const defaultInputs: SimInputs = {
  monthlyRevenue: 40000, marketingBudget: 3000, monthlyLeads: 120, conversionRate: 8, averageSale: 1200,
  operatingExpenses: 28000, repetitiveHours: 60, hourlyCost: 40, investment: 15000, horizonMonths: 12,
};

/** Illustrative starting assumptions. The visitor is expected to replace them with their own. */
export const defaultScenarios: Scenario[] = [
  { key: "prudent", conversionUplift: 5, leadsUplift: 5, opexReduction: 2, automationShare: 20 },
  { key: "moderate", conversionUplift: 12, leadsUplift: 12, opexReduction: 5, automationShare: 35 },
  { key: "ambitious", conversionUplift: 25, leadsUplift: 25, opexReduction: 10, automationShare: 55 },
];

export type SimResult = {
  key: Scenario["key"];
  extraRevenue: number;          // CAD / month
  opexSavings: number;           // CAD / month
  hoursSaved: number;            // hours / month
  hoursValue: number;            // CAD / month (time saved valued at the hourly cost)
  monthlyGain: number;           // CAD / month, revenue + savings + time value
  totalGain: number;             // over the horizon
  roi: number | null;            // (gain - investment) / investment, as a ratio; null if no investment
  paybackMonths: number | null;  // null if the gain is zero or no investment
  cumulative: number[];          // net position per month (gain so far minus investment)
};

const clamp = (n: number, min = 0, max = Number.POSITIVE_INFINITY) => (Number.isFinite(n) ? Math.min(Math.max(n, min), max) : 0);

export function simulate(raw: SimInputs, scenario: Scenario): SimResult {
  const i: SimInputs = {
    monthlyRevenue: clamp(raw.monthlyRevenue), marketingBudget: clamp(raw.marketingBudget), monthlyLeads: clamp(raw.monthlyLeads),
    conversionRate: clamp(raw.conversionRate, 0, 100), averageSale: clamp(raw.averageSale), operatingExpenses: clamp(raw.operatingExpenses),
    repetitiveHours: clamp(raw.repetitiveHours), hourlyCost: clamp(raw.hourlyCost), investment: clamp(raw.investment), horizonMonths: clamp(Math.round(raw.horizonMonths), 1, 60),
  };
  const baseSales = i.monthlyLeads * (i.conversionRate / 100);
  const newConversion = Math.min(100, i.conversionRate * (1 + scenario.conversionUplift / 100));
  const newSales = i.monthlyLeads * (1 + scenario.leadsUplift / 100) * (newConversion / 100);
  const extraRevenue = Math.max(0, (newSales - baseSales) * i.averageSale);
  const opexSavings = i.operatingExpenses * (scenario.opexReduction / 100);
  const hoursSaved = i.repetitiveHours * (scenario.automationShare / 100);
  const hoursValue = hoursSaved * i.hourlyCost;
  const monthlyGain = extraRevenue + opexSavings + hoursValue;
  const totalGain = monthlyGain * i.horizonMonths;
  const roi = i.investment > 0 ? (totalGain - i.investment) / i.investment : null;
  const paybackMonths = i.investment > 0 && monthlyGain > 0 ? i.investment / monthlyGain : null;
  const cumulative = Array.from({ length: i.horizonMonths }, (_, m) => monthlyGain * (m + 1) - i.investment);
  return { key: scenario.key, extraRevenue, opexSavings, hoursSaved, hoursValue, monthlyGain, totalGain, roi, paybackMonths, cumulative };
}

/** Rough sanity warnings so a visitor does not read nonsense out of nonsense inputs. */
export function inputWarnings(i: SimInputs): Array<"leads-sales" | "revenue-low" | "expenses-high"> {
  const warnings: Array<"leads-sales" | "revenue-low" | "expenses-high"> = [];
  const impliedSales = i.monthlyLeads * (i.conversionRate / 100) * i.averageSale;
  if (i.monthlyRevenue > 0 && impliedSales > 0 && (impliedSales > i.monthlyRevenue * 1.5 || impliedSales < i.monthlyRevenue * 0.2)) warnings.push("leads-sales");
  if (i.operatingExpenses > i.monthlyRevenue && i.monthlyRevenue > 0) warnings.push("expenses-high");
  return warnings;
}
