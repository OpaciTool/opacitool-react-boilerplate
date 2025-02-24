import clsx from "clsx";
import { getLectureMediaUrl } from "@/features/training/lib/getLectureMedia";

interface SplitSectionTwoImagesProps {
  title: string;
  content: {
    text: string;
    media: {
      images: [
        {
          url: string;
          alt: string;
          width?: string;
          caption?: string;
        },
        {
          url: string;
          alt: string;
          width?: string;
          caption?: string;
        }
      ];
    };
  };
  bgColor?: string;
  layout?: "text-left" | "text-right";
  containerType?: "grid" | "flex-col";
  divider?: boolean;
  dividerStyle?: string;
}

export function SplitSectionTwoImages({
  title,
  content,
  bgColor,
  layout = "text-left",
  containerType = "grid",
}: SplitSectionTwoImagesProps) {
  return (
    <div className={clsx("w-full dark:bg-zinc-900", bgColor)}>
      <div className=" px-4 py-8 lg:px-14">
        <div
          className={clsx(
            containerType === "grid"
              ? "grid grid-cols-1 gap-8 lg:grid-cols-2"
              : "flex flex-col space-y-8",
            layout === "text-right" && "lg:[&>*:first-child]:order-2"
          )}
        >
          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-white">
              {title}
            </h2>
            <div className="prose prose-zinc dark:prose-invert">
              {content.text.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-lg text-zinc-900 dark:text-zinc-400">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Images Content */}
          <div className="flex items-center">
            {content.media.images.map((image, index) => (
              <div
                key={index}
                className={clsx(
                  "flex justify-center gap-4",
                  image.width ? image.width : "w-full"
                )}
              >
                <div className="flex flex-col items-center">
                  <img
                    src={getLectureMediaUrl(image.url)}
                    alt={image.alt}
                    className="h-auto w-full rounded-lg"
                  />

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 