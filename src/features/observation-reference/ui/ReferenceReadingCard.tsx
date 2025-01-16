import {
  ExclamationCircleIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/16/solid";
import { twMerge } from "tailwind-merge";

import { ObservationReading } from "@/shared/model";
import { Button, Card } from "@/shared/ui";
import { ToolTip } from "@/shared/ui/tooltip";
import { useState } from "react";

type ReadingCardProps = {
  disabled: boolean;
  index: number;
  isWithinHighestAveragePeriod: boolean;
  reading: ObservationReading;
  onDeleteClick: () => void;
  onInsertNewReading: () => void;
  onUpdateReading: (opacity: string) => Promise<string | null>;
};

export function ReferenceReadingCard({
  disabled,
  index,
  isWithinHighestAveragePeriod,
  reading,
  onDeleteClick,
  onInsertNewReading,
  onUpdateReading,
}: ReadingCardProps) {
  const [focused, setFocused] = useState(false);
  const [opacity, setOpacity] = useState((reading.opacity * 100).toFixed(0));
  const [isDirty, setIsDirty] = useState(false);
  const [error, setError] = useState("");

  async function onUpdateSubmit(opacity: string) {
    const res = await onUpdateReading(opacity);
    if (res) {
      setError(res);
    } else {
      setError("");
    }
    setIsDirty(false);
  }

  return (
    <div className="group relative flex">
      <Card
        className={twMerge(
          "overflow-visible bg-zinc-100 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700",
          "relative flex aspect-1 transform items-center justify-center text-center outline-none transition-all duration-150 ease-in-out",
          isWithinHighestAveragePeriod &&
            !error &&
            "bg-orange-100 shadow-orange-900/10 dark:bg-orange-400 dark:shadow-orange-900/5 dark:hover:bg-orange-500",
          disabled && "pointer-events-none opacity-50",
          !!error && "ring-2 ring-red-500",
          focused
            ? "-translate-y-2 bg-zinc-50 hover:bg-zinc-50"
            : "translate-y-0",
          focused && !error && "ring-2 ring-brand-blue-500",
        )}
        data-testid="reading-card"
        data-within-highest-average-period={isWithinHighestAveragePeriod}
        key={reading.id}
      >
        <form
          className="focus-within:outline-none focus-within:ring-0"
          onSubmit={(e) => {
            e.preventDefault();
            onUpdateSubmit(opacity);
          }}
        >
          <input
            autoComplete="off"
            className="absolute left-0 top-0 h-full w-full rounded-xl border-none bg-transparent text-center focus:ring-transparent dark:text-zinc-50"
            name="reading"
            type="text"
            value={opacity}
            onBlur={() => {
              if (isDirty) {
                onUpdateSubmit(opacity);
              }
              setFocused(false);
            }}
            onChange={(e) => {
              setOpacity(e.target.value);
              setIsDirty(true);
            }}
            onFocus={() => setFocused(true)}
          />
        </form>
        <div className="pointer-events-none absolute left-0 top-0 flex w-full items-center justify-between">
          <small
            className={twMerge(
              "pl-2 text-xs font-medium text-zinc-500 transition-colors duration-150 ease-in-out",
              isWithinHighestAveragePeriod &&
                !error &&
                "text-orange-900 dark:text-orange-950",
            )}
          >
            #{index + 1}
          </small>
          <span className="flex items-center space-x-1">
            <Button
              className="pointer-events-all rounded-br-none rounded-tl-none opacity-0 transition-opacity duration-150 ease-in-out group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100 sm:px-2 sm:py-0.5"
              plain
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick();
              }}
            >
              <XCircleIcon
                className={twMerge(
                  "size-4 fill-zinc-400 hover:fill-zinc-950",
                  isWithinHighestAveragePeriod &&
                    "fill-orange-400 hover:fill-orange-500 dark:fill-orange-900 dark:hover:fill-orange-950",
                )}
                role="icon"
              />
            </Button>
          </span>
        </div>
        {error && (
          <ToolTip
            contentSide="bottom"
            triggerContent={
              <span className="absolute -bottom-6 left-0 flex w-full items-center justify-center hover:cursor-default">
                <ExclamationCircleIcon className="size-4 text-red-500" />
              </span>
            }
          >
            <p>{error}</p>
          </ToolTip>
        )}
      </Card>
      <div className="flex w-8 flex-shrink-0 items-center justify-center">
        <span className="flex items-center">
          <button
            className="p-0 opacity-0 transition-opacity duration-150 ease-in-out group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onInsertNewReading();
            }}
          >
            <PlusCircleIcon
              className="size-4 fill-zinc-400 hover:fill-zinc-950"
              role="icon"
            />
          </button>
        </span>
      </div>
    </div>
  );
}
