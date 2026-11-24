import { z } from "zod";
import { and, desc, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createRouter, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { clientItems, notifications, organizations, projects } from "@db/schema";
import { emit } from "./integrations";

/** Every portal query is scoped to the caller's organization, resolved server-side from the session. */
function organizationOf(user: { organizationId: number | null }): number {
  if (!user.organizationId) throw new TRPCError({ code: "FORBIDDEN", message: "No organization is linked to this account" });
  return user.organizationId;
}

export const clientRouter = createRouter({
  overview: authedQuery.query(async ({ ctx }) => {
    const organizationId = organizationOf(ctx.user);
    const db = getDb();
    const [org] = await db.select().from(organizations).where(eq(organizations.id, organizationId)).limit(1);
    const [projectRows, itemRows] = await Promise.all([
      db.select().from(projects).where(eq(projects.organizationId, organizationId)).orderBy(desc(projects.updatedAt)),
      db.select().from(clientItems).where(eq(clientItems.organizationId, organizationId)).orderBy(desc(clientItems.createdAt)),
    ]);
    return {
      organization: org?.name ?? "",
      projects: projectRows,
      // File storage keys never leave the server: documents are fetched through /api/files/:id.
      items: itemRows.map(({ fileKey, ...item }) => ({ ...item, hasFile: Boolean(fileKey) })),
    };
  }),
  sendMessage: authedQuery.input(z.object({
    projectId: z.number().int().positive().optional(),
    title: z.string().trim().min(2).max(255),
    body: z.string().trim().min(2).max(8000),
  })).mutation(async ({ ctx, input }) => {
    const organizationId = organizationOf(ctx.user);
    const db = getDb();
    if (input.projectId) {
      const [project] = await db.select({ id: projects.id }).from(projects).where(and(eq(projects.id, input.projectId), eq(projects.organizationId, organizationId))).limit(1);
      if (!project) throw new TRPCError({ code: "FORBIDDEN", message: "Project not found" });
    }
    const [{ id }] = await db.insert(clientItems).values({
      organizationId, projectId: input.projectId ?? null, type: "message", title: input.title, body: input.body,
      author: "client", authorUserId: ctx.user.id,
    }).$returningId();
    await db.insert(notifications).values({ message: `Message client · ${ctx.user.name} (${ctx.user.email})` });
    void emit("notify", "client.message", String(id), { organizationId, from: ctx.user.email });
    return { id };
  }),
});
