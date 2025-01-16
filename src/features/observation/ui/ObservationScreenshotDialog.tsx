import { parseReadingOpacity, toTimeString } from "@/helpers";
import {
  Button,
  Description,
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
  ErrorMessage,
  Field,
  Fieldset,
  Input,
  Label,
  Switch,
  SwitchField,
  Text,
} from "@/shared/ui";
import { DocumentPlusIcon, PencilSquareIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z, ZodType } from "zod";
import {
  useObservationScreenshot,
  useUpdateObservationScreenshot,
} from "../hooks";

export type ObservationScreenshotFormData = {
  include_with_report?: boolean;
  revised_opacity?: number | null;
};

const FormSchema: ZodType<ObservationScreenshotFormData> = z.object({
  include_with_report: z.boolean().default(false),
  revised_opacity: z
    .union([
      z
        .number({
          message: "Must be a number between 0 and 100",
        })
        .min(0, {
          message: "Must be a number between 0 and 100",
        })
        .max(100, {
          message: "Must be a number between 0 and 100",
        })
        .transform((value) => (Number.isNaN(value) ? null : value / 100)),
      z.nan(),
      z.null(),
    ])
    .optional()
    .transform((value) => (Number.isNaN(value) ? null : value)),
});

type Props = {
  index: number;
  isOpen: boolean;
  observationUID: string;
  screenshotID?: number | null;
  onClose: () => void;
};

export function ObservationScreenshotDialog({
  index,
  isOpen,
  observationUID,
  screenshotID,
  onClose,
}: Props) {
  const queryClient = useQueryClient();

  const { screenshot } = useObservationScreenshot({
    observationUID,
    screenshotID,
  });

  const { updateObservationScreenshot } = useUpdateObservationScreenshot({
    observationUID,
    screenshotID: screenshotID,
  });

  const { control, formState, register, handleSubmit, setValue } =
    useForm<ObservationScreenshotFormData>({
      resolver: zodResolver(FormSchema),
      values: {
        include_with_report: screenshot?.include_with_report ?? false,
        revised_opacity:
          screenshot?.revised_opacity != null
            ? Number((screenshot?.revised_opacity * 100).toFixed(0))
            : null,
      },
    });

  const onSubmitError = useCallback(() => {
    toast.error("Failed to update observation screenshot");
  }, []);

  async function onSubmit(formData: ObservationScreenshotFormData) {
    try {
      await updateObservationScreenshot({
        revised_opacity: formData.revised_opacity ?? null,
        include_with_report: formData.include_with_report ?? false,
      });

      toast.success("Screenshot updated successfully");

      await queryClient.invalidateQueries({
        queryKey: ["observations", observationUID, "screenshots"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["observations", observationUID, "screenshots", screenshotID],
      });

      onClose();
    } catch (error) {
      console.error(error);
      onSubmitError();
    }
  }

  return (
    <Dialog open={isOpen} size="4xl" onClose={onClose}>
      <div className="grid grid-cols-2 gap-8">
        <div className="rounded-lg">
          <img
            className="rounded-lg object-contain"
            src={screenshot?.asset?.public_url}
          />
        </div>
        <div className="flex flex-col justify-between">
          <form
            className="flex h-full flex-col justify-between"
            onSubmit={handleSubmit(onSubmit, onSubmitError)}
          >
            <div>
              <DialogTitle>Screenshot #{index + 1}</DialogTitle>
              <DialogBody className="space-y-8">
                <DescriptionList>
                  <DescriptionTerm>Timestamp</DescriptionTerm>
                  <DescriptionDetails>
                    {screenshot?.timestamp
                      ? toTimeString(screenshot?.timestamp)
                      : "N/A"}
                  </DescriptionDetails>
                  <DescriptionTerm>GPS</DescriptionTerm>
                  <DescriptionDetails>
                    {screenshot?.latitude}, {screenshot?.longitude}
                  </DescriptionDetails>
                  <DescriptionTerm>Opacity</DescriptionTerm>
                  {screenshot?.opacity != null && (
                    <DescriptionDetails>
                      {parseReadingOpacity(screenshot.opacity)}%
                    </DescriptionDetails>
                  )}
                </DescriptionList>

                <Fieldset className="space-y-8">
                  <Controller
                    control={control}
                    name="include_with_report"
                    render={({ field: { onChange, value } }) => (
                      <SwitchField>
                        <Label className="inline-flex items-center space-x-1">
                          <DocumentPlusIcon className="size-4 fill-green-500" />{" "}
                          <span>Include with report?</span>
                        </Label>
                        <Description>
                          Include this observation reading&apos;s screenshot
                          when printing a report.
                        </Description>
                        <Switch
                          checked={value}
                          color="green"
                          name="include-with-report"
                          onChange={(e) => onChange(e)}
                        />
                      </SwitchField>
                    )}
                  />
                  <Field className="space-y-3">
                    <Label className="inline-flex w-full items-center justify-between space-x-1">
                      <span className="flex items-center space-x-1">
                        <PencilSquareIcon className="size-4 fill-yellow-500" />{" "}
                        <span>Revise opacity</span>
                      </span>
                      <button
                        onClick={() =>
                          setValue("revised_opacity", null, {
                            shouldDirty: true,
                            shouldValidate: true,
                            shouldTouch: true,
                          })
                        }
                      >
                        <Text>Clear</Text>
                      </button>
                    </Label>
                    <div className="relative">
                      <Input
                        {...register("revised_opacity", {
                          valueAsNumber: true,
                        })}
                        max={100}
                        min={0}
                        step={5}
                        type="number"
                        unit="%"
                      />
                    </div>
                    <Description>
                      If you believe the opacity reading should be revised.
                      <br />
                      This will be used in the report.
                    </Description>
                    {formState.errors.revised_opacity && (
                      <ErrorMessage>
                        {formState.errors.revised_opacity.message}
                      </ErrorMessage>
                    )}
                  </Field>
                </Fieldset>
              </DialogBody>
            </div>
            <DialogActions>
              <Button plain onClick={() => onClose()}>
                Cancel
              </Button>
              <Button disabled={!formState.isDirty} type="submit">
                Save
              </Button>
            </DialogActions>
          </form>
        </div>
      </div>
    </Dialog>
  );
}
