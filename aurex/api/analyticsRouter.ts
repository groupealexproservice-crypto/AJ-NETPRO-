import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { analyticsEvents } from "@db/schema";

export const trackedEvents = ["page_view", "simulator_run", "form_started", "cta_consultation", "cta_quote", "assistant_completed"] as const;

const hits = new Map<string, { count: number; start: number }>();
function limited(key: string) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now - entry.start > 60_000) { hits.set(key, { count: 1, start: now }); return false; }
  entry.count += 1;
  return entry.count > 90;
}

export const analyticsRouter = createRouter({
  /** Records one anonymous event. Nothing identifying is stored: no IP address, cookie or user agent. */
  track: publicQuery.input(z.object({
    name: z.enum(trackedEvents),
    path: z.string().max(200).regex(/^\/[A-Za-z0-9\-_/]*$/),
    lang: z.enum(["fr", "en"]),
  })).mutation(async ({ ctx, input }) => {
    const ip = ctx.req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
    if (limited(ip)) return { ok: false };
    await getDb().insert(analyticsEvents).values(input);
    return { ok: true };
  }),
});
