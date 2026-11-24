import * as jose from "jose";
import * as cookie from "cookie";
import { eq } from "drizzle-orm";
import { Session } from "@contracts/constants";
import { users, type User } from "@db/schema";
import { env } from "../lib/env";
import { getDb } from "../queries/connection";

const secret = () => new TextEncoder().encode(env.appSecret);

export async function signSession(userId: number): Promise<string> {
  return new jose.SignJWT({ uid: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${Session.maxAgeMs / 1000}s`)
    .sign(secret());
}

export function sessionCookie(token: string): string {
  return cookie.serialize(Session.cookieName, token, {
    httpOnly: true, secure: env.isProduction, sameSite: "lax", path: "/", maxAge: Session.maxAgeMs / 1000,
  });
}

export function clearedSessionCookie(): string {
  return cookie.serialize(Session.cookieName, "", {
    httpOnly: true, secure: env.isProduction, sameSite: "lax", path: "/", maxAge: 0,
  });
}

/** Resolves the signed-in, active user from request headers, or null. The role is always read from the database. */
export async function userFromHeaders(headers: Headers): Promise<User | null> {
  const token = cookie.parse(headers.get("cookie") ?? "")[Session.cookieName];
  if (!token) return null;
  try {
    const { payload } = await jose.jwtVerify(token, secret(), { algorithms: ["HS256"] });
    const uid = Number(payload.uid);
    if (!uid) return null;
    const [user] = await getDb().select().from(users).where(eq(users.id, uid)).limit(1);
    return user && user.active ? user : null;
  } catch {
    return null;
  }
}

const attempts = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

export function loginThrottled(key: string): boolean {
  const entry = attempts.get(key);
  if (!entry) return false;
  if (Date.now() - entry.first > WINDOW_MS) { attempts.delete(key); return false; }
  return entry.count >= MAX_ATTEMPTS;
}
export function recordLoginFailure(key: string) {
  const entry = attempts.get(key);
  if (!entry || Date.now() - entry.first > WINDOW_MS) attempts.set(key, { count: 1, first: Date.now() });
  else entry.count += 1;
}
export function clearLoginFailures(key: string) { attempts.delete(key); }
