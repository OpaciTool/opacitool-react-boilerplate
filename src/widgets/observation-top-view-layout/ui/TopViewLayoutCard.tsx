import { useUpdateObservationAsset } from "@/shared/hooks";
import { ObservationAsset } from "@/shared/model";
import { Button, Card, Heading } from "@/shared/ui";
import { SunIcon } from "@heroicons/react/16/solid";
import { animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { TopViewLayoutSvg } from "./TopViewLayoutSvg";

type TopViewLayoutCardProps = {
  asset: ObservationAsset | undefined;
  directionFromObserver?: number | null;
  observationUID: string;
};

export function TopViewLayoutCard({
  asset,
  directionFromObserver,
  observationUID,
}: TopViewLayoutCardProps) {
  const [hasLoaded, setHasLoaded] = useState(false);

  const [position, setPosition] = useState([0, 0]);
  const { updateObservationAsset } = useUpdateObservationAsset({
    assetID: asset?.id,
    observationUID,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerDimensions, setContainerDimensions] = useState({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    if (containerRef.current) {
      const { height, width } = containerRef.current.getBoundingClientRect();
      setContainerDimensions({ height, width });
    }
  }, [containerRef]);

  const ICON_SIZE = containerDimensions.width / 10;

  useEffect(() => {
    if (
      asset &&
      asset.type === "sun-position" &&
      asset.asset &&
      containerDimensions.height &&
      containerDimensions.width &&
      !hasLoaded
    ) {
      if ("x" in asset.asset && "y" in asset.asset) {
        console.log("we are here");
        // Convert percentage to pixels
        const x = asset.asset.x * (containerDimensions.width - ICON_SIZE);
        const y = asset.asset.y * (containerDimensions.height - ICON_SIZE);

        const clampedX = Math.max(
          0,
          Math.min(x, containerDimensions.width - ICON_SIZE),
        );
        const clampedY = Math.max(
          0,
          Math.min(y, containerDimensions.height - ICON_SIZE),
        );

        console.log("clampedX", clampedX);
        console.log("clampedY", clampedY);

        setPosition([clampedX, clampedY]);
        setHasLoaded(true);
      }
    }
  }, [
    ICON_SIZE,
    asset,
    containerDimensions.height,
    containerDimensions.width,
    hasLoaded,
  ]);

  async function onSave() {
    try {
      const x = position[0] / (containerDimensions.width - ICON_SIZE);
      const y = position[1] / (containerDimensions.height - ICON_SIZE);
      console.log("parsedX", x);
      console.log("parsedY", y);

      await updateObservationAsset({
        x: x,
        y: y,
      });
      toast.success("Top view layout saved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save top view layout");
    }
  }

  const bind = useDrag(({ delta: [x, y] }) => {
    setPosition((prev) => [
      Math.max(0, Math.min(prev[0], containerDimensions.width - ICON_SIZE)) + x,
      Math.max(0, Math.min(prev[1], containerDimensions.height - ICON_SIZE)) +
        y,
    ]);
  });

  return (
    <Card className="space-y-6">
      <Heading>Top View Layout</Heading>
      <section className="flex flex-col space-y-4">
        <div className="relative aspect-1 flex-1 bg-white" ref={containerRef}>
          <TopViewLayoutSvg
            className="pointer-events-none absolute left-0 top-0 h-full w-full"
            directionFromObserver={directionFromObserver}
          />
          <animated.div
            className="hover:cursor-grab active:cursor-grabbing"
            {...bind()}
            style={{ x: position[0], y: position[1] }}
          >
            <SunIcon
              className="fill-yellow-500"
              style={{
                height: `${ICON_SIZE}px`,
                width: `${ICON_SIZE}px`,
              }}
            />
          </animated.div>
        </div>
        <div className="flex flex-shrink-0 flex-col space-y-2">
          <p className="text-base/6 text-zinc-500 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-zinc-400">
            Drag the sun icon to the desired position on the map.
          </p>
          <Button className="ml-auto" onClick={onSave}>
            Save
          </Button>
        </div>
      </section>
    </Card>
  );
}
