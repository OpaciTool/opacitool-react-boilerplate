import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import type { ImageGridContent } from "../LectureContent";
import { getLectureMediaUrl } from "../../lib/getLectureMedia";

interface ImageGridSectionProps {
  title: string;
  content: ImageGridContent;
  bgColor?: string;
}

export function ImageGridSection({
  title,
  content,
  bgColor,
}: ImageGridSectionProps) {
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    caption?: string;
  } | null>(null);

  return (
    <div className={clsx(
      "py-8 px-4 lg:px-14  ",
      bgColor
    )}>
      <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-6">
        {title}
      </h2>
      <div className="dark:prose-invert mb-8 text-lg text-zinc-900">
        <p className="whitespace-pre-line">{content.text}</p>
      </div>
      <div
        className={clsx(
          "grid gap-4",
          content.media.grid || "grid-cols-1 md:grid-cols-2",
        )}
      >
        {content.media.images.map((image, index) => (
          <div key={index} className="relative">
            <div
              className={clsx(
                "overflow-hidden rounded-lg",
                "flex items-center justify-center",
                image.isClickable &&
                  "cursor-pointer transition-opacity hover:opacity-90",
              )}
              onClick={() =>
                image.isClickable &&
                setSelectedImage({
                  url: image.url,
                  caption: image.caption,
                })
              }
            >
              <img
                src={getLectureMediaUrl(image.url)}
                alt={image.alt}
                className="h-full w-full rounded-lg object-cover"
                style={image.width ? { width: image.width } : undefined}
              />
              {image.isClickable && (
                <div className="absolute bottom-2 right-2 rounded-full bg-orange-600 p-1.5">
                  <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
            {image.caption && (
              <p className="mt-2 text-lg text-center text-zinc-900 dark:text-zinc-400">
                {image.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      <Dialog
        open={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-4xl rounded-lg bg-white shadow-xl dark:bg-zinc-900">
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute right-4 top-4 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
              <img
                src={getLectureMediaUrl(selectedImage?.url || "")}
                alt="Enlarged view"
                className="rounded-lg"
              />
              {selectedImage?.caption && (
                <p className="p-4 text-center text-sm text-zinc-600 dark:text-zinc-300">
                  {selectedImage.caption}
                </p>
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
