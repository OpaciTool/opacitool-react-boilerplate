import clsx from "clsx";


interface BulletedSplitSectionProps {
  title: string;
  content: {
    text: string;
    media?: {
      type: string;
      url: string;
      alt: string;
      caption?: string;
      width?: string;
      isClickable?: boolean;
      thumbnail?: string;
    };
  };
  bgColor?: string;
  layout?: "text-left" | "text-right";
  divider?: boolean;
  dividerStyle?: string;
}

export function BulletedSplitSection({
  title,
  content,
  bgColor,
  layout = "text-left",
  divider,
  dividerStyle,
}: BulletedSplitSectionProps) {


  // Function to process text and make parts after ":" bold
  const processText = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('•')) {
        const [bullet, ...rest] = paragraph.split(':');
        if (rest.length > 0) {
          return (
            <p key={index} className="mb-4">
              {bullet}:<span className="font-bold">{rest.join(':')}</span>
            </p>
          );
        }
      }
      return <p key={index} className="mb-4">{paragraph}</p>;
    });
  };

  return (
    <div className={clsx("px-4 py-8 lg:px-14", bgColor)}>
      <div className="mx-auto max-w-6xl">
        <div
          className={clsx(
            "grid grid-cols-1 gap-8 lg:grid-cols-2",
            layout === "text-right" && "lg:[&>*:first-child]:order-2"
          )}
        >
          <div className="flex flex-col justify-center">
            {title && (
              <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-white">
                {title}
              </h2>
            )}
            <div className="whitespace-pre-line text-lg text-zinc-900 dark:text-white">
              {processText(content.text)}
            </div>
          </div>

          {content.media && (
            <div className="flex items-center justify-center">
              {/* Rest of media handling code remains the same as SplitSection */}
            </div>
          )}
        </div>
      </div>
      {divider && dividerStyle && (
        <div className="mt-8">
          <div className={dividerStyle} />
        </div>
      )}
    </div>
  );
} 