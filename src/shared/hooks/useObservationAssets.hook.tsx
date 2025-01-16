import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "./useAuthState.hook";
import { axiosClient } from "@/shared/lib/axiosClient";
import { ObservationAsset } from "../model";

type UseObservationReadingsProps = {
  observationUID?: string;
  assetID?: number;
};

export function useObservationAssets({
  observationUID,
}: UseObservationReadingsProps) {
  const { user, accessToken } = useAuthState();

  const {
    data: assets,
    isLoading,
    isError,
  } = useQuery<ObservationAsset[]>({
    enabled:
      Boolean(!!user && !!accessToken && !!observationUID) ||
      process.env.NODE_ENV === "test",
    queryKey: ["observations", observationUID, "assets"],
    queryFn: () =>
      axiosClient
        .get(`/users/${user?.uid}/observations/${observationUID}/assets`)
        .then((res) => res.data),
  });

  return { isError, isLoading, assets };
}
