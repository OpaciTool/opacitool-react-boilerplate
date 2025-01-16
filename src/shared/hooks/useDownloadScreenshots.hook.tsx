import { axiosClient } from "@/shared/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { useAuthState } from "./useAuthState.hook";

type DownloadScreenshotBody = {
  screenshotObjectIds: string[];
};

export function useDownloadScreenshots() {
  const { user } = useAuthState();

  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationFn: async ({
      data,
      observationUid,
    }: {
      data: DownloadScreenshotBody;
      observationUid: string;
    }) => {
      const res = await axiosClient.post(
        `/users/${user?.uid}/observations/${observationUid}/screenshots/download`,
        data,
        {
          responseType: "blob",
          timeout: 60000,
        },
      );
      const blob = new Blob([res.data], { type: "application/zip" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const contentDisposition = res.headers["content-disposition"];
      let filename = "screenshots.zip";
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch.length === 2) {
          filename = filenameMatch[1];
        }
      }
      link.setAttribute("download", filename);
      link.click();
      window.URL.revokeObjectURL(url);
      return res;
    },
  });

  return { isLoading: isPending, isSuccess, downloadScreenshots: mutateAsync };
}
