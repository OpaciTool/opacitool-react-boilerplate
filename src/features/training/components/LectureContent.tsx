import { useParams } from "react-router-dom";
import { navigationData } from "../data/navigation";
import { Divider, Heading, Text } from "@/shared/ui";
import { BookmarkIcon as BookmarkOutlineIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkFilledIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import { Tooltip } from "@/shared/ui";
import { useState, useEffect } from "react";
import { SplitSection } from "./sections/SplitSection";
import { TabsSection } from "./sections/TabsSection";
import type { Quiz as QuizType } from "../types/quiz";
import { Quiz } from "./Quiz";

export type TabContent = {
  description: string;
  sections?: Array<
    | {
        title: string;
        description: string;
        images: Array<{
          url: string;
          alt: string;
          caption: string;
        }>;
      }
    | {
        title: string;
        type: "split";
        layout?: "text-left" | "text-right";
        content: {
          text: string;
          media?: {
            type: "image";
            url: string;
            alt?: string;
          };
        };
      }
  >;
};

type SplitSectionMedia = {
  type: "image" | "video" | "pdf";
  url: string;
  alt?: string;
  isClickable?: boolean;
  caption?: string;
};

type LectureContent = {
  lectureId: string;
  moduleId: number;
  title: string;
  sections: Array<
    | {
        id: string;
        type: "split";
        layout?: "text-left" | "text-right";
        title: string;
        content: {
          text: string;
          media?: SplitSectionMedia;
        };
      }
    | {
        id: string;
        type: "image-grid";
        title: string;
        content: {
          text: string;
          media: {
            type: "image-grid";
            images: Array<{ url: string; alt: string }>;
          };
        };
      }
    | {
        id: string;
        type: "video";
        title: string;
        content: {
          text: string;
          media: {
            type: "video";
            url: string;
            alt: string;
          };
        };
      }
    | {
        id: string;
        type: "tabs";
        title: string;
        content: {
          tabs: Array<{
            id: string;
            label: string;
            content: TabContent;
          }>;
        };
      }
    | {
        id: string;
        type: "quiz";
        title: string;
        content: QuizType;
      }
  >;
};

// Import lecture content
import lecture1 from "../data/content/module-1/lecture-1.json";
import lecture2 from "../data/content/module-1/lecture-2.json";
import lecture3 from "../data/content/module-1/lecture-3.json";
import lecture4 from "../data/content/module-1/lecture-4.json";
import quiz1 from "../data/content/module-1/quiz.json";

import { ImageGridSection } from "./sections/ImageGridSection";
import { VideoSection } from "./sections/VideoSection";

// Add type assertion after imports
const lectures = {
  "about-course": lecture1 as LectureContent,
  "visible-emissions-opacity": lecture2 as LectureContent,
  "smoke-school": lecture3 as LectureContent,
  "ve-observations-importance": lecture4 as LectureContent,
  "module-1-quiz": quiz1 as LectureContent,
};

export function LectureContent() {
  const { moduleSlug, lectureSlug } = useParams();
  const lecturePath = `/training/${moduleSlug}/${lectureSlug}`;
  
  const [isBookmarked, setIsBookmarked] = useState(() => 
    localStorage.getItem('lastVisitedLecture') === lecturePath
  );

  // Update bookmark state when route changes
  useEffect(() => {
    setIsBookmarked(localStorage.getItem('lastVisitedLecture') === lecturePath);
  }, [moduleSlug, lectureSlug, lecturePath]);

  const handleBookmark = () => {
    if (isBookmarked) {
      localStorage.removeItem('lastVisitedLecture');
      setIsBookmarked(false);
      toast.success('Bookmark removed');
    } else {
      localStorage.setItem('lastVisitedLecture', lecturePath);
      setIsBookmarked(true);
      toast.success('Lecture bookmarked');
    }
  };

  // Find current module and lecture
  const currentModule = navigationData.find(
    (module) => module.slug === moduleSlug
  );

  const currentLecture = currentModule?.lectures.find(
    (lecture) => lecture.slug === lectureSlug
  );

  // Get lecture content
  const content = lectures[lectureSlug as keyof typeof lectures];


  if (!currentModule || !currentLecture) {
    return (
      <div className="p-6">
        <Text>Lecture not found</Text>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div>
        
      </div>
      <div className="lg:flex justify-between items-center">
        <div className="space-y-1">
          <Text className="text-sm text-zinc-500">{currentModule.title}</Text>
          <Heading>{currentLecture.title}</Heading>
        </div>
        <Tooltip content="Bookmark this lecture">
          <button
            onClick={handleBookmark}
            className="flex items-center gap-2 lg:px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            {isBookmarked ? (
              <>
                <BookmarkFilledIcon className="size-5 text-teal-400" />
                <span className="text-sm font-medium text-teal-400">Bookmarked</span>
              </>
            ) : (
              <>
                <BookmarkOutlineIcon className="size-5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300" />
                <span className="text-sm font-medium text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">Bookmark</span>
              </>
            )}
          </button>
        </Tooltip>
      </div>
      <Divider className="mt-6" />
      
      {/* Render lecture sections */}
      <div className="mt-6 space-y-8 w-[85%] mx-auto">
        {content?.sections.map((section) => {
          switch (section.type) {
            case "split":
              return (
                <SplitSection
                  key={section.id}
                  title={section.title}
                  content={section.content}
                  layout={section.layout}
                />
              );
            case "image-grid":
              return (
                <ImageGridSection
                  key={section.id}
                  title={section.title}
                  content={section.content}
                />
              );
            case "video":
              return (
                <VideoSection
                  key={section.id}
                  title={section.title}
                  content={section.content}
                />
              );
            case "tabs":
              return (
                <TabsSection
                  key={section.id}
                  title={section.title}
                  content={section.content}
                />
              );
            case "quiz":
              return (
                <Quiz
                  key={section.id}
                  quiz={section.content}
                  onComplete={(score) => console.log(`Quiz completed with score: ${score}`)}
                />
              );
            // Add other section types here later
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
} 