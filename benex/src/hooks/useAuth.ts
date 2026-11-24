import { trpc } from "@/providers/trpc";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { LOGIN_PATH } from "@/const";
import { useLocalePath } from "./useLocalePath";

type UseAuthOptions = { redirectOnUnauthenticated?: boolean; requireRole?: "admin" };

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false } = options ?? {};
  const navigate = useNavigate();
  const localize = useLocalePath();
  const utils = trpc.useUtils();
  const { data: user, isLoading, refetch } = trpc.auth.me.useQuery(undefined, { staleTime: 60_000, retry: false });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: async () => {
      await utils.auth.me.reset();
      await utils.invalidate();
      navigate(localize("/"));
    },
  });
  const logout = useCallback(() => logoutMutation.mutate(), [logoutMutation]);

  useEffect(() => {
    if (redirectOnUnauthenticated && !isLoading && !user) navigate(localize(LOGIN_PATH), { replace: true });
  }, [redirectOnUnauthenticated, isLoading, user, navigate, localize]);

  return useMemo(
    () => ({ user: user ?? null, isAuthenticated: !!user, isLoading: isLoading || logoutMutation.isPending, logout, refresh: refetch }),
    [user, isLoading, logoutMutation.isPending, logout, refetch],
  );
}
