import { useParams } from "react-router-dom";
import { navigationData } from "../data/navigation";
import { Divider, Text } from "@/shared/ui";
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
import VisibleEmissionsForm from "./sections/VisibleEmissionsForm";
import FormulaSection from "./sections/FormulaSection";
import AngleFormulaSection from "./sections/AngleFormulaSection";
import MethodsComparison from "./MethodComparision";
import { SectionDivider } from "./SectionDivider";
import { ImageGridSection } from "./sections/ImageGridSection";
import { VideoSection } from "./sections/VideoSection";
import Method9Comparison from "./Method9Comparison";
import EPAMethod22Procedure from "./sections/EPAMethod22Procedure";
import { LectureNavigation } from "./LectureNavigation";
import { ScrollToTop } from "@/shared/components/ScrollToTop";
import { PDFLinkSection } from "./sections/PDFLinkSection";

type TabSection = {
  title: string;
  divider?: boolean;
  dividerStyle?: string;
  dividerStyleParent?: string;
} & (
  | {
      description: string;
      images: Array<{
        url: string;
        alt: string;
        caption: string;
        width?: string;
      }>;
    }
  | {
      type: "split";
      layout?: "text-left" | "text-right";
      content: {
        text: string;
        media?: {
          type: "image";
          url: string;
          alt: string;
          isClickable?: boolean;
          caption?: string;
          width?: string;
        };
      };
    }
);

