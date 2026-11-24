import { and, desc, eq } from "drizzle-orm";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { caseStudies, offerPricing, posts, solutionContent, trustItems } from "@db/schema";
import { integrationStatus } from "./integrations";

export const contentRouter = createRouter({
  solutionOverrides: publicQuery.query(() => getDb().select().from(solutionContent)),
  publishedPosts: publicQuery.query(() => getDb().select().from(posts).where(eq(posts.status, "published")).orderBy(desc(posts.publishedAt))),
  // Only published studies for which the client's permission has been recorded are ever exposed.
  publishedCaseStudies: publicQuery.query(async () => {
    const rows = await getDb().select().from(caseStudies).where(eq(caseStudies.status, "published")).orderBy(desc(caseStudies.publishedAt));
    return rows.filter((row) => row.clientPermission);
  }),
  /** Only prices and timelines the management has published. */
  pricing: publicQuery.query(async () => {
    const rows = await getDb().select().from(offerPricing).where(eq(offerPricing.published, true));
    return rows.map((row) => ({ slug: row.slug, priceText: row.priceText, timeline: row.timeline }));
  }),
  /** Credibility content shown only when it is both verified and published. */
  trust: publicQuery.query(async () => {
    const rows = await getDb().select().from(trustItems).where(and(eq(trustItems.published, true), eq(trustItems.verified, true))).orderBy(desc(trustItems.createdAt));
    return rows;
  }),
  bookingUrl: publicQuery.query(() => ({ url: integrationStatus().calendarUrl })),
});
