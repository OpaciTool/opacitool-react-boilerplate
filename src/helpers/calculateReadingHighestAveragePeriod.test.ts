import { ObservationPause, ObservationReading } from "@/shared/model";
import { faker } from "@faker-js/faker";
import { calculateReadingHighestAveragePeriod } from "./calculateReadingHighestAveragePeriod.helper";

type MockReading = Pick<ObservationReading, "id" | "opacity">;

const MOCK_OBSERVATION_START_TIME = new Date("2021-01-01T00:00:00Z");
const MOCK_OBSERVATION_END_TIME = new Date("2021-01-01T01:00:00Z");

type MockPause = Pick<ObservationPause, "id" | "pause_start" | "pause_end">;

const MOCK_READING_TIMESTAMPS = faker.date.betweens({
  count: 100,
  from: MOCK_OBSERVATION_START_TIME,
  to: MOCK_OBSERVATION_END_TIME,
});

describe("calculateReadingHighestAveragePeriod", () => {
  it("returns the null with no readings", () => {
    const result = calculateReadingHighestAveragePeriod({
      averagingPeriod: 10,
      intentionalPauses: [],
      readings: [],
    });

    expect(result).toBeNull();
  });
  it("returns the highest average period with gradual opacity increases, no pauses", () => {
    const gradualMockReadings: MockReading[] = Array.from(
      { length: 100 },
      (_, i) => ({
        id: i,
        timestamp: MOCK_READING_TIMESTAMPS[i].toISOString(),
        opacity: i,
        revised_opacity: null,
      }),
    );

    const result = calculateReadingHighestAveragePeriod({
      averagingPeriod: 10,
      intentionalPauses: [],
      readings: gradualMockReadings as ObservationReading[],
    });

    expect(result?.startIndex).toBe(90);
    expect(result?.endIndex).toBe(99);
  });
  it("returns the highest average period with varying opacity increases, no pauses", () => {
    const inflatedMockReadings: MockReading[] = Array.from(
      { length: 100 },
      (_, i) => ({
        id: i,
        timestamp: MOCK_READING_TIMESTAMPS[i].toISOString(),
        // Purposely inflate opacities between 50 and 60
        opacity: i > 49 && i < 60 ? 100 : i,
        revised_opacity: null,
      }),
    );

    const result = calculateReadingHighestAveragePeriod({
      averagingPeriod: 10,
      intentionalPauses: [],
      readings: inflatedMockReadings as ObservationReading[],
    });

    expect(result?.startIndex).toBe(50);
    expect(result?.endIndex).toBe(59);
  });
  it("returns the highest average period with gradual opacity increases, with pauses", () => {
    const gradualMockReadings: MockReading[] = Array.from(
      { length: 100 },
      (_, i) => ({
        id: i,
        timestamp: MOCK_READING_TIMESTAMPS[i].toISOString(),
        opacity: i,
        revised_opacity: null,
      }),
    );

    const mockPauses: MockPause[] = [
      {
        id: 1,
        pause_start: MOCK_READING_TIMESTAMPS[90].toISOString(),
        pause_end: MOCK_READING_TIMESTAMPS[99].toISOString(),
      },
    ];

    const result = calculateReadingHighestAveragePeriod({
      averagingPeriod: 10,
      intentionalPauses: mockPauses as ObservationPause[],
      readings: gradualMockReadings as ObservationReading[],
    });

    expect(result?.startIndex).toBe(81);
    expect(result?.endIndex).toBe(90);
  });
  it("returns the highest average period with varying opacity increases, revised opacities and with pauses", () => {
    const generateOpacity = (i: number) => {
      // Make opacities between 5 and 10 equal to 100
      if (i > 4 && i < 10) {
        return 100;
      }

      // Make opacities between 10 and 20 equal to 95
      if (i > 9 && i < 20) {
        return 95;
      }
      return i;
    };

    const inflatedMockReadings: MockReading[] = Array.from(
      { length: 100 },
      (_, i) => ({
        id: i,
        timestamp: MOCK_READING_TIMESTAMPS[i].toISOString(),
        // Purposely inflate opacities between 50 and 60
        opacity: generateOpacity(i),
        revised_opacity: i % 2 === 0 ? generateOpacity(i) : null,
      }),
    );

    // Add a pause at the 5th reading to ensure it's skipped
    const mockPauses: MockPause[] = [
      {
        id: 1,
        pause_start: MOCK_READING_TIMESTAMPS[5].toISOString(),
        pause_end: MOCK_READING_TIMESTAMPS[6].toISOString(),
      },
    ];

    const result = calculateReadingHighestAveragePeriod({
      averagingPeriod: 5,
      intentionalPauses: mockPauses as ObservationPause[],
      readings: inflatedMockReadings as ObservationReading[],
    });

    expect(result?.startIndex).toBe(7);
    expect(result?.endIndex).toBe(11);
    expect(inflatedMockReadings[result!.endIndex!].opacity).toBe(95);
  });
});
