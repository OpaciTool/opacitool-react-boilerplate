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

export function PlumeShapeDialog({ isOpen, onClose }: Props) {
  return (
    <Dialog
      className="space-y-8"
      open={isOpen}
      size="5xl"
      onClose={() => onClose()}
    >
      <header>
        <Heading>Plume Shape</Heading>
        <Text>
          Indicate which of the five plume shapes most closely resembles the
          subject plume.
        </Text>
      </header>
      <ul className="grid gap-8 lg:grid-cols-3">
        <PlumeImageAndTitle title="Lofting">
          <img alt="Lofting" src="/svg/plume-shapes/lofting.svg" />
        </PlumeImageAndTitle>
        <PlumeImageAndTitle title="Looping">
          <img alt="Looping" src="/svg/plume-shapes/looping.svg" />
        </PlumeImageAndTitle>
        <PlumeImageAndTitle title="Coning">
          <img alt="Coning" src="/svg/plume-shapes/coning.svg" />
        </PlumeImageAndTitle>
        <PlumeImageAndTitle title="Fanning">
          <img alt="Fanning" src="/svg/plume-shapes/fanning.svg" />
        </PlumeImageAndTitle>
        <PlumeImageAndTitle title="Fumigating">
          <img alt="Fumigating" src="/svg/plume-shapes/fumigating.svg" />
        </PlumeImageAndTitle>
      </ul>
      <DialogActions>
        <Button onClick={() => onClose()}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
