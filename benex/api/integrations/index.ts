import { createHmac } from "node:crypto";
import { integrationEvents } from "@db/schema";
import { env } from "../lib/env";
import { log } from "../lib/logger";
import { getDb } from "../queries/connection";

/**
 * Integration points. Each channel posts a signed JSON webhook when its URL is configured.
 * Without configuration nothing leaves the server and the attempt is recorded as "not_configured",
 * so the administration screen shows exactly what remains to be connected.
 *
 * Channels: crm (leads), notify (internal alerts: e-mail/Slack relay), marketing (newsletter list).
 * The calendar channel is a booking URL shown to the team; appointments stay "requests to confirm".
 */
export type Channel = "crm" | "notify" | "marketing";

const targets: Record<Channel, () => { url: string; secret: string }> = {
  crm: () => ({ url: env.integrations.crmWebhookUrl, secret: env.integrations.crmWebhookSecret }),
  notify: () => ({ url: env.integrations.notifyWebhookUrl, secret: env.integrations.notifyWebhookSecret }),
  marketing: () => ({ url: env.integrations.marketingWebhookUrl, secret: env.integrations.marketingWebhookSecret }),
};

export function integrationStatus() {
  return {
    crm: Boolean(env.integrations.crmWebhookUrl),
    notify: Boolean(env.integrations.notifyWebhookUrl),
    marketing: Boolean(env.integrations.marketingWebhookUrl),
    calendar: Boolean(env.integrations.calendarBookingUrl),
    calendarUrl: env.integrations.calendarBookingUrl || null,
  };
}

export async function emit(channel: Channel, event: string, refId: string, payload: Record<string, unknown>) {
  const { url, secret } = targets[channel]();
  const record = (status: "not_configured" | "delivered" | "failed", detail?: string) =>
    getDb().insert(integrationEvents).values({ channel, event, refId, status, detail: detail?.slice(0, 500) }).catch((error) => log.error("integration log failed", { error: String(error) }));

  if (!url) return record("not_configured");
  try {
    const body = JSON.stringify({ event, ref: refId, sentAt: new Date().toISOString(), data: payload });
    const signature = secret ? createHmac("sha256", secret).update(body).digest("hex") : "";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Benex-Event": event, "X-Benex-Signature": signature },
      body,
      signal: AbortSignal.timeout(8000),
    });
    return record(response.ok ? "delivered" : "failed", `HTTP ${response.status}`);
  } catch (error) {
    return record("failed", error instanceof Error ? error.message : String(error));
  }
}
