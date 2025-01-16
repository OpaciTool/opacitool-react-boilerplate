import { ObservationScreenshot } from "@/features/observation-test/model";
import { ObservationPause, ObservationReading } from "@/shared/model";

export type AverageResult = {
  average: number;
  startIndex: number;
  endIndex: number;
};

type CalculateReadingHighestAveragePeriodProps = {
  averagingPeriod: number;
  intentionalPauses: ObservationPause[];
  readings: ObservationReading[] | ObservationScreenshot[];
};

/**
 * Calculate the highest average period of opacity readings.
 * For a reading period to be considered valid, it's readings must not fall within any pause period and the period start must be at least `averagingPeriod` readings before or after the start of the pause period.
 * @param {number} averagingPeriod - The number of readings to average.
 * @param {ObservationPause[]} intentionalPauses - The intentional pause periods to exclude from the calculation.
 * @param {ObservationReading[] | ObservationScreenshot[]} readings - The opacity readings to calculate the highest average period from.
 * @returns {AverageResult | null} The highest average period of opacity readings as well as the period's start and end index. `null` if no valid period is found.
 */
export function calculateReadingHighestAveragePeriod({
  averagingPeriod,
  intentionalPauses,
  readings,
}: CalculateReadingHighestAveragePeriodProps): AverageResult | null {
  if (readings.length === 0 || averagingPeriod > readings.length) {
    return null;
  }

  let maxAverage = -Infinity;
  let startIndex = -1;

  // Check valid windows of `averagingPeriod` size, skipping invalid windows
  for (let i = 0; i <= readings.length - averagingPeriod; i++) {
    let sum = 0;
    let validWindow = true;

    // Check that none of the readings in the window fall within the pause period
    for (let j = i; j < i + averagingPeriod; j++) {
      // Ensure that the reading before is not a pause
      if (j > 0) {
        const reading = readings[j];
        const previousReading = readings[j - 1];

        if (
          "timestamp" in reading &&
          reading.timestamp &&
          "timestamp" in previousReading &&
          previousReading.timestamp
        ) {
          const currentReadingTime = new Date(reading.timestamp).getTime();
          const isInPause = intentionalPauses.some((pause) => {
            if (!previousReading.timestamp) {
              return false;
            }

            const pauseStart = new Date(pause.pause_start).getTime();
            const previousReadingTime = new Date(
              previousReading.timestamp,
            ).getTime();

            return (
              pauseStart >= previousReadingTime &&
              pauseStart < currentReadingTime
            );
          });

          if (isInPause) {
            validWindow = false;
            break; // Skip this window since it's invalid
          }
        }
      }

      const reading = readings[j];
      // Calculate the sum of opacities
      sum +=
        "revised_opacity" in reading && reading.revised_opacity != null
          ? reading.revised_opacity
          : reading.opacity;
    }

    if (validWindow) {
      const average = sum / averagingPeriod;

      if (average > maxAverage) {
        maxAverage = average;
        startIndex = i;
      }
    }
  }

  if (startIndex === -1 || maxAverage === -Infinity) {
    return null;
  }

  const endIndex = startIndex + averagingPeriod - 1;

  return {
    average: maxAverage,
    startIndex,
    endIndex,
  };
}
