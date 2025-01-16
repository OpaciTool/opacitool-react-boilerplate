import { Button, Dialog, DialogActions, Heading, Text } from "@/shared/ui";
import { ReactNode } from "react";

function PlumeImageAndTitle({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="flex flex-col items-center space-y-4">
      {children}
      <Heading className="text-zinc-600">{title}</Heading>
    </li>
  );
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function WaterVapourPlumeDialog({ isOpen, onClose }: Props) {
  return (
    <Dialog
      className="space-y-8"
      open={isOpen}
      size="5xl"
      onClose={() => onClose()}
    >
      <header>
        <Heading>Water Vapour Plume</Heading>
        <Text>
          Indicate if a water vapor plume was present and if it was attached or
          detached.
        </Text>
        <Text>
          Observations cannot be made in an area where water vapor is present.
        </Text>
      </header>
      <ul className="grid gap-8 lg:grid-cols-2">
        <PlumeImageAndTitle title="Attached Water Vapor Plume">
          <img
            alt="Attached Water Vapor Plume"
            className="h-full object-cover"
            src="/svg/water-vapour-plume/attached.svg"
          />
        </PlumeImageAndTitle>
        <PlumeImageAndTitle title="Detached Water Vapor Plume">
          <img
            alt="Detached Water Vapor Plume"
            className="h-full object-cover"
            src="/svg/water-vapour-plume/detached.svg"
          />
        </PlumeImageAndTitle>
      </ul>
      <DialogActions>
        <Button onClick={() => onClose()}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
