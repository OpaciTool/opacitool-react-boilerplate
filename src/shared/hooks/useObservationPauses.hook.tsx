import { axiosClient } from "@/shared/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { ObservationPause } from "../model";
import { useAuthState } from "./useAuthState.hook";

type UseObservationPausesProps = {
  observationUID?: string;
};

export function useObservationPauses({
  observationUID,
}: UseObservationPausesProps) {
  const { user, accessToken } = useAuthState();

  const {
    data: pauses,
    isLoading,
    isError,
  } = useQuery<ObservationPause[]>({
    enabled:
      Boolean(!!user && !!accessToken && !!observationUID) ||
      process.env.NODE_ENV === "test",
    queryKey: ["observations", observationUID, "pauses"],
    queryFn: () =>
      axiosClient
        .get(`/users/${user?.uid}/observations/${observationUID}/pauses`)
        .then((res) => res.data),
  });

  return { isError, isLoading, pauses };
}
