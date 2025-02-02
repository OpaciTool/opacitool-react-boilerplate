import clsx from "clsx";

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
  console.log('SectionDivider className:', className);
  return (
    <div 
      className={clsx(
        "w-full ", // Default styles including height and background
        className // Custom styles will override the defaults
      )}
    />
  );
} 