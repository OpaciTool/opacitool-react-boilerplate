import { intervalToString, toTimeString } from "@/helpers";
import {
  useObservationPauses,
  useUpdateObservationPause,
} from "@/shared/hooks";
import {
  Button,
  Card,
  Description,
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
  Field,
  Fieldset,
  Heading,
  Input,
  Label,
  Radio,
  RadioField,
  RadioGroup,
  Text,
} from "@/shared/ui";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z, ZodType } from "zod";

import { PAUSE_TYPES, queryClient } from "@/shared/lib";
import type { ObservationPause } from "@/shared/model";

type PauseCardProps = {
  pause: ObservationPause;
  index: number;
  observationUID: string;
};

export type ObservationPauseFormData = Pick<
  ObservationPause,
  "notes" | "pause_type"
>;

const PauseFormSchema: ZodType<ObservationPauseFormData> = z.object({
  notes: z.string().optional(),
  pause_type: z.enum(PAUSE_TYPES),
});

function PauseCard({ index, observationUID, pause }: PauseCardProps) {
  const { register, handleSubmit, control, formState } =
    useForm<ObservationPauseFormData>({
      resolver: zodResolver(PauseFormSchema),
      values: {
        notes: pause.notes,
        pause_type: pause.pause_type,
      },
    });

  const { updateObservationPause } = useUpdateObservationPause({
    observationUID,
    pauseID: pause.id,
  });

  const onSubmitError = useCallback(() => {
    toast.error("Failed to update pause");
  }, []);

  async function onSubmit(formData: ObservationPauseFormData) {
    try {
      await updateObservationPause(formData);
      toast.success(`Pause #${index + 1} updated successfully`);

      await queryClient.invalidateQueries({
        queryKey: ["observations", observationUID, "pauses"],
      });
    } catch (error) {
      console.error(error);
      onSubmitError();
    }
  }

  return (
    <Card key={pause.id} role="listitem">
      <div className="flex flex-col space-y-6">
        <Heading>Pause #{index + 1}</Heading>
        <DescriptionList className="sm:mt-2">
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset className="space-y-8">
            <Controller
              control={control}
              name="pause_type"
              render={({ field: { onChange, value } }) => (
                <RadioGroup
                  defaultValue={pause.pause_type}
                  name="pause_type"
                  value={value}
                  onChange={onChange}
                >
                  <RadioField>
                    <Radio value="intentional" />
                    <Label>Intentional</Label>
                    <Description>
                      The pause was intentional and planned.
                    </Description>
                  </RadioField>
                  <RadioField>
                    <Radio value="uncontrollable" />
                    <Label>Uncontrollable</Label>
                    <Description>
                      The pause was uncontrollable and unplanned.
                    </Description>
                  </RadioField>
                </RadioGroup>
              )}
            />
            <Field className="space-y-3">
              <Label>Notes</Label>
              <div className="flex items-center gap-x-4">
                <Input className="w-full" {...register("notes")} />
                <Button disabled={!formState.isDirty} type="submit">
                  Save
                </Button>
              </div>
            </Field>
          </Fieldset>
        </form>
      </div>
    </Card>
  );
}

type ObservationPausesProps = {
  observationUID: string;
};

/**
 * Displays a list of pauses for a given observation. Test mode only.
 */
export function ObservationPauses({ observationUID }: ObservationPausesProps) {
  const { pauses } = useObservationPauses({
    observationUID,
  });

  if (!pauses) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4" data-testid="observation-pauses">
      <Heading>Observation Pauses</Heading>
      {pauses.length > 0 ? (
        <ul className="grid gap-8 lg:grid-cols-2" role="list">
          {pauses?.map((pause, index) => (
            <PauseCard
              index={index}
              key={pause.id}
              observationUID={observationUID}
              pause={pause}
            />
          ))}
        </ul>
      ) : (
        <Text>No pauses recorded</Text>
      )}
    </div>
  );
}
