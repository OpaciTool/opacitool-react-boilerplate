import { getLectureMediaUrl } from "@/features/training/lib/getLectureMedia";
import clsx from "clsx";

interface Column {
  title: string;
  description: string;
  image: {
    url: string;
    alt: string;
    width?: string;
  };
}

interface TwoColumnDividerSectionProps {
  title?: string;
  description?: string;
  columns: [Column, Column]; // Exactly two columns
  bgColor?: string;
  divider?: boolean;
  dividerStyle?: string;
}

export function TwoColumnDividerSection({
  title,
  description,
  columns,
  bgColor,
  divider,
  dividerStyle
}: TwoColumnDividerSectionProps) {
  return (
    <div className={clsx("w-full dark:bg-zinc-900", bgColor)}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main title and description */}
        {(title || description) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base text-zinc-700 dark:text-zinc-300">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Two columns with divider */}
        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* First column */}
          <div className="flex flex-col items-center">
            <h3 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-white">
              {columns[0].title}
            </h3>
            <img
              src={getLectureMediaUrl(columns[0].image.url)}
              alt={columns[0].image.alt}
              className={clsx(
                "mb-6 h-auto rounded-lg",
                columns[0].image.width || "w-[300px]"
              )}
            />
            <p className="text-left text-base text-zinc-700 dark:text-zinc-300 px-6">
              {columns[0].description}
            </p>
          </div>

          {/* Vertical Divider */}
          <div className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 lg:block">
            <div className="h-full w-1 bg-teal-500" />
          </div>

          {/* Second column */}
          <div className="flex flex-col items-center">
            <h3 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-white">
              {columns[1].title}
            </h3>
            <img
              src={getLectureMediaUrl(columns[1].image.url)}
              alt={columns[1].image.alt}
              className={clsx(
                "mb-6 h-auto rounded-lg",
                columns[1].image.width || "w-[300px]"
              )}
            />
            <p className="text-left text-base text-zinc-700 dark:text-zinc-300 px-6">
              {columns[1].description}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      {divider && dividerStyle && (
        <div className="mt-8">
          <div className={dividerStyle} />
        </div>
      )}
    </div>
  );
} 