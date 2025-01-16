import { ObservationScreenshot } from "@/features/observation-test/model";
import { AverageResult } from "@/helpers";
import { ObservationPause } from "@/shared/model";

export function getTestReadingData({
  averageData,
  pauses,
  screenshots,
}: {
  averageData: AverageResult | null;
  pauses: ObservationPause[];
  screenshots: ObservationScreenshot[];
}) {
  const data = screenshots.map((currentScreenshot, index) => {
    const isWithinAveragePeriod =
      averageData &&
      index >= averageData.startIndex &&
      index <= averageData.endIndex;
    return {
      id: index + 1,
      opacity: currentScreenshot.revised_opacity
        ? currentScreenshot.revised_opacity * 100
        : currentScreenshot.opacity * 100,
      isWithinAveragePeriod,
      isOnPause:
        index === 0
          ? false
          : pauses.some((pause) => {
              const previousScreenshot = screenshots[index - 1];

              if (
                !currentScreenshot.timestamp ||
                !previousScreenshot.timestamp
              ) {
                return false;
              }

              return Boolean(
                pause.pause_start >= previousScreenshot.timestamp &&
                  pause.pause_start < currentScreenshot.timestamp,
              );
            }),
    };
  });

  return data;
}
