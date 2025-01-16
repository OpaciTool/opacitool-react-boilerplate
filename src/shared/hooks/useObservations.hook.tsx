import { axiosClient } from "@/shared/lib/axiosClient";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Observation } from "../model";
import { useAuthState } from "./useAuthState.hook";

type ObservationResponse = {
  cursor?: string;
  observations: Observation[];
};

export function useObservations() {
  const { user, accessToken } = useAuthState();

  const {
    data,
    hasNextPage,
    isFetching,
    isLoading,
    fetchNextPage,
    fetchPreviousPage,
  } = useInfiniteQuery<ObservationResponse>({
    queryKey: ["observations", user?.uid],
    queryFn: async ({ pageParam }) => {
      const response = await axiosClient.get(
        `/users/${user?.uid}/observations${pageParam ? "?cursor=" + pageParam : ""}`,
      );
      return response.data;
    },
    enabled:
      Boolean(!!user && !!accessToken) || process.env.NODE_ENV === "test",
    getNextPageParam: (lastPage) => lastPage.cursor || undefined,
    initialPageParam: null,
  });

  const observations = data?.pages.flatMap((page) => page.observations);

  console.log({ hasNextPage });

  return {
    observations,
    isLoading,
    isFetching,
    hasMore: hasNextPage,
    fetchNextPage,
    fetchPreviousPage,
  };
}
