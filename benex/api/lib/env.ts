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
