import { useObservation, useUpdateObservation } from "@/shared/hooks";
import { useObservationAssets } from "@/shared/hooks/useObservationAssets.hook";
import { calculateViewingAngle, queryClient } from "@/shared/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo } from "react";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import { ObservationFormSchema } from "@/features/observation/lib";
import { ObservationFormData } from "@/features/observation/model";

import {
  ActionBar,
  AtmosphericDataCard,
  DeviceInfoCard,
  FacilityInfoCard,
  Header,
  ObservationNotesCard,
  ObservationPointAndPlumeInfoCard,
  ObserverInformationCard,
  ImagesAndVerificationCard,
} from "@/features/observation/ui";
import { ObservationPauses } from "./ObservationPauses";
import { TestObservationReadings } from "./TestObservationReadings";

import { TopViewLayoutCard } from "@/widgets/observation-top-view-layout/ui";
import { ViewingAngleCard } from "@/widgets/observation-viewing-angle/ui";
import { useObservationScreenshots } from "../hooks";

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

export function TestObservation() {
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

  const { updateObservation } = useUpdateObservation({
    observationUID: params.observationUID,
  });

  const { screenshots } = useObservationScreenshots({
    observationUID: params.observationUID,
  });

  useEffect(() => {
    if (!observation) return;
    document.title = `Observation #${observation?.id} - OpaciTool`;
  }, [observation]);

  const { register, handleSubmit, formState, control, watch, setValue, reset } =
    useForm<ObservationFormData>({
      resolver: zodResolver(ObservationFormSchema),
      values: observation,
    });

  const averagingPeriod = watch("averaging_period");
  const distanceRelativeToObserver = watch("distance_relative_to_observer");
  const heightRelativeToObserver = watch("height_relative_to_observer");
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
    setValue("viewing_angle", roundedAngle, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [distanceRelativeToObserver, heightRelativeToObserver, setValue]);

  async function onSubmit(data: ObservationFormData) {
    try {
      const res = await updateObservation(data);
      if (res.status !== 200) {
        toast.error("Failed to update observation");
        return;
      }
      toast.success("Observation updated successfully");
      await queryClient.invalidateQueries({
        queryKey: ["observations", params.observationUID],
      });
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

  const coverImageUrl = screenshots?.length
    ? screenshots[0].asset.public_url
    : null;
  const isDirty = Object.keys(formState.dirtyFields).length > 0;

  if (isError) {
    return <div>Error loading observation</div>;
  }

  if (isLoading || !observation) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="space-y-8">
        <form className="space-y-16">
          <Header coverImageUrl={coverImageUrl} observation={observation} />
          <ul
            className="grid gap-8 xl:grid-cols-2"
            data-testid="observation-forms"
            role="list"
          >
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
            <DeviceInfoCard observationUID={observation.uid} />
            <ImagesAndVerificationCard
              observationType="test"
              observationUID={observation.uid}
            />
          </ul>
        </form>

        <div className="grid gap-8 xl:grid-cols-2">
          <TopViewLayoutCard
            asset={sunPositionAsset}
            directionFromObserver={directionFromObserver}
            observationUID={observation.uid}
          />
          <ViewingAngleCard viewingAngle={viewingAngle} />
        </div>
      </div>
      <TestObservationReadings
        averagingPeriod={averagingPeriod}
        observation={observation}
        onAveragingPeriodChange={(value) =>
          setValue("averaging_period", value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          })
        }
      />
      <ObservationPauses observationUID={observation.uid} />
      <ObservationNotesCard register={register} />
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
