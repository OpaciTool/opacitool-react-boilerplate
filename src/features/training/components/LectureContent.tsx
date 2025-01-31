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
import { FlippableImageGridSection } from "./sections/FlippableImageGridSection";
import { TwoColumnSection } from "./sections/TwoColumnSection";

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
  width?: string;
};

export type ImageGridContent = {
  text: string;
  media: {
    type: "image-grid";
    grid?: string;
    images: Array<{
      url: string;
      alt: string;
      isClickable?: boolean;
      caption?: string;
    }>;
  };
};

export type FlippableImageGridContent = {
  text: string;
  media: {
    type: "flippable-image-grid";
    images: Array<{
      front: {
        url: string;
        alt: string;
      };
      back: {
        url: string;
        alt: string;
        text: string;
      };
    }>;
  };
};

type LectureContent = {
  lectureId: string;
  moduleId: number;
  title: string;
  sections: Array<
    | {
        id: string;
        type: "split";
        divider?: boolean;
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
        divider?: boolean;
        title: string;
        content: ImageGridContent | FlippableImageGridContent;
      }
    | {
        id: string;
        type: "video";
        divider?: boolean;
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
        divider?: boolean;
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
        divider?: boolean;
        title: string;
        content: QuizType;
      }
    | {
        id: string;
        type: "two-column";
        divider?: boolean;
        title: string;
        content: {
          text: string;
          media: {
            columns: Array<{
              image: {
                url: string;
                alt: string;
              };
              title: string;
              text: string;
            }>;
          };
        };
      }
  >;
};

// Import lecture content
import lecture1 from "../data/content/module-1/lecture-1.json";
import lecture2 from "../data/content/module-1/lecture-2.json";
import lecture3 from "../data/content/module-1/lecture-3.json";
import lecture4 from "../data/content/module-1/lecture-4.json";
import quiz1 from "../data/content/module-1/quiz.json";

// Import module 2 lectures
import lecture1Module2 from "../data/content/module-2/lecture-1.json";
import lecture2Module2 from "../data/content/module-2/lecture-2.json";
import lecture3Module2 from "../data/content/module-2/lecture-3.json";
import lecture4Module2 from "../data/content/module-2/lecture-4.json";
import lecture5Module2 from "../data/content/module-2/lecture-5.json";
import lecture6Module2 from "../data/content/module-2/lecture-6.json";
import quiz1Module2 from "../data/content/module-2/quiz.json";

// Import module 3 lectures
import lecture1Module3 from "../data/content/module-3/lecture-1.json";
import lecture2Module3 from "../data/content/module-3/lecture-2.json";
import lecture3Module3 from "../data/content/module-3/lecture-3.json";
import lecture4Module3 from "../data/content/module-3/lecture-4.json";
import lecture5Module3 from "../data/content/module-3/lecture-5.json";
import lecture6Module3 from "../data/content/module-3/lecture-6.json";
import lecture7Module3 from "../data/content/module-3/lecture-7.json";
import lecture8Module3 from "../data/content/module-3/lecture-8.json";
import quiz1Module3 from "../data/content/module-3/quiz.json";

// Import module 4 lectures
import lecture1Module4 from "../data/content/module-4/lecture-1.json";
import lecture2Module4 from "../data/content/module-4/lecture-2.json";
import lecture3Module4 from "../data/content/module-4/lecture-3.json";
import lecture4Module4 from "../data/content/module-4/lecture-4.json";
import quiz1Module4 from "../data/content/module-4/quiz.json";

import { ImageGridSection } from "./sections/ImageGridSection";
import { VideoSection } from "./sections/VideoSection";

// Add type assertion after imports
const lectures = {
  // Module 1
  "about-course": lecture1 as LectureContent,
  "visible-emissions-opacity": lecture2 as LectureContent,
  "smoke-school": lecture3 as LectureContent,
  "ve-observations-importance": lecture4 as LectureContent,
  "module-1-quiz": quiz1 as LectureContent,
  
  // Module 2
  "air-emission-types": lecture1Module2 as LectureContent,
  "plume-shapes": lecture2Module2 as LectureContent,
  "particulate-matter": lecture3Module2 as LectureContent,
  "particle-types": lecture4Module2 as LectureContent,
  "particles-and-light": lecture5Module2 as LectureContent,
  "emission-controls": lecture6Module2 as LectureContent,
  "module-2-quiz": quiz1Module2 as LectureContent,
  
  // Module 3
  "method-9-basics": lecture1Module3 as LectureContent,
  "sun-position": lecture2Module3 as LectureContent,
  "viewing-angle-distance": lecture3Module3 as LectureContent,
  "contrasting-background": lecture4Module3 as LectureContent,
  "atmospheric-conditions": lecture5Module3 as LectureContent,
  "steam-plumes": lecture6Module3 as LectureContent,
  "fugitive-emissions": lecture7Module3 as LectureContent,
  "equipment-needed": lecture8Module3 as LectureContent,
  "module-3-quiz": quiz1Module3 as LectureContent,

  // Module 4
  "documentation-procedure": lecture1Module4 as LectureContent,
  "calculating-average-opacity": lecture2Module4 as LectureContent,
  "auditing-form": lecture3Module4 as LectureContent, 
  "legal-aspects": lecture4Module4 as LectureContent,
  "module-4-quiz": quiz1Module4 as LectureContent,
};

// Add type guard function
function isFlippableGrid(content: ImageGridContent | FlippableImageGridContent): content is FlippableImageGridContent {
  return content.media.type === "flippable-image-grid";
}

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
                <div key={section.id}>
                  <SplitSection
                    title={section.title}
                    content={section.content}
                    layout={section.layout}
                  />
                  {section.divider && <Divider className="my-8" />}
                </div>
              );
            case "image-grid":
              return (
                <div key={section.id}>
                  {isFlippableGrid(section.content) ? (
                    <FlippableImageGridSection
                      title={section.title}
                      content={section.content}
                    />
                  ) : (
                    <ImageGridSection
                      title={section.title}
                      content={section.content}
                    />
                  )}
                  {section.divider && <Divider className="my-8" />}
                </div>
              );
            case "video":
              return (
                <div key={section.id}>
                  <VideoSection
                    title={section.title}
                    content={section.content}
                  />
                  {section.divider && <Divider className="my-8" />}
                </div>
              );
            case "tabs":
              return (
                <div key={section.id}>
                  <TabsSection
                    title={section.title}
                    content={section.content}
                  />
                  {section.divider && <Divider className="my-8" />}
                </div>
              );
            case "quiz":
              return (
                <div key={section.id}>
                  <Quiz
                    quiz={section.content}
                    onComplete={(score) => console.log(`Quiz completed with score: ${score}`)}
                  />
                  {section.divider && <Divider className="my-8" />}
                </div>
              );
            case "two-column":
              return (
                <div key={section.id}>
                  <TwoColumnSection
                    title={section.title}
                    content={section.content}
                  />
                  {section.divider && <Divider className="my-8" />}
                </div>
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