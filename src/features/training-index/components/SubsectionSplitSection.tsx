import { useState } from "react";
import clsx from "clsx";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getLectureMediaUrl } from "@/features/training/lib/getLectureMedia";


interface Subsection {
  heading: string;
  description: string;
  headingStyle?: string;
}

interface SubsectionSplitSectionProps {
  title?: string;
  description?: string;
  titleStyle?: string;
  content: {
    subsections: Subsection[];
    media?: {
      type: string;
      url: string;
      alt: string;
      caption?: string;
      width?: string;
      isClickable?: boolean;
    };
  };
  bgColor?: string;
  layout?: "text-left" | "text-right";
  divider?: boolean;
  dividerStyle?: string;
  flexLayout?: boolean;
}

export function SubsectionSplitSection({
  title,
  description,
  titleStyle,
  content,
  bgColor,
  layout = "text-left",
  divider,
  dividerStyle,
  flexLayout = false,
}: SubsectionSplitSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={clsx("pt-12 dark:bg-zinc-900 dark:text-zinc-300", bgColor)}>
      <div className=" px-4 py-8 lg:px-14">
        <div className={clsx(
          "grid gap-8",
          layout === "text-left" 
            ? "lg:grid-cols-[1.5fr,1fr]" 
            : "lg:grid-cols-[1fr,1.5fr]",
          layout === "text-right" && "lg:[&>div:first-child]:order-2"
        )}>
          <div>
            {title && (
              <h2 className={clsx(
                "mb-6 text-2xl font-semibold text-zinc-900 dark:text-white",
                titleStyle
              )}>
                {title}
              </h2>
            )}
            {description && (
              <p className="mb-8 text-lg text-zinc-900 dark:text-zinc-400">
                {description}
              </p>
            )}
            <div className="space-y-8">
              {content.subsections.map((subsection, index) => (
                <div key={index}>
                  {flexLayout ? (
                    <div className="">
                      <strong className={clsx(
                        "text-zinc-900 dark:text-white mr-1",
                        subsection.headingStyle
                      )}>
                        {subsection.heading}
                      </strong>
                      <span className="text-lg text-zinc-900 dark:text-zinc-400">
                        {subsection.description}
                      </span>
                    </div>
                  ) : (
                    <>
                      <h3 className={clsx(
                        "mb-2 font-semibold text-zinc-900 dark:text-white",
                        subsection.headingStyle
                      )}>
                        {subsection.heading}
                      </h3>
                      <p className="text-lg text-zinc-900 dark:text-zinc-400">
                        {subsection.description}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Media Content */}
          {content.media && (
            <div className="flex items-center justify-center">
              <div className={clsx("relative", content.media.width)}>
                <img
                  src={getLectureMediaUrl(content.media.url)}
                  alt={content.media.alt}
                  className={clsx(
                    "w-full rounded-lg",
                    content.media.isClickable && "cursor-pointer"
                  )}
                  onClick={() => content.media?.isClickable && setIsModalOpen(true)}
                />
                {content.media.caption && (
                  <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
                    {content.media.caption}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Image Modal */}
        {content.media?.isClickable && (
          <Dialog
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

            <div className="fixed inset-0 flex max-h-screen items-center justify-center overflow-y-auto p-4">
              <Dialog.Panel className="mx-auto max-w-4xl overflow-y-auto rounded-lg bg-white shadow-xl dark:bg-zinc-900">
                <div className="relative overflow-auto">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute right-4 top-4 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                    aria-label="Close modal"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                  <img
                    src={getLectureMediaUrl(content.media.url)}
                    alt={content.media.alt}
                    className="max-h-[90vh] rounded-lg"
                  />
                  {content.media.caption && (
                    <p className="p-4 text-center italic text-sm text-zinc-500 dark:text-zinc-300">
                      {content.media.caption}
                    </p>
                  )}
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </div>

      {/* Divider */}
      {divider && dividerStyle && (
        <div className="mt-8">
          <div className={dividerStyle} />
        </div>
      )}
    </div>
  );
} 