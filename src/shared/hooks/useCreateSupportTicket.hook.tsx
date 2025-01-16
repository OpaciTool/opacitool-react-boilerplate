import { SupportFormData } from "@/features/support/types";
import { axiosClient } from "@/shared/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";

export function useCreateSupportTicket() {
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationFn: (data: SupportFormData) =>
      axiosClient.post("/support", {
        body: JSON.stringify(data),
      }),
  });

  return { isLoading: isPending, isSuccess, createSupportTicket: mutateAsync };
}
