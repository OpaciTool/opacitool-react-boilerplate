import clsx from "clsx";

interface SectionDividerProps {
  className?: string;
  dividerStyleParent?: string;
}

export function SectionDivider({ className, dividerStyleParent }: SectionDividerProps) {

  return (
    <div className={clsx(
      // Default styles including height and background
      dividerStyleParent // Custom styles will override the defaults
   )}
      
    >
      <div className={clsx(
         // Default styles including height and background
        className // Custom styles will override the defaults
      )}></div>
    </div>
  );
} 