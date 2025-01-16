import { twMerge } from "tailwind-merge";

export function Divider({
  soft = false,
  direction = "horizontal",
  className,
  ...props
}: {
  soft?: boolean;
  direction?: "horizontal" | "vertical";
} & React.ComponentPropsWithoutRef<"hr">) {
  return (
    <hr
      role="presentation"
      {...props}
      className={twMerge(
        direction === "horizontal" ? "w-full border-t" : "h-full border-l",
        soft && "border-zinc-950/5 dark:border-white/5",
        !soft && "border-zinc-950/10 dark:border-white/10",
        className,
      )}
    />
  );
}
