import { Button, Dialog, DialogActions, Heading, Text } from "@/shared/ui";

type TextDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  paragraphs: string[];
};

export function TextDialog({
  isOpen,
  onClose,
  paragraphs,
  title,
}: TextDialogProps) {
  return (
    <Dialog
      className="space-y-8"
      open={isOpen}
      size="5xl"
      onClose={() => onClose()}
    >
      <header>
        <Heading>{title}</Heading>
      </header>
      <ul>
        {paragraphs.map((paragraph, index) => (
          <li key={index}>
            <Text>{paragraph}</Text>
          </li>
        ))}
      </ul>
      <DialogActions>
        <Button onClick={() => onClose()}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
