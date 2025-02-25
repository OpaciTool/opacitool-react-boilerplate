import clsx from "clsx";
import { getLectureMediaUrl } from "@/features/training/lib/getLectureMedia";

interface ImageContentSplitSectionProps {
  title?: string;
  titleStyle?: string;
  content: {
    text: string;
    contentImage: {
      url: string;
      alt: string;
      width?: string;
    };
    media?: {
      type: string;
      url: string;
      alt: string;
      caption?: string;
      width?: string;
    };
  };
  bgColor?: string;
  layout?: "text-left" | "text-right";
  divider?: boolean;
  dividerStyle?: string;
}

export function ImageContentSplitSection({
  title,
  titleStyle,
  content,
  bgColor,
  layout = "text-left",
  divider,
  dividerStyle,
}: ImageContentSplitSectionProps) {
  return (
    <div className={clsx("py-12 dark:bg-zinc-900 dark:text-zinc-400", bgColor)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={clsx(
            "grid gap-8",
            layout === "text-left"
              ? "lg:grid-cols-[1.5fr,1fr]"
              : "lg:grid-cols-[1fr,1.5fr]",
            layout === "text-right" && "lg:[&>div:first-child]:order-2",
          )}
        >
          <div>
            {title && (
              <h2
                className={clsx(
                  "mb-6 text-2xl font-semibold text-zinc-900 dark:text-white",
                  titleStyle,
                )}
              >
                {title}
              </h2>
            )}

            {/* Content Image */}
            <div className="mb-6 flex items-start gap-2">
              <img
                src={getLectureMediaUrl(content.contentImage.url)}
                alt={content.contentImage.alt}
                className={clsx(
                  "h-auto rounded-lg",
                  content.contentImage.width || "w-full",
                )}
              />

              {/* Text Content */}
              <div className="text-lg text-zinc-900 dark:text-zinc-400">
                <div
                  className="whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: content.text,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Media Content */}
          {content.media && (
            <div className="flex items-center justify-center">
              <div
                className={clsx(
                  "relative test",
                  content.media.width,
                )}
              >
                <img
                  src={getLectureMediaUrl(content.media.url)}
                  alt={content.media.alt}
                  className={clsx(
                    " w-full rounded-lg",
                    
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
