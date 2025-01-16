import { axiosClient } from "@/shared/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { Observation } from "../model";
import { useAuthState } from "./useAuthState.hook";

type ObservationResponse = {
  cursor?: string;
  observations: Observation[];
};

export function useRecentObservations() {
  const { user, accessToken } = useAuthState();

  const { data: observations, isLoading } = useQuery<ObservationResponse>({
    enabled:
      Boolean(!!user && !!accessToken) || process.env.NODE_ENV === "test",
    queryKey: [user?.uid, "observations"],
    queryFn: () =>
      axiosClient
        .get(`/users/${user?.uid}/observations`)
        .then((res) => res.data),
  });

  return { observations: observations?.observations, isLoading };
}
