import { calculateReadingHighestAveragePeriod } from "@/helpers";
import {
  useObservation,
  useObservationDevice,
  useObservationPauses,
  useObservationReadings,
} from "@/shared/hooks";
import { useObservationAssets } from "@/shared/hooks/useObservationAssets.hook";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { ObservationPdf } from "./ObservationPdf";
import { useObservationScreenshots } from "../observation-test/hooks";
import { DEFAULT_AVERAGING_PERIOD } from "@/shared/lib";

export function ObservationPdfWrapper() {
  const params = useParams<{ observationUID?: string }>();

  const { isError, isLoading, observation } = useObservation({
    observationUID: params.observationUID,
  });
  const { readings } = useObservationReadings({
    observationUID: params.observationUID,
  });
  const { pauses } = useObservationPauses({
    observationUID: observation?.uid,
  });
  const { assets } = useObservationAssets({
    observationUID: observation?.uid,
  });
  const { observationDevice } = useObservationDevice({
    observationUID: observation?.uid,
  });
  const { screenshots } = useObservationScreenshots({
    observationUID: observation?.uid,
  });

  const averageData = useMemo(
    () =>
      calculateReadingHighestAveragePeriod({
        averagingPeriod:
          observation?.averaging_period || DEFAULT_AVERAGING_PERIOD,
        intentionalPauses:
          pauses?.filter((p) => p.pause_type === "intentional") || [],
        readings: readings || [],
      }),
    [observation?.averaging_period, pauses, readings],
  );

  const MemoisedPdf = useMemo(
    () =>
      observation && observationDevice ? (
        <ObservationPdf
          assets={assets ?? []}
          averageData={averageData}
          observation={observation}
          observationDevice={observationDevice}
          pauses={pauses || []}
          readings={readings || []}
          screenshots={screenshots || []}
        />
      ) : null,
    [
      assets,
      averageData,
      observation,
      observationDevice,
      pauses,
      readings,
      screenshots,
    ],
  );

  if (isError) {
    return <div>Failed to load observation</div>;
  }

  if (isLoading) {
    return null;
  }

  return <div>{MemoisedPdf}</div>;
}
