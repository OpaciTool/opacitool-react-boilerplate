import { AverageResult } from "@/helpers";
import { ObservationReading } from "@/shared/model";

export function getReferenceReadingData({
  averageData,
  readings,
}: {
  averageData: AverageResult | null;
  readings: ObservationReading[];
}) {
  const data = readings.map((currentReading, index) => {
    const isWithinAveragePeriod =
      averageData &&
      index >= averageData.startIndex &&
      index <= averageData.endIndex;
    return {
      id: index + 1,
      opacity: currentReading.opacity * 100,
      isWithinAveragePeriod,
      isOnPause: false,
    };
  });

  return data;
}
