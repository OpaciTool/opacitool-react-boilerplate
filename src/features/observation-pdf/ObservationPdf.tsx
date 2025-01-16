import {
  AverageResult,
  intervalToString,
  toNumericDateString,
  toTimeString,
} from "@/helpers";
import {
  Observation,
  ObservationAsset,
  ObservationPause,
  ObservationReading,
  UserDevice,
} from "@/shared/model";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
  Heading,
  Subheading,
  Text,
} from "@/shared/ui";
import { TopViewLayoutSvg } from "@/widgets/observation-top-view-layout/ui/TopViewLayoutSvg";
import { ViewingAngleSvg } from "@/widgets/observation-viewing-angle/ui/ViewingAngleSvg";
import {
  ArrowUpCircleIcon,
  PauseCircleIcon,
  PencilSquareIcon,
  SunIcon,
} from "@heroicons/react/16/solid";
import { animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ObservationScreenshot } from "../observation-test/model";
import { getReferenceReadingData } from "./lib";
import { getTestReadingData } from "./lib/getTestReadingData.helper";
import { DEFAULT_AVERAGING_PERIOD } from "@/shared/lib";

type Row = {
  key: keyof Observation;
  prefix?: string;
  suffix?: string;
  valueClassName?: string;
};

const FACILITY_AND_SOURCE_INFORMATION_KEYS: Row[] = [
  { key: "facility_name" },
  { key: "permit_number" },
  { key: "facility_address" },
  { key: "facility_contact_name" },
  { key: "facility_contact_phone" },
  { key: "process_equipment_id" },
  { key: "process_equipment_operating_mode" },
  { key: "control_equipment_id" },
  { key: "control_equipment_operating_mode" },
];

const OBSERVATION_POINT_AND_PLUME_INFORMATION_KEYS: Row[] = [
  { key: "latitude", suffix: "°" },
  { key: "longitude", suffix: "°" },
  { key: "height_relative_to_observer", suffix: "ft" },
  { key: "distance_relative_to_observer", suffix: "ft" },
  { key: "viewing_angle", suffix: "°" },
  { key: "direction_from_observer", suffix: "°" },
  { key: "plume_shape", valueClassName: "capitalize" },
  { key: "emission_type", valueClassName: "capitalize" },
  { key: "emission_color", valueClassName: "capitalize" },
  { key: "water_vapour_plume", valueClassName: "capitalize" },
];

const ATMOSPHERIC_DATA_KEYS: Row[] = [
  { key: "percent_cloud_cover_start", suffix: "%" },
  { key: "percent_cloud_cover_end", suffix: "%" },
  { key: "ambient_temperature_start", suffix: "°C" },
  { key: "ambient_temperature_end", suffix: "°C" },
  { key: "wind_speed_start", suffix: "m/s" },
  { key: "wind_speed_end", suffix: "m/s" },
  { key: "wind_direction_start", suffix: "°" },
  { key: "wind_direction_end", suffix: "°" },
  { key: "relative_humidity_start", suffix: "%" },
  { key: "relative_humidity_end", suffix: "%" },
  { key: "wet_bulb_temperature_start", suffix: "°C" },
  { key: "wet_bulb_temperature_end", suffix: "°C" },
];

const OBSERVER_INFORMATION_KEYS: Row[] = [
  { key: "observer_name" },
  { key: "observer_company" },
  { key: "certification_issued_by" },
  { key: "certification_date" },
];

const OBSERVATION_DEVICE_KEYS: (keyof UserDevice)[] = [
  "platform",
  "model",
  "camera",
];

export function PdfStat({
  children,
  title,
  value,
}: {
  children?: React.ReactNode;
  title: string;
  value?: string;
}) {
  return (
    <li role="listitem">
      <div className="text-sm text-zinc-600">{title}</div>
      <div className="mt-2 text-3xl/8 font-semibold sm:text-xl/8">
        {children ? children : value}
      </div>
    </li>
  );
}

function Page({
  children,
  pageBreakAfter = true,
}: {
  children: React.ReactNode;
  pageBreakAfter?: boolean;
}) {
  return (
    <div
      className={twMerge(
        "A4-sheet space-y-8",
        pageBreakAfter && "break-after-page",
      )}
    >
      {children}
    </div>
  );
}

