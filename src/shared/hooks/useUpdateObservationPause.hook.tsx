import { ObservationPauseFormData } from "@/features/observation-test/ui";
import { axiosClient } from "@/shared/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { useAuthState } from "./useAuthState.hook";

type Props = {
  observationUID?: string;
  pauseID?: number;
};

export function useUpdateObservationPause({ observationUID, pauseID }: Props) {
  const { user } = useAuthState();

  const { mutateAsync } = useMutation({
    mutationFn: (data: ObservationPauseFormData) =>
      axiosClient.patch(
        `/users/${user?.uid}/observations/${observationUID}/pauses/${pauseID}`,
        data,
      ),
  });

  return { updateObservationPause: mutateAsync };
}
