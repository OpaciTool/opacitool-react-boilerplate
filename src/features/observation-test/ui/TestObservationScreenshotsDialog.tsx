import { ObservationScreenshot } from "@/features/observation-test/model";
import { useDownloadScreenshots } from "@/shared/hooks";
import {
  Button,
  Dialog,
  DialogBody,
  DialogTitle,
  Divider,
  Heading,
  Skeleton,
  Subheading,
  Text,
} from "@/shared/ui";
import { DocumentPlusIcon, PencilSquareIcon } from "@heroicons/react/16/solid";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { twJoin, twMerge } from "tailwind-merge";

type ImageGridItemProps = {
  mode: "view" | "download";
  isSelected: boolean;
  index: number;
  screenshot: ObservationScreenshot;
  onScreenshotClick: (screenshotID: number) => void;
};

function ImageGridItem({
  mode,
  isSelected,
  index,
  screenshot,
  onScreenshotClick,
}: ImageGridItemProps) {
  if (!screenshot) return null;

  const { asset, id, include_with_report, revised_opacity } = screenshot;

  const opacityValue =
    revised_opacity != null ? revised_opacity * 100 : screenshot.opacity * 100;

  return (
    <li
      className="space-y-2"
      data-selected={isSelected ? "true" : "false"}
      key={id}
    >
      <div className="relative flex rounded-lg">
        <img
          className={twMerge(
            "rounded-lg border transition-opacity duration-150 ease-in-out",
          )}
          src={asset.public_url}
          onClick={() => onScreenshotClick(screenshot.id)}
        />
        <motion.div
          animate={mode === "download" ? { opacity: 1 } : { opacity: 0 }}
          className={twJoin(
            "pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg",
            mode === "download" &&
              isSelected &&
              "bg-brand-blue-500 bg-opacity-30",
            mode === "download" && !isSelected && "bg-zinc-900 bg-opacity-30",
          )}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={
              mode === "download" && isSelected ? { scale: 0 } : { scale: 1 }
            }
            className="absolute left-0 top-0 flex h-full w-full items-center justify-center"
            transition={{ duration: 0.2 }}
          >
            <div className="aspect-1 size-8 rounded-full border-2 border-white" />
          </motion.div>
          <motion.div
            animate={
              mode === "download" && isSelected ? { scale: 1 } : { scale: 0 }
            }
            className="absolute left-0 top-0 flex h-full w-full items-center justify-center"
            transition={{ duration: 0.2 }}
          >
            <CheckCircleIcon className="size-8 fill-white" />
          </motion.div>
        </motion.div>
      </div>
      <div className="flex items-center justify-between space-x-1">
        <div className="flex aspect-square w-7 items-center justify-center rounded-lg border border-zinc-300">
          <Text>{index + 1}</Text>
        </div>
        <span className="flex items-center space-x-1">
          {include_with_report && (
            <DocumentPlusIcon className="mt-px size-5 flex-shrink-0 fill-green-500" />
          )}
          {revised_opacity != null && (
            <PencilSquareIcon className="mt-px size-5 fill-yellow-500" />
          )}
          <Text>{opacityValue.toFixed(0)}%</Text>
        </span>
      </div>
    </li>
  );
}

type ReferenceObservationScreenshotsDialogProps = {
  screenshots: ObservationScreenshot[];
  isOpen: boolean;
  onClose: () => void;
  onScreenshotClick: (screenshotID: number) => void;
};

export function TestObservationScreenshotsDialog({
  screenshots,
  isOpen,
  onClose,
  onScreenshotClick,
}: ReferenceObservationScreenshotsDialogProps) {
  const params = useParams<{ observationUID?: string }>();

  const [mode, setMode] = useState<"view" | "download">("view");
  const [selectedScreenshotObjectNames, setSelectedScreenshotObjectNames] =
    useState<string[]>([]);

  const { isLoading, downloadScreenshots } = useDownloadScreenshots();

  async function onDownload() {
    try {
      if (!params.observationUID) return;
      await downloadScreenshots({
        data: {
          screenshotObjectIds: selectedScreenshotObjectNames,
        },
        observationUid: params.observationUID,
      });
      toast.success("Screenshots downloaded successfully");
      setMode("view");
    } catch (error) {
      console.error(error);
      toast.error("Failed to download screenshots");
    }
  }

  function onSelectScreenshotForDownload(objectName: string) {
    if (selectedScreenshotObjectNames.includes(objectName)) {
      setSelectedScreenshotObjectNames((prev) =>
        prev.filter((id) => id !== objectName),
      );
      return;
    }
    setSelectedScreenshotObjectNames((prev) => [...prev, objectName]);
  }

  return (
    <Dialog
      autoFocus
      className="relative overflow-clip"
      open={isOpen}
      size="4xl"
      onClose={onClose}
    >
      <DialogTitle>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <Heading>Images</Heading>
          </div>
          <span className="flex items-center space-x-4">
            {mode === "download" && (
              <>
                <Button plain onClick={() => setMode("view")}>
                  Cancel
                </Button>
                <Divider className="h-8" direction="vertical" />
                <Button
                  outline
                  onClick={() => setSelectedScreenshotObjectNames([])}
                >
                  Clear
                </Button>
              </>
            )}

            <Button
              ariaLabel="download images"
              disabled={
                selectedScreenshotObjectNames.length === 0 &&
                mode === "download"
              }
              onClick={() => {
                if (mode === "view") {
                  setMode("download");
                  return;
                }
                onDownload();
              }}
            >
              {mode === "download" && (
                <div className="aspect-square h-5 w-5 items-center justify-center rounded-full bg-white text-sm text-zinc-950">
                  {selectedScreenshotObjectNames.length}
                </div>
              )}
              {mode === "view" ? "Download" : "Download images"}
            </Button>
          </span>
        </div>
        <Divider className="my-4" />
        <div className="flex flex-col space-y-1 font-normal">
          <Text className="inline-flex items-center space-x-1">
            <DocumentPlusIcon className="size-4 flex-shrink-0 fill-green-500" />
            <span>Include images when printing your report.</span>
          </Text>
          <Text className="inline-flex items-center space-x-1">
            <PencilSquareIcon className="size-4 flex-shrink-0 fill-yellow-500" />
            <span>Opacity has been revised.</span>
          </Text>
        </div>
        <Subheading className="mt-4">
          {mode === "view"
            ? "Select an image to view"
            : "Select images to download"}
        </Subheading>
      </DialogTitle>
      <DialogBody className="flex flex-col space-y-4">
        <ul className="grid grid-cols-3 gap-8">
          {screenshots?.map((screenshot, index) => (
            <ImageGridItem
              index={index}
              isSelected={selectedScreenshotObjectNames.includes(
                screenshot.asset.object_name,
              )}
              key={screenshot.id}
              mode={mode}
              screenshot={screenshot}
              onScreenshotClick={
                mode === "view"
                  ? onScreenshotClick
                  : () =>
                      onSelectScreenshotForDownload(
                        screenshot.asset.object_name,
                      )
              }
            />
          ))}
        </ul>
      </DialogBody>
      <motion.div
        animate={isLoading ? { opacity: 1 } : { opacity: 0 }}
        className={twMerge(
          "absolute left-0 top-0 flex h-full w-full items-center justify-center",
          isLoading ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <Skeleton className="pointer-events-none h-full w-full bg-zinc-300/50" />
      </motion.div>
    </Dialog>
  );
}
