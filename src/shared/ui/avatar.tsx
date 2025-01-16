import { Link, TouchTarget } from "@/shared/ui";
import * as Headless from "@headlessui/react";
import clsx from "clsx";
import React, { forwardRef } from "react";

type AvatarProps = {
  src?: string | null;
  square?: boolean;
  initials?: string;
  alt?: string;
  className?: string;
};

export function Avatar({
  src = null,
  square = false,
  initials,
  alt = "",
  className,
  ...props
}: AvatarProps & React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      data-slot="avatar"
      {...props}
      className={clsx(
        className,
        // Basic layout
        "inline-grid shrink-0 align-middle [--avatar-radius:20%] [--ring-opacity:20%] *:col-start-1 *:row-start-1",
        "outline outline-1 -outline-offset-1 outline-black/[--ring-opacity] dark:outline-white/[--ring-opacity]",
        // Add the correct border radius
        square
          ? "rounded-[--avatar-radius] *:rounded-[--avatar-radius]"
          : "rounded-full *:rounded-full",
      )}
    >
      {initials && (
        <svg
          aria-hidden={alt ? undefined : "true"}
          className="size-full select-none fill-current p-[5%] text-[48px] font-medium uppercase"
          viewBox="0 0 100 100"
        >
          {alt && <title>{alt}</title>}
          <text
            alignmentBaseline="middle"
            dominantBaseline="middle"
            dy=".125em"
            textAnchor="middle"
            x="50%"
            y="50%"
          >
            {initials}
          </text>
        </svg>
      )}
      {src && <img alt={alt} className="size-full" src={src} />}
    </span>
  );
}

export const AvatarButton = forwardRef(function AvatarButton(
  {
    src,
    square = false,
    initials,
    alt,
    className,
    ...props
  }: AvatarProps &
    (
      | Omit<Headless.ButtonProps, "className">
      | Omit<React.ComponentPropsWithoutRef<typeof Link>, "className">
    ),
  ref: React.ForwardedRef<HTMLElement>,
) {
  const classes = clsx(
    className,
    square ? "rounded-[20%]" : "rounded-full",
    "relative inline-grid focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500",
  );

  return "href" in props ? (
    <Link
      {...props}
      className={classes}
      ref={ref as React.ForwardedRef<HTMLAnchorElement>}
    >
      <TouchTarget>
        <Avatar alt={alt} initials={initials} square={square} src={src} />
      </TouchTarget>
    </Link>
  ) : (
    <Headless.Button className={classes} ref={ref}>
      <TouchTarget>
        <Avatar alt={alt} initials={initials} square={square} src={src} />
      </TouchTarget>
    </Headless.Button>
  );
});
