import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Text } from "@/shared/ui";
import clsx from "clsx";

interface ImageGridSectionProps {
  title: string;
  content: {
    text: string;
    media: {
      type: "image-grid";
      images: Array<{
        url: string;
        alt: string;
        isClickable?: boolean;
        caption?: string;
      }>;
    };
  };
}

export function ImageGridSection({ title, content }: ImageGridSectionProps) {
  const [selectedImage, setSelectedImage] = useState<{url: string; caption?: string} | null>(null);

  return (
    <div className="py-8 first:pt-0 last:pb-0">
      <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-6">
        {title}
      </h2>
      <div className="prose prose-zinc dark:prose-invert max-w-none mb-8">
        <Text className="whitespace-pre-line">{content.text}</Text>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {content.media.images.map((image, index) => (
          <div key={index} className="relative">
            <div
              className={clsx(
                "rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800",
                "flex items-center justify-center",
                image.isClickable && "cursor-pointer hover:opacity-90 transition-opacity"
              )}
              onClick={() => image.isClickable && setSelectedImage({
                url: image.url,
                caption: image.caption
              })}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              {image.isClickable && (
                <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-orange-600">
                  <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
            {image.caption && (
              <p className="mt-2 text-sm text-center text-zinc-500 dark:text-zinc-400">
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
          <Dialog.Panel className="mx-auto max-w-4xl bg-white dark:bg-zinc-900 rounded-lg shadow-xl">
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
              <img
                src={selectedImage?.url || ''}
                alt="Enlarged view"
                className="rounded-lg"
              />
              {selectedImage?.caption && (
                <p className="p-4 text-sm text-center text-zinc-600 dark:text-zinc-300">
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