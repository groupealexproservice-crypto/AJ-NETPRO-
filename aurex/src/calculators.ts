/**
 * Pure formulas behind the interactive calculators. Every figure is an estimate computed from the
 * visitor's own inputs and editable assumptions: never a measured or guaranteed result.
 */
const num = (value: number) => (Number.isFinite(value) && value > 0 ? value : 0);
const ratio = (a: number, b: number) => (b > 0 ? a / b : null);

export type AdInputs = { spend: number; cpc: number; conversionRate: number; averageOrder: number; marginRate: number; feeRate: number; fixedFee: number };
export const defaultAdInputs: AdInputs = { spend: 3000, cpc: 2.5, conversionRate: 4, averageOrder: 180, marginRate: 45, feeRate: 15, fixedFee: 0 };

/** Advertising profitability: clicks → orders → revenue → profit after ad spend and management fees. */
export function adProfitability(raw: AdInputs) {
  const spend = num(raw.spend), cpc = num(raw.cpc), conv = Math.min(num(raw.conversionRate), 100) / 100;
  const order = num(raw.averageOrder), margin = Math.min(num(raw.marginRate), 100) / 100;
  const managementCost = spend * (Math.min(num(raw.feeRate), 100) / 100) + num(raw.fixedFee);
  const clicks = cpc > 0 ? spend / cpc : 0;
  const orders = clicks * conv;
  const revenue = orders * order;
  const grossProfit = revenue * margin;
  const totalCost = spend + managementCost;
  const netProfit = grossProfit - totalCost;
  return {
    clicks, orders, revenue, grossProfit, managementCost, totalCost, netProfit,
    roas: ratio(revenue, spend),
    cpa: ratio(spend, orders),
    breakEvenRoas: margin > 0 ? totalCost / spend / margin || null : null,
    breakEvenCpa: order * margin,
  };
}

export type AutomationInputs = { people: number; hoursPerWeek: number; hourlyCost: number; automatedShare: number; monthlyToolCost: number; setupCost: number; horizonMonths: number };
export const defaultAutomationInputs: AutomationInputs = { people: 3, hoursPerWeek: 6, hourlyCost: 38, automatedShare: 50, monthlyToolCost: 150, setupCost: 4000, horizonMonths: 12 };

/** Automation gains: hours freed, value of the time, net of tool costs, payback and return over the horizon. */
export function automationGains(raw: AutomationInputs) {
  const monthlyHours = num(raw.people) * num(raw.hoursPerWeek) * (52 / 12);
  const hoursSaved = monthlyHours * (Math.min(num(raw.automatedShare), 100) / 100);
  const grossSavings = hoursSaved * num(raw.hourlyCost);
  const netMonthly = grossSavings - num(raw.monthlyToolCost);
  const horizon = Math.max(1, Math.round(num(raw.horizonMonths)) || 12);
  const invested = num(raw.setupCost);
  const netTotal = netMonthly * horizon - invested;
  return {
    monthlyHours, hoursSaved, grossSavings, netMonthly, horizon, netTotal,
    paybackMonths: netMonthly > 0 && invested > 0 ? invested / netMonthly : null,
    roi: invested > 0 ? netTotal / invested : null,
  };
}

export type SavingsInputs = { monthlyVolume: number; costPerUnit: number; costReduction: number; errorRate: number; errorCost: number; errorReduction: number; investment: number; horizonMonths: number };
export const defaultSavingsInputs: SavingsInputs = { monthlyVolume: 400, costPerUnit: 22, costReduction: 15, errorRate: 6, errorCost: 85, errorReduction: 40, investment: 6000, horizonMonths: 12 };

/** Operational savings: lower unit cost of a process plus fewer errors and rework, against the investment. */
export function operationalSavings(raw: SavingsInputs) {
  const volume = num(raw.monthlyVolume);
  const processSavings = volume * num(raw.costPerUnit) * (Math.min(num(raw.costReduction), 100) / 100);
  const errorsToday = volume * (Math.min(num(raw.errorRate), 100) / 100);
  const errorsAvoided = errorsToday * (Math.min(num(raw.errorReduction), 100) / 100);
  const errorSavings = errorsAvoided * num(raw.errorCost);
  const monthlySavings = processSavings + errorSavings;
  const horizon = Math.max(1, Math.round(num(raw.horizonMonths)) || 12);
  const invested = num(raw.investment);
  return {
    processSavings, errorsToday, errorsAvoided, errorSavings, monthlySavings, horizon,
    annualSavings: monthlySavings * 12,
    netTotal: monthlySavings * horizon - invested,
    paybackMonths: monthlySavings > 0 && invested > 0 ? invested / monthlySavings : null,
    roi: invested > 0 ? (monthlySavings * horizon - invested) / invested : null,
  };
}
