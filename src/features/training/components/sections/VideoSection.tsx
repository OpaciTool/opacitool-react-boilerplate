import clsx from "clsx";
import { getLectureMediaUrl } from "../../lib/getLectureMedia";

interface VideoSectionProps {
  title: string;
  content: {
    text: string;
    media: {
      type: "video";
      url: string;
      alt: string;
      caption?: string;
      width?: string;
    };
  };
  bgColor?: string;
  layout?: "text-left" | "text-right" | "centered";
}

export function VideoSection({
  title,
  content,
  bgColor,
  layout = "centered",
}: VideoSectionProps) {
  const videoElement = (
    <div className={clsx("rounded-lg dark:bg-zinc-900", content.media.width)}>
      <video controls className="w-full rounded-lg">
        <source src={getLectureMediaUrl(content.media.url)} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {content.media.caption && (
        <p className="mt-2 text-center text-sm italic text-zinc-900 dark:text-zinc-300">
          {content.media.caption}
        </p>
      )}
    </div>
  );

  if (layout === "centered") {
    return (
      <div className={clsx("px-4 py-8 lg:px-14 dark:bg-zinc-900", bgColor)}>
        <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-300">
          {title}
        </h2>
        <div className="dark:prose-invert mb-8 text-lg text-zinc-900 dark:text-zinc-400">
          <p className="whitespace-pre-line">{content.text}</p>
        </div>
        <div className="flex justify-center">{videoElement}</div>
      </div>
    );
  }

  const isTextLeft = layout === "text-left";

  return (
    <div className={clsx("px-4 py-8 lg:px-14 dark:bg-zinc-900", bgColor)}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {!isTextLeft && <div className="flex items-center">{videoElement}</div>}
        <div className="flex flex-col justify-center">
          <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-300">
            {title}
          </h2>
          <p className="whitespace-pre-line text-lg text-zinc-900 dark:text-zinc-400">
            {content.text}
          </p>
        </div>
        {isTextLeft && <div className="flex items-center">{videoElement}</div>}
      </div>
    </div>
  );
}
