import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import { ObservationFormSchema } from "../../observation/lib";
import { ObservationFormData } from "../../observation/model";
import { ActionBar } from "../../observation/ui/ActionBar";
import { AtmosphericDataCard } from "../../observation/ui/AtmosphericDataCard";
import { DeviceInfoCard } from "../../observation/ui/DeviceInfoCard";
import { FacilityInfoCard } from "../../observation/ui/FacilityInfoCard";
import { Header } from "../../observation/ui/Header";
import { ObservationNotesCard } from "../../observation/ui/ObservationNotesCard";
import { ObservationPointAndPlumeInfoCard } from "../../observation/ui/ObservationPointAndPlumeInfoCard";
import { ObserverInformationCard } from "../../observation/ui/ObserverInformationCard";
import { ReferenceObservationReadings } from "./ReferenceObservationReadings";

import {
  useObservation,
  useObservationAssets,
  useUpdateObservation,
} from "@/shared/hooks";
import { calculateViewingAngle } from "@/shared/lib";
import { TopViewLayoutCard } from "@/widgets/observation-top-view-layout/ui";
import { ViewingAngleCard } from "@/widgets/observation-viewing-angle/ui";
import { useObservationScreenshots } from "@/features/observation-test/hooks";
import { ImagesAndVerificationCard } from "@/features/observation/ui";

export function ReferenceObservation() {
  const params = useParams<{ observationUID?: string }>();

  const { isError, isLoading, observation } = useObservation({
    observationUID: params.observationUID,
  });

  const { assets } = useObservationAssets({
    observationUID: params.observationUID,
  });

  const sunPositionAsset = useMemo(
    () => assets?.find((asset) => asset.type === "sun-position"),
    [assets],
  );

  const { control, formState, register, handleSubmit, reset, setValue, watch } =
    useForm<ObservationFormData>({
      resolver: zodResolver(ObservationFormSchema),
      values: observation,
    });

  const { updateObservation } = useUpdateObservation({
    observationUID: params.observationUID,
  });

  const { screenshots } = useObservationScreenshots({
    observationUID: params.observationUID,
  });

  async function onSubmit(data: ObservationFormData) {
    try {
      await updateObservation(data);
      toast.success("Observation updated successfully");
      reset(observation, { keepDirty: false, keepDirtyValues: false });
    } catch (error) {
      toast.error("Failed to update observation");
    }
  }

  const onSubmitError: SubmitErrorHandler<ObservationFormData> = useCallback(
    (err) => {
      Object.entries(err).forEach(([key, value]) => {
        if (value) {
          toast.error(`${key} - ${value.message}` || "An error occurred");
        }
      });
    },
    [],
  );

  const averagingPeriod = watch("averaging_period");
  const observationDate = watch("observation_date");
  const startTime = watch("start_time");
  const endTime = watch("end_time");
  const distanceRelativeToObserver = watch("distance_relative_to_observer");
  const heightRelativeToObserver = watch("height_relative_to_observer");
  const observationFrequency = watch("observation_frequency");
  const directionFromObserver = watch("direction_from_observer");
  const viewingAngle = watch("viewing_angle");

  const calculateViewingAngleButtonDisabled = useMemo(
    () => Boolean(!distanceRelativeToObserver || !heightRelativeToObserver),
    [distanceRelativeToObserver, heightRelativeToObserver],
  );

  const onCalculateViewingAngle = useCallback(() => {
    if (!distanceRelativeToObserver || !heightRelativeToObserver) return;
    const angle = calculateViewingAngle(
      distanceRelativeToObserver,
      heightRelativeToObserver,
    );
    const roundedAngle = Math.round(angle * 100) / 100;
    setValue("viewing_angle", roundedAngle);
  }, [distanceRelativeToObserver, heightRelativeToObserver, setValue]);

  if (isError) {
    return <div>Error loading observation</div>;
  }

  if (isLoading || !observation) {
    return <div>Loading...</div>;
  }

  const isDirty = Object.keys(formState.dirtyFields).length > 0;
  const coverImageUrl = screenshots?.length
    ? screenshots[0].asset.public_url
    : null;

  return (
    <>
      <div className="min-h-screen space-y-8">
        <form className="space-y-16">
          <Header coverImageUrl={coverImageUrl} observation={observation} />
          <div className="grid gap-8 xl:grid-cols-2">
            <FacilityInfoCard errors={formState.errors} register={register} />
            <ObservationPointAndPlumeInfoCard
              calculateViewingAngleButtonDisabled={
                calculateViewingAngleButtonDisabled
              }
              control={control}
              errors={formState.errors}
              register={register}
              onCalculateViewingAngle={onCalculateViewingAngle}
            />
            <AtmosphericDataCard
              errors={formState.errors}
              register={register}
            />
            <ObserverInformationCard
              errors={formState.errors}
              register={register}
            />
            <DeviceInfoCard observationUID={observation.uid} />{" "}
            <ImagesAndVerificationCard
              observationType="reference"
              observationUID={observation.uid}
            />
          </div>
        </form>
        <div className="grid gap-8 xl:grid-cols-3">
          <TopViewLayoutCard
            asset={sunPositionAsset}
            directionFromObserver={directionFromObserver}
            observationUID={observation.uid}
          />
          <ViewingAngleCard viewingAngle={viewingAngle} />
          <ObservationNotesCard register={register} />
        </div>
      </div>
      <ReferenceObservationReadings
        averagingPeriod={averagingPeriod}
        endTime={endTime}
        observation={observation}
        observationDate={observationDate}
        observationFrequency={observationFrequency / 1e9}
        startTime={startTime}
        onAveragingPeriodChange={(value) =>
          setValue("averaging_period", value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          })
        }
        onObservationDateChange={(value) =>
          setValue("observation_date", value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          })
        }
        onObservationEndTimeChange={(value) =>
          setValue("end_time", value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          })
        }
        onObservationFrequencyChange={(value) =>
          setValue("observation_frequency", value * 1e9, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          })
        }
        onObservationStartTimeChange={(value) =>
          setValue("start_time", value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          })
        }
      />
      {isDirty && (
        <ActionBar
          onDiscard={() =>
            reset(observation, {
              keepValues: false,
              keepDirty: false,
            })
          }
          onSubmit={handleSubmit(onSubmit, onSubmitError)}
        />
      )}
    </>
  );
}
