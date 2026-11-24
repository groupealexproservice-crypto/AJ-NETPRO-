export const OPEN_ASSISTANT_EVENT = "benex-assistant-open";

/** Opens the advisor from anywhere on the site, optionally with a first question. */
export function openAssistant(query?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_ASSISTANT_EVENT, { detail: { query } }));
}
