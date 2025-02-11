import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { getLectureMediaUrl } from "../../lib/getLectureMedia";

interface ImageContent {
  url: string;
  alt?: string;
  caption?: string;
  isClickable?: boolean;
  width?: string;
}

interface ImageGridSectionProps {
  title: string;
  content: {
    text: string;
    media: {
      type: "image-grid";
      images: ImageContent[];
      grid?: string;
    };
  };
  bgColor?: string;
}

export function ImageGridSection({
  title,
  content,
  bgColor,
}: ImageGridSectionProps) {
  const [selectedImage, setSelectedImage] = useState<ImageContent | null>(null);

  const [loadingImages, setLoadingImages] = useState(
    new Array(content.media.images.length).fill(true),
  );

    // Handle the image loading completion
    const handleImageLoad = (index: number) => {
      setLoadingImages((prev) => {
        const updated = [...prev];
        updated[index] = false;
        return updated;
      });
    };

  return (
    <div className={clsx("px-4 py-8 lg:px-14", bgColor)}>
      <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-white">
        {title}
      </h2>
      {content.text && (
        <div className="mb-8 text-lg text-zinc-900 dark:prose-invert">
          <p className="whitespace-pre-line">{content.text}</p>
        </div>
      )}
      <div
        role="list"
        className={clsx(
          "grid gap-4",
          content.media.grid || "grid-cols-1 md:grid-cols-2",
        )}
      >
        {content.media.images.map((image, index) => (
          <div 
            key={index} 
            className="relative"
            role="listitem"
          >
            <div
              className={clsx(
                "overflow-hidden rounded-lg",
                "flex items-center justify-center",
                image.isClickable &&
                  "cursor-pointer transition-opacity hover:opacity-90",
              )}
              onClick={() => image.isClickable && setSelectedImage(image)}
            >
              <div className="relative">
                {loadingImages[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-600 dark:border-zinc-600 dark:border-t-zinc-300"></div>
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        Loading...
                      </span>
                    </div>
                  </div>
                )}
                <img
                  src={getLectureMediaUrl(image.url)}
                  alt={image.alt}
                  className={clsx(
                    "h-full w-full rounded-lg object-cover",
                    loadingImages[index] && "invisible",
                  )}
                  onLoad={() => handleImageLoad(index)}
                  onError={() => handleImageLoad(index)}
                  style={image.width ? { width: image.width } : undefined}
                />
                {image.isClickable && (
                  <div
                    data-testid={`magnifying-glass-icon-${index}`}
                    className="absolute bottom-2 right-2 rounded-full bg-orange-600 p-1.5"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
            </div>
            {image.caption && (
              <p className="mt-2 text-center text-lg text-zinc-900 dark:text-zinc-400">
                {image.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      <Dialog
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-lg bg-white p-2 dark:bg-zinc-900">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            {selectedImage && (
              <>
                <img
                  src={getLectureMediaUrl(selectedImage.url)}
                  alt={selectedImage.alt}
                  className="max-h-[80vh] rounded-lg"
                />
                {selectedImage.caption && (
                  <p className="p-4 text-center text-sm text-zinc-600 dark:text-zinc-300">
                    {selectedImage.caption}
                  </p>
                )}
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
