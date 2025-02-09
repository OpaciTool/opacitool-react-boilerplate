import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import clsx from "clsx";
import * as React from "react";

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    className={clsx(
      "z-50 overflow-hidden rounded-md border bg-zinc-50 px-3 py-1.5 text-sm text-zinc-600 shadow-md transition-opacity data-[state=closed]:opacity-100 dark:bg-zinc-900 dark:text-zinc-400",
      className,
    )}
    ref={ref}
    sideOffset={sideOffset}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

type ToolTipProps = {
  triggerContent: React.ReactNode;
  children: React.ReactNode;
  contentSide?: "top" | "right" | "bottom" | "left";
};

export function ToolTip({
  children,
  contentSide = "top",
  triggerContent,
}: ToolTipProps) {
  return (
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger asChild>{triggerContent}</TooltipTrigger>
        <TooltipContent side={contentSide}>{children}</TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
}

export function Tooltip({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className="rounded-lg bg-zinc-900 px-3 py-1.5 text-sm text-white shadow-lg dark:bg-white dark:text-zinc-900"
            sideOffset={5}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-zinc-900 dark:fill-white" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
