import { useAuthState } from "@/shared/hooks";
import { axiosClient } from "@/shared/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";

type Props = {
  observationUID?: string;
};

export function useDeleteReading({ observationUID }: Props) {
  const { user } = useAuthState();

  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationFn: (readingID: number) =>
      axiosClient.delete(
        `/users/${user?.uid}/observations/${observationUID}/readings/${readingID}`,
      ),
  });

  return { isLoading: isPending, isSuccess, deleteReading: mutateAsync };
}
