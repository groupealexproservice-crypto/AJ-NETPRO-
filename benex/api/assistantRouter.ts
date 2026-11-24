import { z } from "zod";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { analyticsEvents, offerPricing } from "@db/schema";
import { env } from "./lib/env";
import { answer } from "./assistant/engine";

const windows = new Map<string, number[]>();
/** 20 questions per 10 minutes per visitor address, kept in memory only. */
function overLimit(key: string, max = 20, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (windows.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  windows.set(key, recent);
  return recent.length > max;
}

export const assistantRouter = createRouter({
  /** Which mode the conversation advisor runs in: generative model, or answers drawn from the site's own content. */
  status: publicQuery.query(() => ({ mode: env.anthropicKey ? ("ai" as const) : ("knowledge" as const) })),

  /** Conversation content is never stored: only an anonymous counter event is recorded. */
  ask: publicQuery.input(z.object({
    lang: z.enum(["fr", "en"]),
    messages: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().trim().min(1).max(4000) }).refine((m) => m.role === "assistant" || m.content.length <= 800, "A question is limited to 800 characters")).min(1).max(12),
  })).mutation(async ({ ctx, input }) => {
    if (input.messages[input.messages.length - 1].role !== "user") throw new TRPCError({ code: "BAD_REQUEST", message: "The last message must come from the visitor" });
    const ip = ctx.req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
    if (overLimit(ip)) throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Too many questions. Please try again in a few minutes." });
    const db = getDb();
    const published = (await db.select().from(offerPricing).where(eq(offerPricing.published, true))).map((p) => ({ slug: p.slug, priceText: p.priceText, timeline: p.timeline }));
    const result = await answer({ messages: input.messages, lang: input.lang, published, apiKey: env.anthropicKey || undefined, model: env.assistantModel });
    void db.insert(analyticsEvents).values({ name: "assistant_message", path: "/assistant", lang: input.lang }).catch(() => undefined);
    return result;
  }),
});
