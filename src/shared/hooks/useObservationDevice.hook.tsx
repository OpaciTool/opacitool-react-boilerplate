import { axiosClient } from "@/shared/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { UserDevice } from "../model";
import { useAuthState } from "./useAuthState.hook";

type UseObservationDeviceProps = {
  observationUID?: string;
};

export function useObservationDevice({
  observationUID,
}: UseObservationDeviceProps) {
  const { user, accessToken } = useAuthState();

  const { data: observationDevice, isLoading } = useQuery<UserDevice>({
    enabled:
      Boolean(!!user && !!accessToken && !!observationUID) ||
      process.env.NODE_ENV === "test",
    queryKey: ["observations", observationUID, "devices"],
    queryFn: () =>
      axiosClient
        .get(`/users/${user?.uid}/observations/${observationUID}/devices`)
        .then((res) => res.data),
  });

  return { observationDevice, isLoading };
}
