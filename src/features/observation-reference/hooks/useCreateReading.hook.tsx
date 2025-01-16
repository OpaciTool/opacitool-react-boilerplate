import { useAuthState } from "@/shared/hooks";
import { axiosClient } from "@/shared/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";

type Props = {
  observationUID?: string;
};

export function useCreateReading({ observationUID }: Props) {
  const { user } = useAuthState();

  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationFn: ({ opacity, index }: { opacity: number; index?: number }) => {
      return axiosClient.post(
        `/users/${user?.uid}/observations/${observationUID}/readings`,
        {
          opacity,
          insert_index: index,
        },
      );
    },
  });

  return { isLoading: isPending, isSuccess, createReading: mutateAsync };
}
