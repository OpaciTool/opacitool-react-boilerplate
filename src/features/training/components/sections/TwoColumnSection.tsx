import { getLectureMediaUrl } from "../../lib/getLectureMedia";

interface TwoColumnSectionProps {
  title: string;
  content: {
    text: string;
    media: {
      columns: Array<{
        image: {
          url: string;
          alt: string;
          width?: string;
        };
        title: string;
        text: string;
      }>;
    };
  };
}

export function TwoColumnSection({ title, content }: TwoColumnSectionProps) {
  return (
    <div className="py-8 first:pt-0 last:pb-0">
      {title && (
        <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-white">
          {title}
        </h2>
      )}

      {content.text && (
        <p className="mb-8 text-zinc-600 dark:text-zinc-400">{content.text}</p>
      )}

      <div className="flex gap-8">
        {content.media.columns.map((column, index) => (
          <div key={index} className="flex-1">
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white lg:text-center">
              {column.title}
            </h3>
            <div className="lg:flex lg:justify-center">
              <img
                src={getLectureMediaUrl(column.image.url)}
                alt={column.image.alt}
                className="mb-4 w-full lg:w-auto"
                style={{ width: column.image.width }}
              />
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">{column.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
