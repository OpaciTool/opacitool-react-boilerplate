import clsx from "clsx";
import React, { useId } from "react";

type LoadingProps = Omit<React.ComponentPropsWithoutRef<"svg">, "children"> & {
  className?: string;
  "data-testid"?: string;
};

export function Spinner({ className }: LoadingProps) {
  const key = useId();
  return (
    <svg
      className={clsx(
        "h-5 w-5 animate-spin text-zinc-950 dark:bg-zinc-100",
        className,
      )}
      fill="none"
      key={key}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        fill="currentColor"
      ></path>
    </svg>
  );
}
