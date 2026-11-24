import { currentRequestId } from "./requestcontext";

type Level = "info" | "warn" | "error";

function write(level: Level, message: string, ctx?: Record<string, unknown>) {
  const line = JSON.stringify({ t: new Date().toISOString(), level, requestId: currentRequestId(), message, ...ctx });
  (level === "error" ? console.error : console.log)(line);
}

export const log = {
  info: (message: string, ctx?: Record<string, unknown>) => write("info", message, ctx),
  warn: (message: string, ctx?: Record<string, unknown>) => write("warn", message, ctx),
  error: (message: string, ctx?: Record<string, unknown>) => write("error", message, ctx),
};
