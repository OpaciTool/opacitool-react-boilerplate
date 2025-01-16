import { axiosClient } from "@/shared/lib/axiosClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthState } from "./useAuthState.hook";
import { ObservationFormData } from "@/features/observation/model";

type UseObservationProps = {
  observationUID?: string;
};

export function useUpdateObservation({ observationUID }: UseObservationProps) {
  const { user } = useAuthState();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: ObservationFormData) =>
      await axiosClient.patch(
        `/users/${user?.uid}/observations/${observationUID}`,
        data,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["observations", observationUID],
      });
    },
  });

  return { updateObservation: mutateAsync };
}
