import { useParams } from "react-router-dom";
import { Divider, Text } from "@/shared/ui";
import { BookmarkIcon as BookmarkOutlineIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkFilledIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import { Tooltip } from "@/shared/ui";
import { useState, useEffect } from "react";
import { ScrollToTop } from "@/shared/components/ScrollToTop";
// Import lecture content
import lecture1 from "../data/content/module-1/lecture-1.json";
import lecture2 from "../data/content/module-2/lecture-1.json";
import lecture3 from "../data/content/module-2/lecture-2.json";
import lecture4 from "../data/content/module-3/lecture-1.json";
import lecture5 from "../data/content/module-3/lecture-2.json";
import lecture6 from "../data/content/module-3/lecture-3.json";


import { navigationIndexData } from "../data/navigation-index-data";
import { LectureNavigation } from "@/features/training/components/LectureNavigation";
import { SplitSection } from "@/features/training/components/sections/SplitSection";
import { SectionDivider } from "@/features/training/components/SectionDivider";
import QuestionMarkTooltip from "@/features/training/components/QuestionMarkTooltip";
import { SubsectionSplitSection } from "./SubsectionSplitSection";
import { TwoColumnDividerSection } from "./TwoColumnDividerSection";
import { SplitSectionTwoImages } from "./SplitSectionTwoImages";
import { ListSplitSection } from "./ListSplitSection";
import { ImageContentSplitSection } from "./ImageContentSplitSection";
import { ImageSection } from "./ImageSection";

type SplitSectionMedia = {
  type: "image" | "video" | "pdf";
  url: string;
  alt?: string;
  isClickable?: boolean;
  caption?: string;
  width?: string;
};

type SubsectionContent = {
  heading: string;
  description: string;
  headingStyle?: string;
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
        titleStyle?: string;
        content: {
          text: string;
          media?: SplitSectionMedia;
        };
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
        type: "subsection-split";
        title?: string;
        description?: string;
        divider?: boolean;
        dividerStyle?: string;
        layout?: "text-left" | "text-right";
        flexLayout?: boolean;
        bgColor?: string;
        content: {
          subsections: SubsectionContent[];
          media?: {
            type: string;
            url: string;
            alt: string;
            caption?: string;
            width?: string;
            isClickable?: boolean;
          };
        };
      }
    | {
        id: string;
        type: "two-column-divider";
        title?: string;
        description?: string;
        bgColor?: string;
        divider?: boolean;
        dividerStyle?: string;
        columns: [
          {
            title: string;
            description: string;
            image: {
              url: string;
              alt: string;
              width?: string;
            };
          },
          {
            title: string;
            description: string;
            image: {
              url: string;
              alt: string;
              width?: string;
            };
          },
        ];
      }
    | {
        id: string;
        type: "split-two-images";
        title: string;
        bgColor?: string;
        layout?: "text-left" | "text-right";
        containerType?: "grid" | "flex-col";
        divider?: boolean;
        dividerStyle?: string;
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
              },
            ];
          };
        };
      }
    | {
        id: string;
        type: "list-split";
        title?: string;
        description?: string;
        bgColor?: string;
        layout?: "text-left" | "text-right";
        divider?: boolean;
        dividerStyle?: string;
        content: {
          items: Array<{
            text: string;
            image: {
              url: string;
              alt: string;
              width?: string;
            };
          }>;
          media?: {
            type: string;
            url: string;
            alt: string;
            caption?: string;
            width?: string;
          };
        };
      }
    | {
        id: string;
        type: "image-content-split";
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
        layout?: "text-left" | "text-right";
        divider?: boolean;
        dividerStyle?: string;
        bgColor?: string;
      }
    | {
        id: string;
        type: "image";
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
  >;
};

// Add type assertion after imports
const lectures = {
  // Module 1
  "overview-and-settings": lecture1 as LectureContent,

  // Module 2
  "reference-mode-using-the-app": lecture2 as LectureContent,
  "reference-mode-using-the-dashboard": lecture3 as LectureContent,

  // Module 3
  "test-mode-using-the-app": lecture4 as LectureContent,
  "test-mode-performing-a-test": lecture5 as LectureContent,
  "test-mode-using-the-dashboard": lecture6 as LectureContent,
};

export function Lecture() {
  const { moduleSlug, lectureSlug } = useParams();
  const lecturePath = `/training-index/${moduleSlug}/${lectureSlug}`;

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
  const currentModule = navigationIndexData.find(
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
        <div className="relative items-center justify-between bg-zinc-900 px-4 py-8 dark:bg-black lg:flex lg:px-14">
          <div className="mb-4 space-y-1">
            <h3 className="text-xl text-zinc-300 lg:text-2xl">
              {currentModule.title}
            </h3>
            <h2 className="text-2xl font-bold text-white dark:text-zinc-300 lg:text-4xl">
              {currentLecture.title}
            </h2>
          </div>
          <div>
            <QuestionMarkTooltip />

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
                      titleStyle={section.titleStyle}
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

              case "subsection-split":
                return (
                  <div key={section.id}>
                    <SubsectionSplitSection
                      title={section.title}
                      description={section.description}
                      content={section.content}
                      layout={section.layout}
                      flexLayout={section.flexLayout}
                      bgColor={section.bgColor}
                      divider={section.divider}
                      dividerStyle={section.dividerStyle}
                    />
                  </div>
                );

              case "two-column-divider":
                return (
                  <div key={section.id}>
                    <TwoColumnDividerSection
                      title={section.title}
                      description={section.description}
                      columns={section.columns}
                      bgColor={section.bgColor}
                      divider={section.divider}
                      dividerStyle={section.dividerStyle}
                    />
                  </div>
                );

              case "split-two-images":
                return (
                  <div key={section.id}>
                    <SplitSectionTwoImages
                      title={section.title}
                      content={section.content}
                      layout={section.layout}
                      containerType={section.containerType}
                      bgColor={section.bgColor}
                      divider={section.divider}
                      dividerStyle={section.dividerStyle}
                    />
                    {section.divider && (
                      <SectionDivider
                        className={section.dividerStyle}
                      />
                    )}
                  </div>
                );

              case "list-split":
                return (
                  <div key={section.id}>
                    <ListSplitSection
                      title={section.title}
                      description={section.description}
                      content={section.content}
                      layout={section.layout}
                      bgColor={section.bgColor}
                      divider={section.divider}
                      dividerStyle={section.dividerStyle}
                    />
                    {section.divider && (
                      <SectionDivider
                        className={section.dividerStyle}
                      />
                    )}
                  </div>
                );

              case "image-content-split":
                return (
                  <div key={section.id}>
                    <ImageContentSplitSection
                      title={section.title}
                      titleStyle={section.titleStyle}
                      content={section.content}
                      layout={section.layout}
                      bgColor={section.bgColor}
                      divider={section.divider}
                      dividerStyle={section.dividerStyle}
                    />
                    {section.divider && (
                      <SectionDivider
                        className={section.dividerStyle}
                      />
                    )}
                  </div>
                );

              case "image":
                return (
                  <div key={section.id}>
                    <ImageSection
                      content={section.content}
                      imageClassName={section.imageClassName}
                      bgColor={section.bgColor}
                      divider={section.divider}
                      dividerStyle={section.dividerStyle}
                    />
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>
      </div>

      {/* Add the navigation component */}
      <LectureNavigation data={navigationIndexData} path="training-index" />

      {/* Add ScrollToTop component */}
      <ScrollToTop />
    </div>
  );
}
