import { calculateReadingHighestAveragePeriod } from "@/helpers";
import {
  useObservationPauses,
  useObservationReadings,
  useUpdateObservationReading,
} from "@/shared/hooks";
import { Card, Heading, Input, Label, Select, Stat } from "@/shared/ui";
import { useMemo } from "react";

import { toDateValue } from "@/helpers/toDateValue.helper";
import { toTimeValue } from "@/helpers/toTimeValue.helper";
import type { Observation } from "@/shared/model";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { useCreateReading, useDeleteReading } from "../hooks";
import { ReferenceReadingCard } from "./ReferenceReadingCard";
import { toIsoString } from "@/helpers/toIsoString.helper";
import { setDateTime } from "@/helpers/setDateTime.helper";
import { DEFAULT_AVERAGING_PERIOD } from "@/shared/lib";

type ObservationStatsProps = Pick<
  Observation,
  "observation_date" | "start_time" | "end_time"
> & {
  observationFrequency: number;
  onObservationDateChange: (value: string) => void;
  onObservationStartTimeChange: (value: string) => void;
  onObservationEndTimeChange: (value: string) => void;
  onObservationFrequencyChange: (value: number) => void;
};

function ObservationStats({
  observation_date,
  start_time,
  end_time,
  observationFrequency,
  onObservationDateChange,
  onObservationStartTimeChange,
  onObservationEndTimeChange,
  onObservationFrequencyChange,
}: ObservationStatsProps) {
  const parsedDateValue = toDateValue(observation_date);
  const parsedStartTime = toTimeValue(start_time);
  const parsedEndTime = toTimeValue(end_time);
  return (
    <ul
      className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4"
      data-testid="observation-stats"
    >
      <Stat
        renderTitle={() => (
          <Label
            className="text-lg/6 font-medium sm:text-sm/6"
            id="observation-date"
          >
            Observation Date
          </Label>
        )}
      >
        <Input
          aria-label="observation date"
          defaultValue={parsedDateValue || ""}
          type="date"
          onBlur={(e) => {
            onObservationDateChange(toIsoString(e.target.value) || "");
          }}
        />
      </Stat>
      <Stat
        renderTitle={() => (
          <Label className="text-lg/6 font-medium sm:text-sm/6">
            Start Time
          </Label>
        )}
      >
        <Input
          aria-label="start time"
          type="time"
          value={parsedStartTime || ""}
          onChange={(e) => {
            const newTime = setDateTime(observation_date, e.target.value);
            onObservationStartTimeChange(newTime || "");
          }}
        />
      </Stat>
      <Stat
        renderTitle={() => (
          <Label className="text-lg/6 font-medium sm:text-sm/6">End Time</Label>
        )}
      >
        <Input
          aria-label="end time"
          type="time"
          value={parsedEndTime || ""}
          onChange={(e) => {
            const endTime = setDateTime(observation_date, e.target.value);
            onObservationEndTimeChange(endTime || "");
          }}
        />
      </Stat>
      <Stat
        renderTitle={() => (
          <Label className="text-lg/6 font-medium sm:text-sm/6">
            Observation Frequency
          </Label>
        )}
      >
        <div>
          <Input
            max={60}
            min={1}
            type="number"
            unit="seconds"
            value={isNaN(observationFrequency) ? 15 : observationFrequency}
            onChange={(e) =>
              onObservationFrequencyChange(parseInt(e.target.value))
            }
          />
        </div>
      </Stat>
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
      <ul className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-2">
        <Stat title="Averaging Period">
          <Select
            className="w-full lg:w-1/2 xl:w-1/3"
            data-testid="averaging-period-select"
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

export function ReferenceObservationReadings({
  averagingPeriod,
  endTime,
  observation,
  observationDate,
  observationFrequency,
  startTime,
  onAveragingPeriodChange,
  onObservationDateChange,
  onObservationStartTimeChange,
  onObservationEndTimeChange,
  onObservationFrequencyChange,
}: {
  averagingPeriod?: number | null;
  observationDate: string;
  startTime: string;
  endTime: string;
  observationFrequency: number;
  observation?: Observation;
  onAveragingPeriodChange: (value: number) => void;
  onObservationDateChange: (value: string) => void;
  onObservationStartTimeChange: (value: string) => void;
  onObservationEndTimeChange: (value: string) => void;
  onObservationFrequencyChange: (value: number) => void;
}) {
  const queryClient = useQueryClient();

  const { readings } = useObservationReadings({
    observationUID: observation?.uid,
  });

  const { pauses } = useObservationPauses({
    observationUID: observation?.uid,
  });

  const { createReading, isLoading: isCreateLoading } = useCreateReading({
    observationUID: observation?.uid,
  });

  const { updateObservationReading, isLoading: isUpdateLoading } =
    useUpdateObservationReading({
      observationUID: observation?.uid,
    });

  const { deleteReading, isLoading: isDeleteLoading } = useDeleteReading({
    observationUID: observation?.uid,
  });

  const averageData = useMemo(
    () =>
      calculateReadingHighestAveragePeriod({
        averagingPeriod: averagingPeriod || DEFAULT_AVERAGING_PERIOD,
        intentionalPauses:
          pauses?.filter((p) => p.pause_type === "intentional") || [],
        readings: readings || [],
      }),
    [averagingPeriod, pauses, readings],
  );

  async function onInsertBlankReading(index: number) {
    try {
      await createReading({ index, opacity: 0 });
      toast.success("Reading created successfully");
      queryClient.invalidateQueries({
        queryKey: ["observations", observation?.uid, "readings"],
      });
    } catch (error) {
      toast.error("Failed to create reading");
    }
  }

  async function onDeleteReading(readingID: number) {
    try {
      await deleteReading(readingID);
      toast.success("Reading deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["observations", observation?.uid, "readings"],
      });
    } catch (error) {
      toast.error("Failed to delete reading");
    }
  }

  async function onUpdateReading(readingID: number, value: string) {
    try {
      const opacityInt = parseInt(value);
      if (isNaN(opacityInt)) {
        toast.error("Invalid opacity value");
        return "Invalid opacity value";
      }
      const toPercentage = opacityInt / 100;
      await updateObservationReading({ opacity: toPercentage, readingID });
      toast.success("Reading updated successfully");
      return null;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { data } = error.response || {};
        if (data?.errors) {
          toast.error(data.errors);
          return data.errors;
        }
      }
      toast.error("Failed to update reading");
      return "Failed to update reading";
    }
  }

  if (!observation || averageData === undefined) {
    return <div>Loading...</div>;
  }

  const cardsDisabled = Boolean(
    isCreateLoading ||
      isUpdateLoading ||
      isDeleteLoading ||
      readings === undefined,
  );

  return (
    <>
      <div className="space-y-4" data-testid="observation-reading-stats">
        <Heading>Observation Readings</Heading>
        <ObservationStats
          end_time={endTime}
          observationFrequency={observationFrequency}
          observation_date={observationDate}
          start_time={startTime}
          onObservationDateChange={onObservationDateChange}
          onObservationEndTimeChange={onObservationEndTimeChange}
          onObservationFrequencyChange={onObservationFrequencyChange}
          onObservationStartTimeChange={onObservationStartTimeChange}
        />
      </div>
      <div className="space-y-4">
        <div
          className="grid grid-cols-2 gap-y-10 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-10"
          data-testid="observation-reading-grid"
        >
          {readings?.map((reading, index) => (
            <div
              aria-description={`has an opacity of ${reading.opacity}`}
              aria-label={`reading ${index + 1} of ${readings.length}`}
              key={`observation-${observation.uid}-reading-${reading.id}`}
            >
              <ReferenceReadingCard
                disabled={cardsDisabled}
                index={index}
                isWithinHighestAveragePeriod={
                  averageData !== null
                    ? averageData?.startIndex <= index &&
                      index <= averageData?.endIndex
                    : false
                }
                reading={reading}
                onDeleteClick={() => onDeleteReading(reading.id)}
                onInsertNewReading={() => onInsertBlankReading(index)}
                onUpdateReading={async (newOpacity) =>
                  await onUpdateReading(reading.id, newOpacity)
                }
              />
            </div>
          ))}
          <div className="flex">
            <Card
              aria-label="add new reading"
              className={twMerge(
                "flex aspect-1 items-center justify-center bg-zinc-950 text-center shadow-none transition-colors duration-150 ease-in-out hover:cursor-pointer hover:bg-zinc-900",
              )}
              role="button"
              onClick={() => {
                onInsertBlankReading(readings?.length || 0);
              }}
            >
              <PlusCircleIcon
                className="size-8 flex-shrink-0 fill-white"
                role="icon"
              />
            </Card>
            <div className="h-full w-8 flex-shrink-0" />
          </div>
        </div>
      </div>
      <ObservationAveragePeriod
        average={averageData?.average}
        averagingPeriod={averagingPeriod}
        onAveragingPeriodChange={onAveragingPeriodChange}
      />
    </>
  );
}
