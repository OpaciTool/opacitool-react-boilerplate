import { useAuthState } from "@/shared/hooks";
import { axiosClient } from "@/shared/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { ObservationScreenshot } from "../model";

type UseObservationProps = {
  observationUID?: string;
};

export function useObservationScreenshots({
  observationUID,
}: UseObservationProps) {
  const { user, accessToken } = useAuthState();

  const {
    data: screenshots,
    isLoading,
    isError,
  } = useQuery<ObservationScreenshot[]>({
    enabled:
      Boolean(!!user && !!accessToken && !!observationUID) ||
      process.env.NODE_ENV === "test",
    queryKey: ["observations", observationUID, "screenshots"],
    queryFn: () =>
      axiosClient
        .get(`/users/${user?.uid}/observations/${observationUID}/screenshots`)
        .then((res) => res.data),
  });

  return { isError, isLoading, screenshots };
}
