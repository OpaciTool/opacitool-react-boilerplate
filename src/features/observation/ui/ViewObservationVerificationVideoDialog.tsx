import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from "@/shared/ui";

type Props = {
  isOpen: boolean;
  videoUrl: string;
  onClose: () => void;
};

export function ViewObservationVerificationVideoDialog({
  isOpen,
  videoUrl,
  onClose,
}: Props) {
  return (
    <Dialog autoFocus open={isOpen} size="4xl" onClose={onClose}>
      <DialogTitle>Verification Video</DialogTitle>
      <DialogBody className="flex space-y-4">
        <video
          className="h-auto max-h-[50vh] w-full rounded-lg border border-zinc-300"
          controls
          src={videoUrl}
        />
      </DialogBody>
      <DialogActions>
        <Button onClick={() => onClose()}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
