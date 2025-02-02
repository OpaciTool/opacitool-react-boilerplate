import clsx from 'clsx';

interface VideoSectionProps {
  title: string;
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
  bgColor?: string;
}

export function VideoSection({ title, content, bgColor }: VideoSectionProps) {
  return (
    <div className={clsx(
      "py-8 px-14",
      bgColor
    )}>
      <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-6">
        {title}
      </h2>
      <div className="text-zinc-900 text-lg dark:prose-invert mb-8">
        <p className="whitespace-pre-line">{content.text}</p>
      </div>
      <div className="flex justify-center">
        <video
          controls
          className="rounded-lg"
          style={content.media.width ? { width: content.media.width } : undefined}
        >
          <source src={content.media.url} type="video/mp4" />
          {content.media.alt}
        </video>
      </div>
    </div>
  );
} 