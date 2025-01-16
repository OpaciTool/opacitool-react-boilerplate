import {
  calculateReadingHighestAveragePeriod,
  intervalToString,
  toNumericDateString,
  toTimeString,
} from "@/helpers";
import { useObservationPauses } from "@/shared/hooks";
import { Card, Heading, Select, Stat, Text } from "@/shared/ui";
import {
  DocumentPlusIcon,
  PauseCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/16/solid";
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ObservationScreenshotDialog } from "../../observation/ui/ObservationScreenshotDialog";

import type { Observation, ObservationPauseType } from "@/shared/model";
import { useObservationScreenshots } from "../hooks";
import { ObservationScreenshot } from "../model";
import { DEFAULT_AVERAGING_PERIOD } from "@/shared/lib";

type ObservationStatsProps = Pick<
  Observation,
  "observation_date" | "start_time" | "end_time" | "observation_frequency"
>;

function ObservationStats({
  observation_date,
  start_time,
  end_time,
  observation_frequency,
}: ObservationStatsProps) {
  return (
    <ul
      className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4"
      data-testid="observation-stats"
    >
      {observation_date && (
        <Stat
          title="Observation Date"
          value={toNumericDateString(observation_date)}
        />
      )}
      {start_time && (
        <Stat title="Start Time" value={toTimeString(start_time)} />
      )}
      {end_time && <Stat title="End Time" value={toTimeString(end_time)} />}
      <Stat
        title="Observation Frequency"
        value={intervalToString(observation_frequency)}
      />
    </ul>
  );
}

