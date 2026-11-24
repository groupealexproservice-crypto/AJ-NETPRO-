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
import { compress } from "hono/compress";

const app = new Hono<{ Bindings: HttpBindings }>();

// Everything the site loads comes from itself, plus Google Fonts. Inline styles are needed by React; no inline script is ever allowed.
const CSP = [
  "default-src 'self'", "script-src 'self' 'wasm-unsafe-eval'", "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob:", "connect-src 'self'", "worker-src 'self' blob:", "media-src 'self' blob:", "object-src 'none'", "base-uri 'self'", "form-action 'self'", "frame-ancestors 'none'",
].join("; ");


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
    c.res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()");
    c.res.headers.set("Cross-Origin-Opener-Policy", "same-origin");
    if (env.isProduction && !c.req.path.startsWith("/api/")) c.res.headers.set("Content-Security-Policy", CSP);
    if (env.isProduction && env.publicUrl.startsWith("https://")) c.res.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
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

// Compression sits inside the header middleware so the headers set above are applied to the compressed response.
if (env.isProduction) app.use("*", compress());

app.use("/api/trpc/*", bodyLimit({ maxSize: 1024 * 1024 }));
app.use("/api/trpc/*", async (c) =>
  fetchRequestHandler({ endpoint: "/api/trpc", req: c.req.raw, router: appRouter, createContext }),
);
app.route("/", fileRoutes);
app.route("/", seoRoutes);
app.get("/api/health", (c) => c.json({ ok: true }));
app.all("/api/*", (c) => c.json({ error: "Not Found" }, 404));

// "/" goes straight to the French home page: no language selection screen. English is one click away in the menu.
app.get("/", (c) => c.redirect("/fr", 302));

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
