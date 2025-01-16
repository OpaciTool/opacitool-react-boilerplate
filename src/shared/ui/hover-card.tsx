import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { twMerge } from "tailwind-merge";

const HoverCardRoot = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    align={align}
    className={twMerge(
      "data-[state=open]:animate-slide-in data-[state=closed]:animate-slide-out z-50 w-64 whitespace-normal rounded-md border bg-zinc-50 px-3 py-1.5 text-sm text-zinc-600 shadow-md outline-none transition-opacity dark:bg-zinc-900 dark:text-zinc-400",
      className,
    )}
    ref={ref}
    sideOffset={sideOffset}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

type HoverCardProps = {
  triggerContent: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "center" | "end";
};

export function HoverCard({
  children,
  triggerContent,
  align = "start",
}: HoverCardProps) {
  return (
    <HoverCardRoot openDelay={300}>
      <HoverCardTrigger>{triggerContent}</HoverCardTrigger>
      <HoverCardContent align={align}>{children}</HoverCardContent>
    </HoverCardRoot>
  );
}
