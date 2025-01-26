import { useState } from "react";
import { Text } from "@/shared/ui";
import clsx from "clsx";
import { Dialog } from "@headlessui/react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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
    };
  };
  layout?: "text-left" | "text-right";
}

export function SplitSection({
  title,
  content,
  layout = "text-left",
}: SplitSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isTextLeft = layout === "text-left";

  return (
    <>
      <div className="py-8 first:pt-0 last:pb-0">
        {/* Split Content Container */}
        <div
          className={clsx(
            "grid items-center gap-8 lg:grid-cols-2",
            isTextLeft ? "lg:grid-flow-col" : "lg:grid-flow-col-dense",
          )}
        >
          {/* Text Content */}
          <div
            className={clsx(
              "prose prose-zinc dark:prose-invert max-w-none",
              isTextLeft ? "lg:pr-8" : "lg:pl-8",
              !isTextLeft && "lg:order-2",
            )}
          >
            {/* Section Title */}
            <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-white">
              {title}
            </h2>
            <Text className="whitespace-pre-line">{content.text}</Text>
          </div>

          {/* Media Content */}
          <div className={clsx(!isTextLeft && "lg:order-1")}>
            <div className="relative">
              <div
                className={clsx(
                  "rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800",
                  "flex items-center justify-center",
                  content.media?.isClickable && "cursor-pointer hover:opacity-90 transition-opacity"
                )}
                onClick={() => content.media?.isClickable && setIsModalOpen(true)}
              >
                {content.media?.type === "image" && (
                  <>
                    <img
                      src={content.media.url}
                      alt={content.media.alt || title}
                      className="w-full h-full object-cover"
                    />
                    {content.media.isClickable && (
                      <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-orange-600 ">
                        <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="space-y-1">
                {content.media?.caption && (
                  <p className="mt-2 text-sm text-center text-zinc-500 dark:text-zinc-400">
                    {content.media.caption}
                  </p>
                )}
                {content.media?.isClickable && (
                  <p className="text-xs text-center text-orange-600 dark:text-orange-500 flex items-center justify-center gap-1">
                    <MagnifyingGlassIcon className="h-3.5 w-3.5" />
                    Click to enlarge
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-4xl bg-white dark:bg-zinc-900 rounded-lg shadow-xl">
            <div className="relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
              <img
                src={content.media?.url}
                alt={content.media?.alt || title}
                className="rounded-lg"
              />
              {content.media?.caption && (
                <p className="p-4 text-sm text-center text-zinc-600 dark:text-zinc-300">
                  {content.media.caption}
                </p>
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