function ReadingSquare({
  isFirstRow,
  reading,
  index,
}: {
  isFirstRow: boolean;
  reading: {
    id: number;
    opacity: number;
    isWithinAveragePeriod?: boolean | null;
    isOnPause?: boolean | null;
  };
  index: number;
}) {
  const isLastColumn = (index + 1) % 10 === 0;
  const needsLeftBorder = (index + 1) % 10 === 1;
  const needsRightBorder = (index + 1) % 10 === 0;

  return (
    <div
      className={twMerge(
        "relative flex aspect-square items-center justify-center border-b p-4",
        "border-zinc-300",
        needsLeftBorder && "border-l",
        needsRightBorder && "border-r",
        !isLastColumn && "border-r",
        isFirstRow && "border-t",
      )}
      key={index}
    >
      <small className="absolute left-1 top-0 text-zinc-400">{index + 1}</small>
      <span className="text-lg font-bold">{reading.opacity.toFixed(0)}</span>
      {reading.isWithinAveragePeriod && (
        <ArrowUpCircleIcon className="absolute right-0.5 top-0.5 z-30 h-4 text-zinc-500" />
      )}
      {reading.isOnPause && (
        <PauseCircleIcon className="absolute bottom-0.5 left-0.5 z-30 h-4 text-zinc-500" />
      )}
    </div>
  );
}

