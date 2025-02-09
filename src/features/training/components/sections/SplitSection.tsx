import { useState } from "react";
import clsx from "clsx";
import { Dialog } from "@headlessui/react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getLectureMediaUrl } from "../../lib/getLectureMedia";

interface SplitSectionProps {
  title: string;
  content: {
    text: string;
    media?: {
      type: "image" | "video" | "pdf";
      url: string;
      alt?: string;
      isClickable?: boolean;
      caption?: string;
      width?: string;
    };
  };
  layout?: "text-left" | "text-right";
  containerType?: "grid" | "flex-col";
  bgColor?: string;
}

export function SplitSection({
  title,
  content,
  layout = "text-left",
  containerType = "grid",
  bgColor,
}: SplitSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isTextLeft = layout === "text-left";

  return (
    <div className={clsx("px-4 py-8 lg:px-14", bgColor)}>
      {/* Split Content Container */}
      <div
        className={clsx(
          containerType === "grid"
            ? clsx(
                content.media
                  ? "grid items-center gap-8 lg:grid-cols-2"
                  : "flex flex-col",
                isTextLeft ? "lg:grid-flow-col" : "lg:grid-flow-col-dense",
              )
            : "flex flex-col gap-8",
        )}
      >
        {/* Text Content */}
        <div
          className={clsx(
            "prose prose-zinc dark:prose-invert max-w-none",
            content.media && (isTextLeft ? "lg:pr-8" : "lg:pl-8"),
            !isTextLeft && content.media && "lg:order-2",
          )}
        >
          {/* Section Title */}
          <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-white">
            {title}
          </h2>
          <div className="dark:prose-invert text-lg text-zinc-900">
            <p className="whitespace-pre-line">{content.text}</p>
          </div>
        </div>

        {/* Media Content - Only render if media exists */}
        {content.media && (
          <div className={clsx(!isTextLeft && "lg:order-1")}>
            <div className="relative">
              <div
                className={clsx(
                  "overflow-hidden rounded-lg",
                  "flex items-center justify-center",
                  content.media?.isClickable &&
                    "cursor-pointer transition-opacity hover:opacity-90",
                )}
                onClick={() =>
                  content.media?.isClickable && setIsModalOpen(true)
                }
              >
                {content.media?.type === "image" && (
                  <>
                    <img
                      src={getLectureMediaUrl(content.media.url)}
                      alt={content.media.alt || ""}
                      className={clsx(
                        "h-full w-full rounded-lg object-contain",
                        content.media.isClickable &&
                          "cursor-pointer transition-opacity hover:opacity-90",
                      )}
                      style={
                        content.media.width
                          ? { width: content.media.width }
                          : undefined
                      }
                    />
                    {content.media.isClickable && (
                      <div className="absolute bottom-2 right-2 rounded-full bg-orange-600 p-1.5">
                        <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="space-y-1">
                {content.media?.caption && (
                  <p className="mt-2 text-center text-sm text-zinc-500 dark:text-zinc-400">
                    {content.media.caption}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Image Modal - Only render if media exists and is clickable */}
      {content.media?.isClickable && (
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-4xl rounded-lg bg-white shadow-xl dark:bg-zinc-900">
              <div className="relative">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute right-4 top-4 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
                <img
                  src={getLectureMediaUrl(content.media?.url || "")}
                  alt={content.media?.alt || title}
                  className="rounded-lg"
                />
                {content.media?.caption && (
                  <p className="p-4 text-center text-sm text-zinc-600 dark:text-zinc-300">
                    {content.media.caption}
                  </p>
                )}
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </div>
  );
}
