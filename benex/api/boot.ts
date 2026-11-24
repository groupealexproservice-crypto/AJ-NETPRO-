import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import type { HttpBindings } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";
import { createContext } from "./context";
import { env } from "./lib/env";
import { log } from "./lib/logger";
import { REQUEST_ID_HEADER, runWithRequestId } from "./lib/requestcontext";
import { seoRoutes } from "./routes/seo";
import { fileRoutes } from "./routes/files";
import { ensureAdmin } from "./bootstrap";

const app = new Hono<{ Bindings: HttpBindings }>();

// Request id + one access line per API call.
app.use("*", async (c, next) => {
  const requestId = crypto.randomUUID();
  const start = Date.now();
  await runWithRequestId(requestId, async () => {
    await next();
    c.res.headers.set(REQUEST_ID_HEADER, requestId);
    c.res.headers.set("X-Content-Type-Options", "nosniff");
    c.res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    c.res.headers.set("X-Frame-Options", "DENY");
    if (c.req.path.startsWith("/api/")) {
      log.info("request", { method: c.req.method, path: c.req.path, status: c.res.status, durationMs: Date.now() - start });
    }
  });
});

// Cross-site writes are refused: when the browser sends an Origin, its host must be ours.
app.use("/api/*", async (c, next) => {
  if (["POST", "PUT", "PATCH", "DELETE"].includes(c.req.method)) {
    const origin = c.req.header("origin");
    if (origin) {
      const allowed = new Set([c.req.header("host"), c.req.header("x-forwarded-host")].filter(Boolean));
      if (env.publicUrl) allowed.add(new URL(env.publicUrl).host);
      let host = "";
      try { host = new URL(origin).host; } catch { /* malformed */ }
      if (!allowed.has(host)) return c.json({ error: "Forbidden origin" }, 403);
    }
  }
  await next();
});

app.use("/api/trpc/*", bodyLimit({ maxSize: 1024 * 1024 }));
app.use("/api/trpc/*", async (c) =>
  fetchRequestHandler({ endpoint: "/api/trpc", req: c.req.raw, router: appRouter, createContext }),
);
app.route("/", fileRoutes);
app.route("/", seoRoutes);
app.get("/api/health", (c) => c.json({ ok: true }));
app.all("/api/*", (c) => c.json({ error: "Not Found" }, 404));

// "/" leads to the visitor's language: the same equivalent-page logic as the language switcher.
app.get("/", (c) => {
  const preferred = (c.req.header("accept-language") ?? "").toLowerCase();
  return c.redirect(preferred.startsWith("en") ? "/en" : "/fr", 302);
});

app.onError((err, c) => {
  log.error("unhandled request error", {
    method: c.req.method, path: c.req.path,
    error: err instanceof Error ? err.message : String(err),
    stack: err instanceof Error ? err.stack : undefined,
  });
  return c.json({ error: "Internal Server Error" }, 500);
});

export default app;

ensureAdmin().catch((error) => log.error("admin bootstrap failed", { error: String(error) }));

if (env.isProduction) {
  const { serve } = await import("@hono/node-server");
  const { serveStaticFiles } = await import("./lib/vite");
  serveStaticFiles(app);
  const port = parseInt(process.env.PORT || "3000");
  serve({ fetch: app.fetch, port }, () => log.info(`Server running on http://localhost:${port}/`));
}
