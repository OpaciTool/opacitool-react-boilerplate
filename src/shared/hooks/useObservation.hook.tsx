import { axiosClient } from "@/shared/lib/axiosClient";
import { Observation } from "@/shared/model";
import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "./useAuthState.hook";

type UseObservationProps = {
  observationUID?: string;
};

export function useObservation({ observationUID }: UseObservationProps) {
  const { user, accessToken } = useAuthState();

  const {
    data: observation,
    isLoading,
    isError,
  } = useQuery<Observation>({
    enabled:
      Boolean(!!user && !!accessToken && !!observationUID) ||
      process.env.NODE_ENV === "test",
    queryKey: ["observations", observationUID],
    queryFn: () =>
      axiosClient
        .get(`/users/${user?.uid}/observations/${observationUID}`)
        .then((res) => res.data),
  });

  return { isError, isLoading, observation };
}