export const ObservationPdf = ({
  assets,
  averageData,
  observation,
  observationDevice,
  pauses,
  readings,
  screenshots,
}: {
  assets: ObservationAsset[];
  averageData: AverageResult | null;
  observation: Observation;
  observationDevice: UserDevice;
  pauses: ObservationPause[];
  readings: ObservationReading[];
  screenshots: ObservationScreenshot[];
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerDimensions, setContainerDimensions] = useState({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    if (containerRef.current) {
      const { height, width } = containerRef.current.getBoundingClientRect();
      setContainerDimensions({ height, width });
    }
  }, [containerRef]);

  const iconSize = containerDimensions.width / 10;

  const formatKey = (key: string) => {
    let formattedKey = key.replace(/_/g, " ");
    formattedKey = formattedKey
      .split(" ")
      .map((it) => it.charAt(0).toUpperCase() + it.slice(1))
      .join(" ");
    formattedKey = formattedKey.replace("Id", "ID");
    return formattedKey;
  };

  const formatValue = (row: Row) => {
    let value = observation[row.key]?.toString() || "N/A";
    if (value === "N/A") return value;
    if (row.prefix) value = row.prefix + value;
    if (row.suffix) value = value + row.suffix;
    return value;
  };

  const screenshotsToInclude = screenshots
    .map((screenshot, index) => ({
      screenshot,
      index,
    }))
    .filter((it) => it.screenshot.include_with_report);

  const sunPosition = assets?.find((asset) => asset.type === "sun-position");

  let coordinates = { x: 0, y: 0 };

  if (sunPosition?.asset) {
    const x =
      (sunPosition?.asset.x / 100) * (containerDimensions.width - iconSize);
    const y =
      (sunPosition?.asset.y / 100) * (containerDimensions.height - iconSize);

    const clampedX = Math.max(
      0,
      Math.min(x, containerDimensions.width - iconSize),
    );
    const clampedY = Math.max(
      0,
      Math.min(y, containerDimensions.height - iconSize),
    );

    coordinates = {
      x: clampedX,
      y: clampedY,
    };
  }

  const bind = useDrag(() => {});

  // First page can hold 140 readings
  // Subsequent pages can hold 170
  const data =
    observation.type === "reference"
      ? getReferenceReadingData({ averageData, readings })
      : getTestReadingData({ averageData, pauses, screenshots });

  const firstPageReadings = data.slice(0, 140);
  const remainingReadings = data.slice(140);

  // Split the remaining readings into pages, each with a maximum of 170 readings
  const remainingPages = [];

  for (let i = 0; i < remainingReadings.length; i += 170) {
    remainingPages.push(remainingReadings.slice(i, i + 170));
  }

  return (
    <div>
      <Page>
        <header className="flex w-full items-center justify-between">
          <div className="flex space-x-2">
            <div className="h-min w-min rounded-md border border-zinc-500 px-3 py-1">
              <Subheading className="uppercase text-zinc-500">
                {observation.type}
              </Subheading>
            </div>
            <Heading>
              Visible Emissions Observation Data #{observation.id}
            </Heading>
          </div>
          <span className="text-lg/6 font-semibold text-zinc-400">
            OpaciTool
          </span>
        </header>
        <ul
          className="grid grid-cols-4 gap-8 py-4"
          data-testid="observation-stats"
        >
          {observation.observation_date && (
            <PdfStat
              title="Observation Date"
              value={toNumericDateString(observation.observation_date)}
            />
          )}
          {observation.start_time && (
            <PdfStat
              title="Start Time"
              value={toTimeString(observation.start_time)}
            />
          )}
          {observation.end_time && (
            <PdfStat
              title="End Time"
              value={toTimeString(observation.end_time)}
            />
          )}
          <PdfStat
            title="Observation Frequency"
            value={intervalToString(observation.observation_frequency)}
          />
        </ul>
        <section>
          <Heading>Observer Information</Heading>
          <div className="mt-2 w-full">
            {OBSERVER_INFORMATION_KEYS.map((row) => (
              <div
                className="flex justify-between border-b border-zinc-300"
                key={row.key}
              >
                <span className="py-2 text-zinc-600">{formatKey(row.key)}</span>
                <span className={twMerge("py-2", row.valueClassName)}>
                  {formatValue(row)}
                </span>
              </div>
            ))}
          </div>
        </section>
        <section>
          <Heading>Observation Device Information</Heading>
          <div className="mt-2 w-full">
            {OBSERVATION_DEVICE_KEYS.map((key) => (
              <div
                className="flex justify-between border-b border-zinc-300"
                key={key}
              >
                <span className="py-2 text-zinc-600">{formatKey(key)}</span>
                <span className="py-2">
                  {observationDevice[key]?.toString() || "N/A"}
                </span>
              </div>
            ))}
          </div>
        </section>
        <section>
          <Heading>Facility & Source Information</Heading>
          <div className="mt-2 w-full">
            {FACILITY_AND_SOURCE_INFORMATION_KEYS.map((row) => (
              <div
                className="flex justify-between border-b border-zinc-300"
                key={row.key}
              >
                <span className="py-2 text-zinc-600">{formatKey(row.key)}</span>
                <span className={twMerge("py-2", row.valueClassName)}>
                  {formatValue(row)}
                </span>
              </div>
            ))}
          </div>
        </section>
      </Page>
      <Page>
        <section>
          <Heading>Observation Point & Plume Information</Heading>
          <div className="mt-2 w-full">
            {OBSERVATION_POINT_AND_PLUME_INFORMATION_KEYS.map((row) => (
              <div
                className="flex justify-between border-b border-zinc-300"
                key={row.key}
              >
                <span className="py-2 text-zinc-600">{formatKey(row.key)}</span>
                <span className={twMerge("py-2", row.valueClassName)}>
                  {formatValue(row)}
                </span>
              </div>
            ))}
          </div>
        </section>
        <section>
          <Heading>Atmospheric Data</Heading>
          <div className="mt-2 w-full">
            {ATMOSPHERIC_DATA_KEYS.map((row) => (
              <div
                className="flex justify-between border-b border-zinc-300"
                key={row.key}
              >
                <span className="py-2 text-zinc-600">{formatKey(row.key)}</span>
                <span className={twMerge("py-2", row.valueClassName)}>
                  {formatValue(row)}
                </span>
              </div>
            ))}
          </div>
        </section>
      </Page>
      <Page>
        <section className="space-y-4">
          <Heading>Top View Layout</Heading>
          <div>
            <div
              className="relative flex aspect-1 w-1/2 overflow-hidden border-4 border-zinc-600 bg-white"
              ref={containerRef}
            >
              <TopViewLayoutSvg
                className="pointer-events-none absolute left-0 top-0 h-full w-full"
                directionFromObserver={observation.direction_from_observer}
              />
              <animated.div
                className="hover:cursor-grab active:cursor-grabbing"
                {...bind()}
                style={{ x: coordinates.x, y: coordinates.y }}
              >
                <SunIcon
                  className="fill-yellow-500"
                  style={{
                    height: `${iconSize}px`,
                    width: `${iconSize}px`,
                  }}
                />
              </animated.div>
            </div>
          </div>
        </section>
        <section className="space-y-4">
          <Heading>Viewing Angle</Heading>
          <div className="relative flex aspect-1 w-1/2 overflow-hidden border-4 border-zinc-600 bg-white">
            <ViewingAngleSvg viewingAngle={observation.viewing_angle} />
          </div>
        </section>
      </Page>
      <Page pageBreakAfter={!!remainingPages.length}>
        <div className="space-y-2">
          <Heading>Opacity Readings</Heading>
          <DescriptionList>
            <DescriptionTerm>Averaging Period</DescriptionTerm>
            <DescriptionDetails>
              {observation?.averaging_period || DEFAULT_AVERAGING_PERIOD}
            </DescriptionDetails>
            <DescriptionTerm>Highest Average</DescriptionTerm>
            <DescriptionDetails>
              {averageData?.average
                ? `${(averageData?.average * 100).toFixed(2)}%`
                : "N/A"}
            </DescriptionDetails>
            <DescriptionTerm>Highest Averaging Period</DescriptionTerm>
            {averageData?.startIndex != null &&
            averageData?.endIndex != null ? (
              <DescriptionDetails>
                #{averageData?.startIndex + 1} - #{averageData?.endIndex + 1}
              </DescriptionDetails>
            ) : (
              <DescriptionDetails>N/A</DescriptionDetails>
            )}
          </DescriptionList>
        </div>
        <div className="grid grid-cols-10">
          {firstPageReadings.map((reading, index) => (
            <ReadingSquare
              index={index}
              isFirstRow={index < 10}
              key={reading.id}
              reading={reading}
            />
          ))}
        </div>
      </Page>
      {remainingPages.map((page, index) => (
        <Page key={`page__${index}`}>
          <div className="grid grid-cols-10">
            {page.map((reading, index) => (
              <ReadingSquare
                index={index + 140}
                isFirstRow={index < 10}
                key={reading.id}
                reading={reading}
              />
            ))}
          </div>
        </Page>
      ))}
      {pauses && observation.type === "test" && (
        <Page
          pageBreakAfter={
            screenshotsToInclude.length > 0 || !!observation.comments
          }
        >
          <Heading>Pauses</Heading>
          <div className="mt-2 grid gap-y-8">
            {!pauses.length && (
              <p className="text-lg text-zinc-500">No pauses recorded</p>
            )}
            {pauses.map((pause, index) => (
              <div
                className="flex flex-col space-y-6"
                key={`pause__${pause.id}`}
              >
                <Subheading>Pause #{index + 1}</Subheading>
                <DescriptionList className="sm:mt-2">
                  <DescriptionTerm>Pause Type</DescriptionTerm>
                  <DescriptionDetails className="capitalize">
                    {pause.pause_type}
                  </DescriptionDetails>
                  <DescriptionTerm>Start</DescriptionTerm>
                  <DescriptionDetails>
                    {toTimeString(pause.pause_start)}
                  </DescriptionDetails>
                  <DescriptionTerm>End</DescriptionTerm>
                  <DescriptionDetails>
                    {toTimeString(pause.pause_end)}
                  </DescriptionDetails>
                  <DescriptionTerm>Time added</DescriptionTerm>
                  <DescriptionDetails>
                    {intervalToString(pause.time_added) || "N/A"}
                  </DescriptionDetails>
                </DescriptionList>
              </div>
            ))}
          </div>
        </Page>
      )}
      {observation.comments && (
        <Page pageBreakAfter={screenshotsToInclude.length > 0}>
          <Heading>Comments</Heading>
          <div className="mt-2">
            <p>{observation.comments}</p>
          </div>
        </Page>
      )}
      {screenshotsToInclude && screenshotsToInclude.length > 0 && (
        <Page pageBreakAfter={false}>
          <Heading>Included Screenshots</Heading>
          <div className="grid grid-cols-4 gap-4">
            {screenshotsToInclude.map(({ screenshot, index }) => (
              <div
                className="flex flex-col items-center justify-center gap-2"
                key={screenshot.id}
              >
                <img
                  alt={`Asset ${screenshot.id}`}
                  className="h-full w-full rounded-lg object-cover"
                  src={screenshot.asset.public_url}
                />
                {observation.type === "test" && (
                  <span className="text-lg">#{index + 1}</span>
                )}
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1">
                    {screenshot.revised_opacity != null && (
                      <PencilSquareIcon className="size-5 fill-yellow-500" />
                    )}
                    <Text>
                      {screenshot.revised_opacity != null
                        ? screenshot.revised_opacity * 100
                        : screenshot.opacity * 100}
                      %
                    </Text>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Page>
      )}
    </div>
  );
};
