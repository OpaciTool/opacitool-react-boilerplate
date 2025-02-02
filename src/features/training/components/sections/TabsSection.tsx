import { useState } from "react";
import clsx from "clsx";
import type { TabContent } from "../LectureContent";
import { SplitSection } from "./SplitSection";
import { SectionDivider } from "../SectionDivider";

interface TabsSectionProps {
  title: string;
  content: {
    tabs: Array<{
      id: string;
      label: string;
      content: TabContent;
    }>;
  };
  bgColor?: string;
}

export function TabsSection({ title, content, bgColor }: TabsSectionProps) {
  const [activeTab, setActiveTab] = useState(content.tabs[0].id);

  return (
    <div className={clsx(
      "py-8 px-4 lg:px-14 last:pb-0",
      bgColor
    )}>
      <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-6">
        {title}
      </h2>
      
      {/* Tabs Navigation */}
      <div className="border-b border-zinc-200 dark:border-zinc-700">
        <nav className="flex gap-4" aria-label="Tabs">
          {content.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "px-4 py-2 text-base font-medium border-b-2 -mb-px transition-colors",
                activeTab === tab.id
                  ? "border-orange-600 text-orange-600 dark:text-orange-500"
                  : "border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-300"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6 prose prose-zinc dark:prose-invert">
        {content.tabs.map((tab) => (
          <div
            key={tab.id}
            className={clsx(
              "transition-opacity",
              activeTab === tab.id ? "block" : "hidden"
            )}
          >
            <TabContent content={tab.content} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TabContent({ content }: { content: TabContent }) {
  return (
    <div className="space-y-8">
      <p className="whitespace-pre-line text-lg text-zinc-900">{content.description}</p>
      
      {content.sections?.map((section, index) => {
        const sectionContent = 'images' in section ? (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
              {section.title}
            </h3>
            <p className="whitespace-pre-line text-lg text-zinc-900">{section.description}</p>
            <div className="flex gap-6">
              {section.images.map((image, imgIndex) => (
                <figure key={imgIndex} className=" " style={image.width ? { width: image.width } : undefined}>
                  <img 
                    src={image.url} 
                    alt={image.alt} 
                    className="w-full rounded-lg" 
                  />
                  <figcaption className="mt-2 text-sm text-center text-zinc-500 dark:text-zinc-400">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ) : (
          <SplitSection
            title={section.title}
            content={section.content}
            layout={section.layout}
          />
        );

        return (
          <div key={index}>
            {sectionContent}
            {section.divider && <SectionDivider className={section.dividerStyle} dividerStyleParent={section?.dividerStyleParent}/>}
          </div>
        );
      })}
    </div>
  );
}

