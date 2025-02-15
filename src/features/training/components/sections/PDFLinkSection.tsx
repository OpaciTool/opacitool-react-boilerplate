import { getLectureMediaUrl } from "../../lib/getLectureMedia";

type PDFLinkSectionProps = {
  title: string;
  content: {
    text: string;
    media: {
      type: "pdf";
      url: string;
      alt: string;
      thumbnail: string; // URL to the preview image
      caption?: string; // Add optional caption
    };
  };
  bgColor?: string;
  divider?: boolean;
  dividerStyle?: string;
};

export function PDFLinkSection({
  title,
  content,
  bgColor = "bg-white",
}: PDFLinkSectionProps) {
  return (
    <div className={`px-4 py-8 lg:px-14 dark:bg-zinc-900 ${bgColor}`}>
      <div className="grid items-center gap-4 lg:grid-cols-2">
        <div className="text-center">
          <a
            href={getLectureMediaUrl(content.media.url)}
            target="_blank"
            rel="noopener noreferrer"
            className="block cursor-pointer transition-opacity hover:opacity-90"
          >
            <img
              src={getLectureMediaUrl(content.media.thumbnail)}
              alt={content.media.alt}
              className="mx-auto w-[80%]"
            />
          </a>
          {content.media.caption && (
            <p className="mt-2 text-center text-sm italic text-zinc-500">
              {content.media.caption}
            </p>
          )}
        </div>
        <div>
          {title && (
            <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-300">
              {title}
            </h2>
          )}
          <div 
            className="whitespace-pre-line text-lg text-zinc-900 dark:text-zinc-400"
            dangerouslySetInnerHTML={{ __html: content.text }}
          />
        </div>
      </div>
    </div>
  );
}

