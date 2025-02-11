import clsx from "clsx";

interface ImageLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

export function ImageLoader({ isLoading, children, className }: ImageLoaderProps) {
  return (
    <div className={clsx("relative", className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-600 dark:border-zinc-600 dark:border-t-zinc-300"></div>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Loading image...</span>
          </div>
        </div>
      )}
      <div className={clsx(isLoading && "invisible")}>
        {children}
      </div>
    </div>
  );
} 