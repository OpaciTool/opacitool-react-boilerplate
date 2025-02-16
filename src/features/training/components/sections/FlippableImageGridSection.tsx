import { useState } from "react";
import clsx from "clsx";
import type { FlippableImageGridContent } from "../LectureContent";
import { getLectureMediaUrl } from "../../lib/getLectureMedia";


interface FlippableImageGridProps {
  title: string;
  content: FlippableImageGridContent;
  bgColor?: string;
}

export function FlippableImageGridSection({
  title,
  content,
  bgColor,
}: FlippableImageGridProps) {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);


  const toggleCard = (index: number) => {
    setFlippedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div className={clsx("px-4 py-8 lg:px-14 dark:bg-zinc-900", bgColor)}>
      <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-300">
        {title}
      </h2>
      <div className="dark:prose-invert mb-8 max-w-none text-lg text-zinc-900 dark:text-zinc-400">
        <p className="whitespace-pre-line">{content.text}</p>
      </div>
      <div role="list" className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {content.media.images.map((image, index) => (
          <div
            key={index}
            role="listitem"
            className="relative h-64 cursor-pointer"
            style={{ perspective: "1000px" }}
            onClick={() => toggleCard(index)}
          >
            <div
              className={clsx(
                "absolute h-full w-full transition-all duration-500",
                "preserve-3d"
              )}
              style={{
                transform: flippedCards.includes(index)
                  ? "rotateY(180deg)"
                  : "rotateY(0deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front of card */}
              <div
                className="absolute h-full w-full shadow-lg"
                style={{ backfaceVisibility: "hidden" }}
              >
                <img
                  src={getLectureMediaUrl(image.front.url)}
                  alt={image.front.alt}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>

              {/* Back of card */}
              <div
                className="absolute flex h-full w-full items-center justify-center rounded-lg bg-zinc-100 p-4 text-center shadow-lg dark:bg-zinc-800"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <p className="text-xl text-zinc-900 dark:text-white">
                  {image.back.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
