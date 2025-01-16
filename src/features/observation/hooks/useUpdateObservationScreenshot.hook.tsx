import { useAuthState } from "@/shared/hooks";
import { axiosClient } from "@/shared/lib/axiosClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  observationUID?: string;
  screenshotID?: number | null;
};

type UpdateObservationScreenshotBody = {
  include_with_report: boolean;
  revised_opacity: number | null;
};

export function useUpdateObservationScreenshot({
  observationUID,
  screenshotID,
}: Props) {
  const { user } = useAuthState();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (data: UpdateObservationScreenshotBody) =>
      axiosClient(
        `/users/${user?.uid}/observations/${observationUID}/screenshots/${screenshotID}`,
        {
          method: "PATCH",
          data,
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["observations", observationUID, "screenshots", screenshotID],
      });
    },
  });

  return { updateObservationScreenshot: mutateAsync };
}
