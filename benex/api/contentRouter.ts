import { desc, eq } from "drizzle-orm";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { caseStudies, posts, solutionContent } from "@db/schema";
import { integrationStatus } from "./integrations";

export const contentRouter = createRouter({
  solutionOverrides: publicQuery.query(() => getDb().select().from(solutionContent)),
  publishedPosts: publicQuery.query(() => getDb().select().from(posts).where(eq(posts.status, "published")).orderBy(desc(posts.publishedAt))),
  // Only published studies for which the client's permission has been recorded are ever exposed.
  publishedCaseStudies: publicQuery.query(async () => {
    const rows = await getDb().select().from(caseStudies).where(eq(caseStudies.status, "published")).orderBy(desc(caseStudies.publishedAt));
    return rows.filter((row) => row.clientPermission);
  }),
  bookingUrl: publicQuery.query(() => ({ url: integrationStatus().calendarUrl })),
});
