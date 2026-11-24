export const Session = {
  cookieName: "benex_sid",
  maxAgeMs: 12 * 60 * 60 * 1000,
} as const;

export const ErrorMessages = {
  unauthenticated: "Authentication required",
  insufficientRole: "Insufficient permissions",
} as const;

/** Bump whenever the consent wording in src/i18n.tsx changes; it is stored with every consent. */
export const CONSENT_TEXT_VERSION = "2026-11-v1";

export const TIME_SLOTS = ["morning", "afternoon", "evening"] as const;
export const ENGAGEMENT_TYPES = ["mandate", "monthly", "undecided"] as const;
export const LEAD_STATUSES = ["new", "in_progress", "qualified", "quoted", "scheduled", "won", "closed", "archived"] as const;
