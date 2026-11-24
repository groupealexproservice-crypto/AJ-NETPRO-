import { trpc } from "../providers/trpc";

export function useAdminOverview(enabled: boolean) {
  return trpc.admin.overview.useQuery(undefined, { enabled });
}

export type AdminData = NonNullable<ReturnType<typeof useAdminOverview>["data"]>;
export type RefreshAdmin = () => void;
