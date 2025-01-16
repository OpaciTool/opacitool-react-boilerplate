import { ObservationScreenshot } from "@/features/observation-test/model";
import { useAuthState } from "@/shared/hooks";
import { axiosClient } from "@/shared/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";

type UseObservationProps = {
  observationUID?: string;
  screenshotID?: number | null;
};

export function useObservationScreenshot({
  observationUID,
  screenshotID,
}: UseObservationProps) {
  const { user, accessToken } = useAuthState();

  async function fetchScreenshots() {
    const res = await axiosClient.get(
      `/users/${user?.uid}/observations/${observationUID}/screenshots/${screenshotID}`,
    );
    return res.data;
  }

  const {
    data: screenshot,
    isLoading,
    isError,
  } = useQuery<ObservationScreenshot>({
    enabled:
      Boolean(
        !!user && !!accessToken && !!observationUID && screenshotID != null,
      ) || process.env.NODE_ENV === "test",
    queryKey: ["observations", observationUID, "screenshots", screenshotID],
    queryFn: () => fetchScreenshots(),
  });

  return { isError, isLoading, screenshot };
}
