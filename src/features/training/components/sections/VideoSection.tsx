interface VideoSectionProps {
  title: string;
  content: {
    text: string;
    media: {
      type: "video";
      url: string;
      alt: string;
      poster?: string;
    };
  };
}

export function VideoSection({ title, content }: VideoSectionProps) {
  return (
    <div className="py-8 first:pt-0 last:pb-0">
      <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-6">
        {title}
      </h2>
      <div className="prose prose-zinc dark:prose-invert max-w-none mb-8">
        <p className="whitespace-pre-line">{content.text}</p>
      </div>
      <div className="aspect-video rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <video
          controls
          className="w-full h-full"
          poster={content.media.poster}
          preload="metadata"
        >
          <source src={content.media.url} type="video/mp4" />
          {content.media.alt}
        </video>
      </div>
    </div>
  );
} 