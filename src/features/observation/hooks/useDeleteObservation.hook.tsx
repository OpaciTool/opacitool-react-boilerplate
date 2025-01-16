import { useAuthState } from "@/shared/hooks";
import { axiosClient } from "@/shared/lib/axiosClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  observationUID?: string;
  onDeleted?: () => void;
  onFailed?: () => void;
};

export function useDeleteObservation({
  observationUID,
  onDeleted,
  onFailed,
}: Props) {
  const { user } = useAuthState();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      axiosClient(`/users/${user?.uid}/observations/${observationUID}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["observations"],
      });
      onDeleted?.();
    },
    onError: () => {
      onFailed?.();
    },
  });

  return { deleteObservation: mutateAsync, isPending };
}
