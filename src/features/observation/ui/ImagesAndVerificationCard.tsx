import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";

import { useObservationScreenshots } from "@/features/observation-test/hooks";
import {
  ObservationScreenshotDialog,
  ViewObservationVerificationVideoDialog,
} from "@/features/observation/ui";
import { Card, Heading, Text } from "@/shared/ui";
import { ReferenceObservationScreenshotsDialog } from "../../observation-reference/ui/ReferenceObservationScreenshotsDialog";
import { ObservationType } from "@/shared/model";
import { useObservationAssets } from "@/shared/hooks";

export function ImagesAndVerificationCard({
  observationUID,
  observationType,
}: {
  observationUID: string;
  observationType: ObservationType;
}) {
  const { assets } = useObservationAssets({ observationUID });
  const { screenshots } = useObservationScreenshots({ observationUID });

  const videoAsset = assets?.find(
    (asset) => asset.type === "verification-video",
  );

  let videoUrl: string | undefined;
  if (videoAsset && videoAsset.type === "verification-video") {
    videoUrl = videoAsset.asset.url;
  }

  const [viewVideoModalOpen, setViewVideoModalOpen] = useState(false);
  const [viewAssetsModalOpen, setViewAssetsModalOpen] = useState(false);
  const [editScreenshotID, setEditScreenshotID] = useState<number | null>(null);

  return (
    <>
      <Card className="space-y-8">
        <div className="space-y-6 print:hidden">
          <Heading>
            {observationType === "reference"
              ? "Images"
              : "Images & Verification"}
          </Heading>
          <div className="grid grid-cols-2 gap-x-8">
            <Card
              as="div"
              className="flex items-center justify-between bg-white hover:cursor-pointer lg:px-6 lg:py-4"
              onClick={() => setViewAssetsModalOpen(true)}
            >
              <span className="flex items-center space-x-2">
                {screenshots?.length ? (
                  <CheckCircleIcon className="size-4 fill-green-600" />
                ) : (
                  <NoSymbolIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
                )}
                <Text>
                  {screenshots?.length} Image{screenshots?.length !== 1 && "s"}
                </Text>
              </span>
              {!!screenshots?.length && <ArrowUpRightIcon className="size-4" />}
            </Card>
            {observationType === "test" && (
              <Card
                as="div"
                className="flex h-min items-center justify-between bg-white duration-150 ease-in-out hover:cursor-pointer lg:px-6 lg:py-4"
                role="button"
                onClick={() => setViewVideoModalOpen(true)}
              >
                <span className="flex items-center space-x-2">
                  {videoUrl ? (
                    <CheckCircleIcon className="size-4 fill-green-600" />
                  ) : (
                    <NoSymbolIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
                  )}
                  <p>Video {!videoUrl && "unavailable"}</p>
                </span>
                {!!videoUrl && (
                  <Text className="inline-flex items-center space-x-1">
                    View
                    <ArrowUpRightIcon className="mt-px size-4" />
                  </Text>
                )}
              </Card>
            )}
          </div>
        </div>
      </Card>
      {screenshots && screenshots?.length > 0 && (
        <ReferenceObservationScreenshotsDialog
          isOpen={viewAssetsModalOpen}
          screenshots={screenshots || []}
          onClose={() => setViewAssetsModalOpen(false)}
          onScreenshotClick={(id) => {
            setEditScreenshotID(id);
          }}
        />
      )}
      {videoUrl && (
        <ViewObservationVerificationVideoDialog
          isOpen={viewVideoModalOpen}
          videoUrl={videoUrl}
          onClose={() => setViewVideoModalOpen(false)}
        />
      )}
      <ObservationScreenshotDialog
        index={0}
        isOpen={editScreenshotID != null}
        observationUID={observationUID}
        screenshotID={editScreenshotID}
        onClose={() => setEditScreenshotID(null)}
      />
    </>
  );
}
