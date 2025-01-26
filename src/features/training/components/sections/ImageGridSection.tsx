interface ImageGridSectionProps {
  title: string;
  content: {
    text: string;
    media: {
      type: "image-grid";
      images: Array<{
        url: string;
        alt: string;
      }>;
    };
  };
}

export function ImageGridSection({ title, content }: ImageGridSectionProps) {
  return (
    <div className="py-8 first:pt-0 last:pb-0">
      <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-6">
        {title}
      </h2>
      <div className="prose prose-zinc dark:prose-invert max-w-none mb-8">
        <p className="whitespace-pre-line">{content.text}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {content.media.images.map((image, index) => (
          <div key={index} className=" overflow-hidden">
            <img
              src={image.url}
              alt={image.alt}
              className="w-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
} 