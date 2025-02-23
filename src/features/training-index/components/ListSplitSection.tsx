import clsx from "clsx";
import { getLectureMediaUrl } from "@/features/training/lib/getLectureMedia";

interface ListItem {
  text: string;
  image: {
    url: string;
    alt: string;
    width?: string;
  };
}

interface ListSplitSectionProps {
  title?: string;
  description?: string;
  content: {
    items: ListItem[];
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

export function ListSplitSection({
  title,
  description,
  content,
  bgColor,
  layout = "text-left",
  divider,
  dividerStyle,
}: ListSplitSectionProps) {
  return (
    <div className={clsx("w-full dark:bg-zinc-900 dark:text-zinc-300", bgColor)}>
      <div className="px-4 py-8 lg:px-14">
        <div
          className={clsx(
            "grid grid-cols-1 gap-8 lg:grid-cols-2",
            layout === "text-right" && "lg:[&>*:first-child]:order-2"
          )}
        >
          {/* Text Content with List */}
          <div className="flex flex-col justify-center">
            {title && (
              <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-white">
                {title}
              </h2>
            )}
            {description && (
              <p className="mb-6 text-base text-zinc-700 dark:text-zinc-300">
                {description}
              </p>
            )}
            <ul className="space-y-6">
              {content.items.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <img
                    src={getLectureMediaUrl(item.image.url)}
                    alt={item.image.alt}
                    className={clsx(
                      "h-auto rounded-lg",
                      item.image.width || "w-12"
                    )}
                  />
                  <p className="text-base text-zinc-700 dark:text-zinc-300">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
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
                  className="h-auto w-full rounded-lg"
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
    </div>
  );
} 