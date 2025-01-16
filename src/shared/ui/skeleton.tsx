import clsx from "clsx";
import React, { useId } from "react";

type SkeletonProps = Omit<React.ComponentPropsWithoutRef<"div">, "children"> & {
  className?: string;
  "data-testid"?: string;
};

export function Skeleton({
  className,
  "data-testid": dataTestId,
}: SkeletonProps) {
  const key = useId();
  return (
    <div
      className={clsx(
        "min-h-6 animate-pulse bg-zinc-950/10 dark:bg-zinc-50/10",
        className,
      )}
      data-testid={dataTestId}
      key={key}
    />
  );
}
