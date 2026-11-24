import "dotenv/config";

const isProduction = process.env.NODE_ENV === "production";

function required(name: string): string {
  const value = process.env[name];
  if (!value && isProduction) throw new Error(`Missing required environment variable: ${name}`);
  return value ?? "";
}

const appSecret = required("APP_SECRET") || "dev-only-secret-change-me-dev-only-secret";
if (isProduction && appSecret.length < 32) throw new Error("APP_SECRET must contain at least 32 characters");

export const env = {
  isProduction,
  appSecret,
  databaseUrl: required("DATABASE_URL"),
  publicUrl: (process.env.PUBLIC_URL ?? "").replace(/\/$/, ""),
  uploadDir: process.env.UPLOAD_DIR ?? "./storage/uploads",
  adminEmail: (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase(),
  adminPassword: process.env.ADMIN_PASSWORD ?? "",
  /** Public company details. Shown only when set: nothing is invented. */
  company: {
    email: (process.env.COMPANY_EMAIL ?? "").trim(),
    phone: (process.env.COMPANY_PHONE ?? "").trim(),
    street: (process.env.COMPANY_STREET ?? "").trim(),
    postalCode: (process.env.COMPANY_POSTAL_CODE ?? "").trim(),
    linkedin: (process.env.COMPANY_LINKEDIN_URL ?? "").trim(),
    privacyOfficerName: (process.env.PRIVACY_OFFICER_NAME ?? "").trim(),
    privacyOfficerEmail: (process.env.PRIVACY_OFFICER_EMAIL ?? "").trim(),
    legalName: (process.env.COMPANY_LEGAL_NAME ?? "").trim(),
    neq: (process.env.COMPANY_NEQ ?? "").trim(),
  },
  anthropicKey: process.env.ANTHROPIC_API_KEY ?? "",
  assistantModel: process.env.ASSISTANT_MODEL ?? "claude-sonnet-5-5",
  maxUploadMb: Number(process.env.MAX_UPLOAD_MB ?? 15),
  integrations: {
    crmWebhookUrl: process.env.CRM_WEBHOOK_URL ?? "",
    crmWebhookSecret: process.env.CRM_WEBHOOK_SECRET ?? "",
    notifyWebhookUrl: process.env.NOTIFY_WEBHOOK_URL ?? "",
    notifyWebhookSecret: process.env.NOTIFY_WEBHOOK_SECRET ?? "",
    calendarBookingUrl: process.env.CALENDAR_BOOKING_URL ?? "",
    marketingWebhookUrl: process.env.MARKETING_WEBHOOK_URL ?? "",
    marketingWebhookSecret: process.env.MARKETING_WEBHOOK_SECRET ?? "",
  },
};
