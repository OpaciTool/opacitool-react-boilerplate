import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "./useAuthState.hook";
import { axiosClient } from "@/shared/lib/axiosClient";
import { ObservationAsset } from "../model";

type UseObservationReadingsProps = {
  observationUID?: string;
  assetID?: number | null;
};

export function useObservationAsset({
  observationUID,
  assetID,
}: UseObservationReadingsProps) {
  const { user, accessToken } = useAuthState();

  const {
    data: asset,
    isLoading,
    isError,
  } = useQuery<ObservationAsset>({
    enabled:
      Boolean(!!user && !!accessToken && !!observationUID && !!assetID) ||
      process.env.NODE_ENV === "test",
    queryKey: ["observations", observationUID, "asset", assetID],
    queryFn: () =>
      axiosClient
        .get(
          `/users/${user?.uid}/observations/${observationUID}/assets/${assetID}`,
        )
        .then((res) => res.data),
  });

  return { isError, isLoading, asset };
}
