import clsx from "clsx";
import { getLectureMediaUrl } from "@/features/training/lib/getLectureMedia";

interface ImageSectionProps {
  content: {
    media: {
      url: string;
      alt: string;
      width?: string;
      caption?: string;
    };
  };
  imageClassName?: string;
  bgColor?: string;
  divider?: boolean;
  dividerStyle?: string;
}

export function ImageSection({
  content,
  imageClassName,
  bgColor,
  divider,
  dividerStyle,
}: ImageSectionProps) {
  return (
    <div className={clsx("dark:bg-zinc-900 dark:text-zinc-300", bgColor)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={getLectureMediaUrl(content.media.url)}
              alt={content.media.alt}
              className={clsx(
                "h-auto rounded-lg",
                content.media.width,
                imageClassName
              )}
            />
            {content.media.caption && (
              <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
                {content.media.caption}
              </p>
            )}
          </div>
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