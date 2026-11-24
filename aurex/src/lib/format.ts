export const fmtMoney = (value: number, lang: string) => new Intl.NumberFormat(lang === "fr" ? "fr-CA" : "en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(value);
export const fmtNum = (value: number, lang: string, digits = 0) => new Intl.NumberFormat(lang === "fr" ? "fr-CA" : "en-CA", { maximumFractionDigits: digits }).format(value);

