import { authRouter } from "./auth-router";
import { createRouter, publicQuery } from "./middleware";
import { leadsRouter } from "./leadsRouter";
import { contentRouter } from "./contentRouter";
import { clientRouter } from "./clientRouter";
import { adminRouter } from "./adminRouter";
import { analyticsRouter } from "./analyticsRouter";
import { assistantRouter } from "./assistantRouter";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  leads: leadsRouter,
  content: contentRouter,
  portal: clientRouter,
  admin: adminRouter,
  analytics: analyticsRouter,
  assistant: assistantRouter,
});

export type AppRouter = typeof appRouter;
