import { useState } from "react";
import { Text } from "@/shared/ui";
import clsx from "clsx";
import type { FlippableImageGridContent } from "../LectureContent";

interface FlippableImageGridProps {
  title: string;
  content: FlippableImageGridContent;
  bgColor?: string;
}

export function FlippableImageGridSection({ title, content, bgColor }: FlippableImageGridProps) {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const toggleCard = (index: number) => {
    setFlippedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className={clsx(
      " py-8 px-4 lg:px-14",
      bgColor,
    )}>
      <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-6">
        {title}
      </h2>
      <div className="text-lg text-zinc-900 dark:prose-invert max-w-none mb-8">
        <p className="whitespace-pre-line">{content.text}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {content.media.images.map((image, index) => (
          <div 
            key={index}
            className="relative h-64 cursor-pointer"
            style={{ perspective: "1000px" }}
            onClick={() => toggleCard(index)}
          >
            <div
              className={clsx(
                "absolute w-full h-full transition-all duration-500",
                "preserve-3d"
              )}
              style={{
                transform: flippedCards.includes(index) ? "rotateY(180deg)" : "rotateY(0deg)",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Front of card */}
              <div 
                className="absolute w-full h-full shadow-lg"
                style={{ backfaceVisibility: "hidden" }}
              >
                <img
                  src={image.front.url}
                  alt={image.front.alt}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              {/* Back of card */}
              <div 
                className="absolute w-full h-full bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 flex items-center justify-center text-center shadow-lg"
                style={{ 
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)"
                }}
              >
                <p className="text-xl text-zinc-900 dark:text-white">{image.back.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 