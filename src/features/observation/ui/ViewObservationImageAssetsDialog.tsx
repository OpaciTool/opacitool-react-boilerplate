import { ObservationAsset } from "@/shared/model";
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from "@/shared/ui";

export function ViewObservationImageAssetsDialog({
  assets,
  isOpen,
  onClose,
}: {
  assets: ObservationAsset[];
  isOpen: boolean;
  onClose: () => void;
}) {
  const imageAssets = assets?.filter((asset) => asset.type === "image");

  return (
    <Dialog autoFocus open={isOpen} size="4xl" onClose={onClose}>
      <DialogTitle>Observation Screenshots</DialogTitle>
      <DialogBody className="flex space-y-4">
        <div className="grid grid-cols-4 gap-8">
          {imageAssets?.map((asset) => (
            <div key={asset.id}>
              {asset.type === "image" && asset?.asset?.url ? (
                <img alt="Image" src={asset.asset.url} />
              ) : (
                <div className="flex h-64 w-64 items-center justify-center bg-gray-200">
                  <p className="text-gray-500">No Image</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogBody>
      <DialogActions>
        <Button onClick={() => onClose()}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
