import { axiosClient } from "@/shared/lib/axiosClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthState } from "./useAuthState.hook";

type Props = {
  observationUID?: string;
};

type ObservationReadingFormData = {
  readingID: number;
  opacity: number;
};

export function useUpdateObservationReading({ observationUID }: Props) {
  const { user } = useAuthState();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: ObservationReadingFormData) =>
      axiosClient.patch(
        `/users/${user?.uid}/observations/${observationUID}/readings/${data.readingID}`,
        { opacity: data.opacity },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["observations", observationUID, "readings"],
      });
    },
  });

  return { updateObservationReading: mutateAsync, isLoading: isPending };
}
