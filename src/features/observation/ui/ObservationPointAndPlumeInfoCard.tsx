import {
  Button,
  Card,
  ErrorMessage,
  Field,
  Fieldset,
  Heading,
  Input,
  Label,
  Radio,
  RadioField,
  RadioGroup,
  Select,
  Text,
} from "@/shared/ui";
import {
  CalculatorIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useRef, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import { ObservationFormData } from "../model";
import {
  ObservationFormDoubleField,
  ObservationFormFieldInput,
} from "./FormField";
import { PlumeShapeDialog } from "./PlumeShapeDialog";
import { WaterVapourPlumeDialog } from "./WaterVapourPlumeDialog";
import { HoverCard } from "@/shared/ui/hover-card";

const MODALS = ["PLUME_SHAPE", "WATER_VAPOUR_PLUME", "TEXT"] as const;
type ModalType = (typeof MODALS)[number];

export function ObservationPointAndPlumeInfoCard({
  calculateViewingAngleButtonDisabled,
  control,
  errors,
  onCalculateViewingAngle,
  register,
}: {
  calculateViewingAngleButtonDisabled?: boolean;
  control: Control<ObservationFormData, unknown>;
  errors: FieldErrors<ObservationFormData>;
  onCalculateViewingAngle?: () => void;
  register: UseFormRegister<ObservationFormData>;
}) {
  const [modal, setModal] = useState<ModalType | null>(null);

  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const hoverTimerCurrent = hoverTimer.current;
    return () => {
      if (hoverTimerCurrent) {
        clearTimeout(hoverTimerCurrent);
      }
    };
  }, []);

  const handleMouseEnter = (modal: ModalType) => {
    hoverTimer.current = setTimeout(() => {
      setModal(modal);
    }, 600);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  return (
    <>
      <Card className="space-y-6" role="form">
        <Heading>Observation Point & Plume Information</Heading>
        <Fieldset className="space-y-8">
          <ObservationFormDoubleField
            fieldNames={["latitude", "longitude"]}
            inputLabels={["Latitude", "Longitude"]}
            label="Observer Location"
            register={register}
            unit="°"
            valueAsNumber
          />

          <ObservationFormFieldInput
            errorMessage={errors.height_relative_to_observer?.message}
            fieldName="height_relative_to_observer"
            hoverCardContent={
              <Text>
                Indicate the vertical height between you and the observation
                point. The observation point is the point in the plume where
                opacity is highest and water vapor is not present.
              </Text>
            }
            label="Height Relative to Observer"
            register={register}
            unit="ft"
            valueAsNumber
          />

          <ObservationFormFieldInput
            errorMessage={errors.distance_relative_to_observer?.message}
            fieldName="distance_relative_to_observer"
            hoverCardContent={
              <Text>
                Indicate the horizontal distance between you and the observation
                point.
              </Text>
            }
            label="Distance Relative to Observer"
            register={register}
            unit="ft"
            valueAsNumber
          />

          <Field className="space-y-3">
            <div className="w-min overflow-visible whitespace-nowrap">
              <HoverCard
                triggerContent={
                  <Label className="group flex w-min items-center space-x-1 whitespace-nowrap font-medium hover:text-brand-blue-600">
                    <QuestionMarkCircleIcon className="size-4 flex-shrink-0 fill-brand-blue-500" />
                    <span>Viewing Angle</span>
                  </Label>
                }
              >
                Indicate the vertical angle between your position and the
                observation point. The angle must be less than 18° to prevent
                performing a slant angle correction. If you know the height and
                distance of the observation point, you can tap the Calculate
                button to determine the viewing angle.
              </HoverCard>
            </div>

            <div className="flex gap-x-6">
              <Input
                inputClassName="sm:pr-8"
                invalid={!!errors.viewing_angle?.message}
                unit="°"
                {...register("viewing_angle", { valueAsNumber: true })}
              />
              {errors.viewing_angle?.message && (
                <ErrorMessage>{errors.viewing_angle.message}</ErrorMessage>
              )}
              <Button
                disabled={calculateViewingAngleButtonDisabled}
                outline
                onClick={onCalculateViewingAngle}
              >
                <CalculatorIcon />
              </Button>
            </div>
          </Field>

          <ObservationFormFieldInput
            errorMessage={errors.direction_from_observer?.message}
            fieldName="direction_from_observer"
            hoverCardContent={
              <Text>
                Indicate the direction from your position to the observation
                point. Use degrees (ex. 225°) instead of less accurate cardinal
                directions (N, S, E, W). You can tap the Map button to determine
                the direction from your observation location.
              </Text>
            }
            label="Direction from Observer"
            register={register}
            unit="°"
            valueAsNumber
          />

          <Field>
            <Label
              className="group flex items-center space-x-1 hover:cursor-pointer hover:text-brand-blue-600"
              onClick={() => setModal("PLUME_SHAPE")}
              onMouseEnter={() => handleMouseEnter("PLUME_SHAPE")}
              onMouseLeave={handleMouseLeave}
            >
              <QuestionMarkCircleIcon className="size-4 fill-brand-blue-500" />
              <span>Plume Shape</span>
            </Label>
            <Select
              defaultValue="no-emissions"
              invalid={!!errors.plume_shape?.message}
              {...register("plume_shape")}
            >
              <option defaultChecked value="no-emissions">
                No Emissions
              </option>
              <option value="fanning">Fanning</option>
              <option value="fumigating">Fumigating</option>
              <option value="coning">Coning</option>
              <option value="looping">Looping</option>
              <option value="lofting">Lofting</option>
            </Select>
            {errors.plume_shape && (
              <ErrorMessage>{errors.plume_shape.message}</ErrorMessage>
            )}
          </Field>

          <Field>
            <HoverCard
              triggerContent={
                <div>
                  <Label className="group flex w-min items-center space-x-1 whitespace-nowrap font-medium hover:text-brand-blue-600">
                    <QuestionMarkCircleIcon className="size-4 flex-shrink-0 fill-brand-blue-500" />
                    <span>Emission Type</span>
                  </Label>
                </div>
              }
            >
              <Text>
                Select Point Source if the emission is from a stack or vent.
                Select Fugitive if the emission is from a source that does not
                have a defined emission point such as a rock crusher, conveyor
                or storage bin.
              </Text>
            </HoverCard>
            <Controller
              control={control}
              name="emission_type"
              render={({ field: { onChange, value } }) => (
                <RadioGroup
                  className="mt-3"
                  value={value || "none"}
                  onChange={onChange}
                >
                  <RadioField>
                    <Radio value="none" />
                    <Label>None</Label>
                  </RadioField>
                  <RadioField>
                    <Radio value="point-source" />
                    <Label>Point Source</Label>
                  </RadioField>
                  <RadioField>
                    <Radio value="fugitive" />
                    <Label>Fugitive</Label>
                  </RadioField>
                </RadioGroup>
              )}
            />
          </Field>

          <ObservationFormFieldInput
            errorMessage={errors.emission_color?.message}
            fieldName="emission_color"
            hoverCardContent={
              <Text>
                Indicate the color of the emissions. If no emissions were
                present, input “None” or “NA”.
              </Text>
            }
            label="Emission Color"
            register={register}
          />

          <Field>
            <Label
              className="group flex items-center space-x-1 hover:cursor-pointer hover:text-brand-blue-600"
              onMouseEnter={() => handleMouseEnter("WATER_VAPOUR_PLUME")}
              onMouseLeave={handleMouseLeave}
            >
              <QuestionMarkCircleIcon className="size-4 fill-brand-blue-500" />
              <span>Water Vapour Plume</span>
            </Label>
            <Controller
              control={control}
              name="water_vapour_plume"
              render={({ field: { onChange, value } }) => (
                <RadioGroup
                  defaultValue="none"
                  value={value || "none"}
                  onChange={onChange}
                >
                  <RadioField>
                    <Radio value="none" />
                    <Label>None</Label>
                  </RadioField>
                  <RadioField>
                    <Radio value="attached" />
                    <Label>Attached</Label>
                  </RadioField>
                  <RadioField>
                    <Radio value="detached" />
                    <Label>Detached</Label>
                  </RadioField>
                </RadioGroup>
              )}
            />
          </Field>
        </Fieldset>
      </Card>
      <PlumeShapeDialog
        isOpen={modal === "PLUME_SHAPE"}
        onClose={() => setModal(null)}
      />
      <WaterVapourPlumeDialog
        isOpen={modal === "WATER_VAPOUR_PLUME"}
        onClose={() => setModal(null)}
      />
    </>
  );
}