export type TabContent = {
  description: string;
  sections?: TabSection[];
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
      width?: string;
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

type VideoSection = {
  id: string;
  type: "video";
  title: string;
  layout?: "text-left" | "text-right" | "centered";
  bgColor?: string;
  content: {
    text: string;
    media: {
      type: "video";
      url: string;
      alt: string;
      width?: string;
    };
  };
  divider?: boolean;
  dividerStyle?: string;
  dividerStyleParent?: string;
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
        dividerStyle?: string;
        dividerStyleParent?: string;
        layout?: "text-left" | "text-right";
        containerType?: "grid" | "flex-col";
        bgColor?: string;
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
        dividerStyle?: string;
        dividerStyleParent?: string;
        title: string;
        bgColor?: string;
        content: ImageGridContent | FlippableImageGridContent;
      }
    | {
        id: string;
        type: "video";
        divider?: boolean;
        dividerStyle?: string;
        dividerStyleParent?: string;
        title: string;
        bgColor?: string;
        layout?: "text-left" | "text-right" | "centered";
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
      }
    | {
        id: string;
        type: "tabs";
        divider?: boolean;
        dividerStyle?: string;
        dividerStyleParent?: string;
        title: string;
        bgColor?: string;
        content: {
          tabs: Array<{
            id: string;
            label: string;
            content: TabContent;
            divider?: boolean;
            dividerStyle?: string;
            dividerStyleParent?: string;
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
        dividerStyle?: string;
        dividerStyleParent?: string;
        title: string;
        bgColor?: string;
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
    | {
        id: string;
        type: "form";
        title: string;
        divider?: boolean;
        content?: {
          text?: string;
        };
      }
    | {
        id: string;
        type: "formula";
        title: string;
        divider?: boolean;
      }
    | {
        id: string;
        type: "angle-formula";
        title: string;
        divider?: boolean;
      }
    | {
        id: string;
        type: "method-comparison";
        title: string;
        divider?: boolean;
      }
    | {
        id: string;
        type: "method-9-comparison";
        title: string;
        divider?: boolean;
        dividerStyle?: string;
        dividerStyleParent?: string;
      }
    | {
        id: string;
        type: "method-22-form";
        title: string;
        divider?: boolean;
      }
    | {
        id: string;
        type: "pdf-link";
        divider?: boolean;
        dividerStyle?: string;
        dividerStyleParent?: string;

        title: string;
        layout?: "text-left" | "text-right";
        bgColor?: string;
        content: {
          text: string;
          media: {
            type: "pdf";
            url: string;
            alt: string;
            thumbnail: string;
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

// Import module 5 lectures
import lecture1Module5 from "../data/content/module-5/lecture-1.json";
import lecture2Module5 from "../data/content/module-5/lecture-2.json";
import lecture3Module5 from "../data/content/module-5/lecture-3.json";
import lecture4Module5 from "../data/content/module-5/lecture-4.json";
import lecture5Module5 from "../data/content/module-5/lecture-5.json";
import lecture6Module5 from "../data/content/module-5/lecture-6.json";
import lecture7Module5 from "../data/content/module-5/lecture-7.json";
import quiz1Module5 from "../data/content/module-5/quiz.json";

// Import module 6 lectures
import lecture1Module6 from "../data/content/module-6/lecture-1.json";
import lecture2Module6 from "../data/content/module-6/lecture-2.json";
import lecture3Module6 from "../data/content/module-6/lecture-3.json";
import lecture4Module6 from "../data/content/module-6/lecture-4.json";
import quiz1Module6 from "../data/content/module-6/quiz.json";

// Import module 7 lectures
import lecture1Module7 from "../data/content/module-7/lecture-1.json";
import lecture2Module7 from "../data/content/module-7/lecture-2.json";
import lecture3Module7 from "../data/content/module-7/lecture-3.json";
import lecture4Module7 from "../data/content/module-7/lecture-4.json";
import quiz1Module7 from "../data/content/module-7/quiz.json";
import QuestionMarkTooltip from "./QuestionMarkTooltip";

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

  // Module 5
  "rectangular-emission-points": lecture1Module5 as LectureContent,
  "multiple-sources": lecture2Module5 as LectureContent,
  "intermittent-emissions": lecture3Module5 as LectureContent,
  "tall-stacks-viewing-angles": lecture4Module5 as LectureContent,
  "predicting-steam-plumes": lecture5Module5 as LectureContent,
  "reacting-plumes": lecture6Module5 as LectureContent,
  "night-observations": lecture7Module5 as LectureContent,
  "module-5-quiz": quiz1Module5 as LectureContent,

  // Module 6
  "alternative-test-method-intro": lecture1Module6 as LectureContent,
  "epa-methods-203": lecture2Module6 as LectureContent,
  "epa-alt-082": lecture3Module6 as LectureContent,
  "epa-alt-152": lecture4Module6 as LectureContent,
  "module-6-quiz": quiz1Module6 as LectureContent,

  // Module 7
  "method-22-intro": lecture1Module7 as LectureContent,
  "method-22-observation": lecture2Module7 as LectureContent,
  "method-22-documentation": lecture3Module7 as LectureContent,
  "method-22-equipment": lecture4Module7 as LectureContent,
  "module-7-quiz": quiz1Module7 as LectureContent,
};

// Add type guard function
function isFlippableGrid(
  content: ImageGridContent | FlippableImageGridContent,
): content is FlippableImageGridContent {
  return content.media.type === "flippable-image-grid";
}

export function LectureContent() {
  const { moduleSlug, lectureSlug } = useParams();
  const lecturePath = `/training/${moduleSlug}/${lectureSlug}`;

  const [isBookmarked, setIsBookmarked] = useState(
    () => localStorage.getItem("lastVisitedLecture") === lecturePath,
  );

  // Update bookmark state when route changes
  useEffect(() => {
    setIsBookmarked(localStorage.getItem("lastVisitedLecture") === lecturePath);
  }, [moduleSlug, lectureSlug, lecturePath]);

  // Add this useEffect to scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [moduleSlug, lectureSlug]); // Dependencies ensure this runs on route change

  const handleBookmark = () => {
    if (isBookmarked) {
      localStorage.removeItem("lastVisitedLecture");
      setIsBookmarked(false);
      toast.success("Bookmark removed");
    } else {
      localStorage.setItem("lastVisitedLecture", lecturePath);
      setIsBookmarked(true);
      toast.success("Lecture bookmarked");
    }
  };

  // Find current module and lecture
  const currentModule = navigationData.find(
    (module) => module.slug === moduleSlug,
  );

  const currentLecture = currentModule?.lectures.find(
    (lecture) => lecture.slug === lectureSlug,
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
    <div className="relative min-h-svh bg-[#E4EAED]">
      <div className="">
        <div className="items-center justify-between bg-zinc-900 px-4 py-8 lg:flex lg:px-14">
          <div className="space-y-1">
            <h3 className="text-2xl text-zinc-300">{currentModule.title}</h3>
            <h2 className="text-4xl font-bold text-white dark:text-white">
              {currentLecture.title}
            </h2>
          </div>
          <div>
            <QuestionMarkTooltip />

            <Tooltip content="Bookmark this lecture">
              <button
                onClick={handleBookmark}
                className="flex items-center gap-2 rounded-lg transition-colors hover:text-white dark:hover:bg-zinc-800 pt-1"
                aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                {isBookmarked ? (
                  <>
                    <BookmarkFilledIcon className="size-10 text-teal-400" />
                    <span className="text-lg font-medium text-teal-400">
                      Bookmarked
                    </span>
                  </>
                ) : (
                  <>
                    <BookmarkOutlineIcon className="group size-10 text-zinc-400 hover:text-white dark:hover:text-zinc-300" />
                    <span className="text-lg font-medium text-zinc-200 hover:text-white dark:hover:text-zinc-300">
                      Bookmark
                    </span>
                  </>
                )}
              </button>
            </Tooltip>
          </div>
        </div>
        <Divider className="h-1 bg-black" />

        {/* Render lecture sections */}
        <div className="">
          {content?.sections.map((section) => {
            switch (section.type) {
              case "split":
                return (
                  <div key={section.id}>
                    <SplitSection
                      title={section.title}
                      content={section.content}
                      layout={section.layout}
                      containerType={section.containerType}
                      bgColor={section.bgColor}
                    />
                    {section.divider && (
                      <SectionDivider
                        className={section.dividerStyle}
                        dividerStyleParent={section?.dividerStyleParent}
                      />
                    )}
                  </div>
                );
              case "image-grid":
                return (
                  <div key={section.id}>
                    {isFlippableGrid(section.content) ? (
                      <FlippableImageGridSection
                        title={section.title}
                        content={section.content}
                        bgColor={section.bgColor}
                      />
                    ) : (
                      <ImageGridSection
                        title={section.title}
                        content={section.content}
                        bgColor={section.bgColor}
                      />
                    )}
                    {section.divider && (
                      <SectionDivider
                        className={section.dividerStyle}
                        dividerStyleParent={section?.dividerStyleParent}
                      />
                    )}
                  </div>
                );
              case "video":
                return (
                  <div key={section.id}>
                    <VideoSection
                      title={section.title}
                      content={section.content}
                      bgColor={section.bgColor}
                      layout={section.layout}
                    />
                    {section.divider && (
                      <SectionDivider
                        className={section.dividerStyle}
                        dividerStyleParent={section?.dividerStyleParent}
                      />
                    )}
                  </div>
                );
              case "tabs":
                return (
                  <div key={section.id}>
                    <TabsSection
                      title={section.title}
                      content={section.content}
                      bgColor={section.bgColor}
                    />
                    {section.divider && (
                      <SectionDivider
                        className={section.dividerStyle}
                        dividerStyleParent={section?.dividerStyleParent}
                      />
                    )}
                  </div>
                );
              case "quiz":
                return (
                  <div key={section.id}>
                    <Quiz
                      quiz={section.content}

                    />
                    {section.divider && <SectionDivider />}
                  </div>
                );
              case "two-column":
                return (
                  <div key={section.id}>
                    <TwoColumnSection
                      title={section.title}
                      content={section.content}
                      bgColor={section.bgColor}
                    />
                    {section.divider && (
                      <SectionDivider
                        className={section.dividerStyle}
                        dividerStyleParent={section?.dividerStyleParent}
                      />
                    )}
                  </div>
                );
              case "form":
                return (
                  <div key={section.id}>
                    <VisibleEmissionsForm />
                    {section.divider && <SectionDivider />}
                  </div>
                );
              case "formula":
                return (
                  <div key={section.id}>
                    <FormulaSection />
                    {section.divider && <SectionDivider />}
                  </div>
                );
              case "angle-formula":
                return (
                  <div key={section.id}>
                    <AngleFormulaSection />
                    {section.divider && <SectionDivider />}
                  </div>
                );
              case "method-comparison":
                return (
                  <div key={section.id}>
                    <MethodsComparison />
                    {section.divider && <SectionDivider />}
                  </div>
                );
              case "method-9-comparison":
                return (
                  <div key={section.id}>
                    <Method9Comparison />
                    {section.divider && (
                      <SectionDivider
                        className={section.dividerStyle}
                        dividerStyleParent={section?.dividerStyleParent}
                      />
                    )}
                  </div>
                );
              case "method-22-form":
                return (
                  <div key={section.id}>
                    <EPAMethod22Procedure />
                    {section.divider && <SectionDivider />}
                  </div>
                );
              case "pdf-link":
                return (
                  <div key={section.id}>
                    <PDFLinkSection
                      title={section.title}
                      content={section.content}
                      bgColor={section.bgColor}
                    />
                    {section.divider && (
                      <SectionDivider
                        className={section.dividerStyle}
                        dividerStyleParent={section?.dividerStyleParent}
                      />
                    )}
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      </div>

      {/* Add the navigation component */}
      <LectureNavigation />

      {/* Add ScrollToTop component */}
      <ScrollToTop />
    </div>
  );
}
