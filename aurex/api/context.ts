import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { User } from "@db/schema";
import { userFromHeaders } from "./auth/session";

export type TrpcContext = { req: Request; resHeaders: Headers; user?: User };

export async function createContext(opts: FetchCreateContextFnOptions): Promise<TrpcContext> {
  const user = await userFromHeaders(opts.req.headers);
  return { req: opts.req, resHeaders: opts.resHeaders, user: user ?? undefined };
}
