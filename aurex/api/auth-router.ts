import { z } from "zod";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { organizations, users } from "@db/schema";
import { hashPassword, passwordProblem, verifyPassword } from "./auth/password";
import { clearLoginFailures, clearedSessionCookie, loginThrottled, recordLoginFailure, sessionCookie, signSession } from "./auth/session";

// Verified when the account does not exist, so unknown accounts cost the same time as wrong passwords.
const DUMMY_HASH = hashPassword("not-a-real-password-0000");

export const authRouter = createRouter({
  me: publicQuery.query(async ({ ctx }) => {
    if (!ctx.user) return null;
    let organization: string | null = null;
    if (ctx.user.organizationId) {
      const [org] = await getDb().select().from(organizations).where(eq(organizations.id, ctx.user.organizationId)).limit(1);
      organization = org?.name ?? null;
    }
    return { id: ctx.user.id, name: ctx.user.name, email: ctx.user.email, role: ctx.user.role, organization };
  }),
  login: publicQuery
    .input(z.object({ email: z.string().trim().toLowerCase().pipe(z.email().max(320)), password: z.string().min(1).max(200) }))
    .mutation(async ({ ctx, input }) => {
      const ip = ctx.req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
      const key = `${ip}|${input.email}`;
      if (loginThrottled(key)) throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Too many attempts. Try again later." });
      const [user] = await getDb().select().from(users).where(eq(users.email, input.email)).limit(1);
      const ok = verifyPassword(input.password, user?.passwordHash ?? DUMMY_HASH);
      if (!user || !ok || !user.active) {
        recordLoginFailure(key);
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid credentials" });
      }
      clearLoginFailures(key);
      await getDb().update(users).set({ lastSignInAt: new Date() }).where(eq(users.id, user.id));
      ctx.resHeaders.append("set-cookie", sessionCookie(await signSession(user.id)));
      return { role: user.role };
    }),
  logout: publicQuery.mutation(({ ctx }) => {
    ctx.resHeaders.append("set-cookie", clearedSessionCookie());
    return { success: true };
  }),
  changePassword: authedQuery
    .input(z.object({ current: z.string().max(200), next: z.string().max(200) }))
    .mutation(async ({ ctx, input }) => {
      if (!verifyPassword(input.current, ctx.user.passwordHash)) throw new TRPCError({ code: "UNAUTHORIZED", message: "Current password is incorrect" });
      const problem = passwordProblem(input.next);
      if (problem) throw new TRPCError({ code: "BAD_REQUEST", message: problem });
      await getDb().update(users).set({ passwordHash: hashPassword(input.next) }).where(eq(users.id, ctx.user.id));
      return { ok: true };
    }),
});
