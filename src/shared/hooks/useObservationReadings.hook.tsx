import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "./useAuthState.hook";
import { axiosClient } from "@/shared/lib/axiosClient";
import { ObservationReading } from "../model";

type UseObservationReadingsProps = {
  observationUID?: string;
};

export function useObservationReadings({
  observationUID,
}: UseObservationReadingsProps) {
  const { user, accessToken } = useAuthState();

  const {
    data: readings,
    isLoading,
    isError,
  } = useQuery<ObservationReading[]>({
    enabled:
      Boolean(!!user && !!accessToken && !!observationUID) ||
      process.env.NODE_ENV === "test",
    queryKey: ["observations", observationUID, "readings"],
    queryFn: () =>
      axiosClient
        .get(`/users/${user?.uid}/observations/${observationUID}/readings`)
        .then((res) => res.data),
  });

  return { isError, isLoading, readings };
}
