/**
 * Anonymous conversion analytics. Sends an event name, the page path and the language: no cookie, IP address or identifier.
 * Failures are silent: analytics never get in the way of a visitor.
 */
type EventName = "page_view" | "simulator_run" | "form_started" | "cta_consultation" | "cta_quote" | "assistant_completed";

export function track(name: EventName) {
  try {
    const path = window.location.pathname.replace(/[^A-Za-z0-9\-_/]/g, "").slice(0, 200) || "/";
    if (path.startsWith("/admin")) return;
    const lang = path.startsWith("/en") ? "en" : "fr";
    const body = JSON.stringify({ "0": { json: { name, path, lang } } });
    void fetch("/api/trpc/analytics.track?batch=1", { method: "POST", headers: { "content-type": "application/json" }, body, keepalive: true, credentials: "omit" }).catch(() => undefined);
  } catch { /* ignore */ }
}