function ObservationAveragePeriod({
  average,
  averagingPeriod,
  onAveragingPeriodChange,
}: {
  average?: number | null;
  averagingPeriod?: number | null;
  onAveragingPeriodChange: (value: number) => void;
}) {
  let valueString = "N/A";
  if (average != null) {
    valueString = `${(average * 100).toFixed(2)}%`;
  }

  return (
    <div className="space-y-4" data-testid="observation-average-period">
      <ul
        className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-2"
        data-testid="observation-stats"
      >
        <Stat title="Averaging Period">
          <Select
            className="w-full lg:w-1/2 xl:w-1/3"
            value={averagingPeriod || DEFAULT_AVERAGING_PERIOD}
            onChange={(e) =>
              onAveragingPeriodChange(parseFloat(e.target.value))
            }
          >
            {Array.from({ length: 27 }, (_, i) => i + 4).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
        </Stat>
        <Stat title="Highest Average" value={valueString} />
      </ul>
    </div>
  );
}

type ReadingScreenshotCardProps = {
  index: number;
  isWithinHighestAveragePeriod: boolean;
  pauseType?: ObservationPauseType;
  screenshot: ObservationScreenshot;
  onCardClick: (reading: ObservationScreenshot, index: number) => void;
};

function ReadingScreenshotCard({
  index,
  isWithinHighestAveragePeriod,
  pauseType,
  screenshot,
  onCardClick,
}: ReadingScreenshotCardProps) {
  const { id, opacity, revised_opacity } = screenshot;
  return (
    <Card
      className={twMerge(
        "bg-zinc-100 hover:bg-zinc-100",
        "relative flex aspect-1 items-center justify-center text-center transition-colors duration-150 ease-in-out hover:cursor-pointer",
        !isWithinHighestAveragePeriod &&
          `bg-opacity-${revised_opacity ? revised_opacity * 100 : opacity * 100}`,
        isWithinHighestAveragePeriod &&
          "bg-red-100 shadow-red-900/10 dark:bg-red-400 dark:shadow-red-900/5",
      )}
      data-within-highest-average-period={isWithinHighestAveragePeriod}
      key={id}
      role="button"
      onClick={() => onCardClick(screenshot, index)}
    >
      <Text
        className={twMerge(
          isWithinHighestAveragePeriod && "text-red-900 dark:text-red-950",
          revised_opacity !== null && "text-brand-blue-900",
          "text-lg font-medium text-zinc-700 transition-colors duration-150 ease-in-out",
        )}
      >
        {revised_opacity
          ? `${(revised_opacity * 100).toFixed(0)}%`
          : `${(opacity * 100).toFixed(0)}%`}
      </Text>
      <div className="absolute left-0 top-0 flex w-full items-center justify-between p-2">
        <small
          className={twMerge(
            "pl-1 text-xs font-medium text-zinc-500 transition-colors duration-150 ease-in-out",
            isWithinHighestAveragePeriod && "text-red-900 dark:text-red-950",
          )}
        >
          #{index + 1}
        </small>
        <span className="flex items-center space-x-1">
          {screenshot.include_with_report && (
            <DocumentPlusIcon className="size-4 fill-green-500" />
          )}
          {screenshot.revised_opacity != null && (
            <PencilSquareIcon className="size-4 fill-yellow-500" />
          )}
        </span>
      </div>
      {pauseType && (
        <span
          className="absolute bottom-2 size-4 text-red-500"
          title="Within pause"
        >
          <PauseCircleIcon
            className={twMerge(
              "size-4",
              pauseType === "uncontrollable" && "fill-green-500",
              pauseType === "intentional" && "fill-red-500",
            )}
          />
        </span>
      )}
    </Card>
  );
}

export function TestObservationReadings({
  averagingPeriod,
  observation,
  onAveragingPeriodChange,
}: {
  averagingPeriod?: number | null;
  observation?: Observation;
  onAveragingPeriodChange: (value: number) => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const { screenshots } = useObservationScreenshots({
    observationUID: observation?.uid,
  });

  const { pauses } = useObservationPauses({
    observationUID: observation?.uid,
  });

  const [screenshotToEdit, setScreenshotToEdit] = useState<{
    index: number;
    screenshotID: number;
    observationDate: string;
  } | null>(null);

  const averageData = useMemo(
    () =>
      calculateReadingHighestAveragePeriod({
        averagingPeriod: averagingPeriod || DEFAULT_AVERAGING_PERIOD,
        intentionalPauses:
          pauses?.filter((p) => p.pause_type === "intentional") || [],
        readings: screenshots || [],
      }),
    [averagingPeriod, pauses, screenshots],
  );

  if (!observation || averageData === undefined) {
    return <div>Loading...</div>;
  }

  function getIsPause(reading: ObservationScreenshot, index: number) {
    if (index === 0 || !screenshots) return;

    const pause = pauses?.find((pause) => {
      if (!pause.pause_start || !reading.timestamp) return false;
      const previousTimestamp = screenshots[index - 1].timestamp;
      if (!previousTimestamp) return false;

      const pauseStart = new Date(pause.pause_start).getTime();
      const currentReadingTime = new Date(reading.timestamp).getTime();
      const previousReadingTime = new Date(previousTimestamp).getTime();
      return (
        pauseStart >= previousReadingTime && pauseStart < currentReadingTime
      );
    });

    return pause?.pause_type;
  }

  return (
    <>
      <div className="space-y-4" data-testid="observation-reading-stats">
        <Heading>Observation Readings</Heading>
        <ObservationStats
          end_time={observation.end_time}
          observation_date={observation.observation_date}
          observation_frequency={observation.observation_frequency}
          start_time={observation.start_time}
        />
      </div>
      <div className="space-y-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-10">
          {screenshots?.map((screenshot, index) => (
            <ReadingScreenshotCard
              index={index}
              isWithinHighestAveragePeriod={
                averageData !== null
                  ? averageData?.startIndex <= index &&
                    index <= averageData?.endIndex
                  : false
              }
              key={`observation-${observation.uid}-screenshot-${screenshot.id}`}
              pauseType={getIsPause(screenshot, index)}
              screenshot={screenshot}
              onCardClick={(screenshot, index) => {
                setScreenshotToEdit({
                  index,
                  screenshotID: screenshot.id,
                  observationDate: observation.observation_date,
                });
                setModalOpen(true);
              }}
            />
          ))}
        </div>
        <Text>
          Click any reading to view the associated screenshot, revise the
          opacity or change report settings.
        </Text>
      </div>
      <ObservationAveragePeriod
        average={averageData?.average}
        averagingPeriod={averagingPeriod}
        onAveragingPeriodChange={onAveragingPeriodChange}
      />
      <ObservationScreenshotDialog
        index={0}
        isOpen={modalOpen}
        observationUID={observation.uid}
        screenshotID={screenshotToEdit?.screenshotID}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
