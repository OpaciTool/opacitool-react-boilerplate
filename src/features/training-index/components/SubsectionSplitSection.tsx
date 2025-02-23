import clsx from "clsx";
import { getLectureMediaUrl } from "@/features/training/lib/getLectureMedia";


interface Subsection {
  heading: string;
  description: string;
  headingStyle?: string;
}

interface SubsectionSplitSectionProps {
  title?: string;
  description?: string;
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
}

export function SubsectionSplitSection({
  title,
  content,
  bgColor,
  layout = "text-left",
  divider,
  dividerStyle,
  description
}: SubsectionSplitSectionProps) {


  return (
    <div className={clsx("w-full dark:bg-zinc-900 dark:text-zinc-300", bgColor)}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 dark:bg-zinc-900 dark:text-zinc-300">
        <div
          className={clsx(
            "grid grid-cols-1 gap-8 lg:grid-cols-2",
            layout === "text-right" && "lg:[&>*:first-child]:order-2"
          )}
        >
          {/* Text Content with Subsections */}
          <div className="flex flex-col justify-center">
            {title && (
              <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-white">
                {title}
              </h2>
            )}
            {description && (
              <p className="mb-6 text-base text-zinc-900 dark:text-zinc-300">
                {description}
              </p>
            )}
            <div className="space-y-6">
              {content.subsections.map((subsection, index) => (
                <div key={index} className="space-y-2">
                  <h3 
                    className={clsx(
                      "text-lg font-medium text-zinc-900 dark:text-white",
                      subsection.headingStyle
                    )}
                  >
                    {subsection.heading}
                  </h3>
                  <p className="text-base text-zinc-700 dark:text-zinc-300">
                    {subsection.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Media Content */}
          {content.media && (
            <div className="flex items-center justify-center">
              <div 
                className={clsx(
                  "relative",
                  content.media.width ? content.media.width : "w-full"
                )}
              >
                <img
                  src={getLectureMediaUrl(content.media.url)}
                  alt={content.media.alt}
                  className={clsx(
                    "h-auto w-full rounded-lg",
                    content.media.isClickable && "cursor-pointer"
                  )}
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