import { twMerge } from "tailwind-merge";

export function Card({
  className,
  children,
  as: Component = "li",
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  as?: React.ElementType;
}) {
  return (
    <Component
      className={twMerge(
        "relative h-full w-full list-none overflow-hidden rounded-xl bg-zinc-50 p-6 py-8 shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] sm:p-8 lg:p-12 dark:bg-zinc-950/80 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl dark:before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
