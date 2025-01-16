import { axiosClient } from "@/shared/lib/axiosClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthState } from "./useAuthState.hook";

type Props = {
  observationUID?: string;
  assetID?: number | null;
};

type UpdateObservationAssetBody =
  | {
      include_with_report: boolean;
      asset: { url: string } | { x: number; y: number } | undefined;
    }
  | { x: number; y: number }
  | undefined;

export function useUpdateObservationAsset({ observationUID, assetID }: Props) {
  const { user, accessToken } = useAuthState();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (assetData: UpdateObservationAssetBody) =>
      axiosClient(
        `/users/${user?.uid}/observations/${observationUID}/assets${assetID == null ? "" : `/${assetID}`}`,
        {
          method: assetID == null ? "POST" : "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: JSON.stringify(
            assetID == null
              ? {
                  type: "sun-position",
                  asset: { ...assetData },
                }
              : { asset: { ...assetData } },
          ),
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["observations", observationUID, "asset", assetID],
      });
    },
  });

  return { updateObservationAsset: mutateAsync };
}
