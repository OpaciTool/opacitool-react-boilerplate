import { Card, Heading } from "@/shared/ui";
import { Fieldset } from "@headlessui/react";
import { UseFormRegister } from "react-hook-form";
import { ObservationFormData } from "../model";
import { ObservationFormFieldTextArea } from "./FormField";

export function ObservationNotesCard({
  register,
}: {
  register: UseFormRegister<ObservationFormData>;
}) {
  return (
    <Card className="space-y-6" role="form">
      <Heading>Comments</Heading>
      <Fieldset>
        <ObservationFormFieldTextArea
          fieldName="comments"
          helpText="Provide any additional comments about the observation that you would like to include."
          label="Test Comments"
          register={register}
          srOnlyLabel
        />
      </Fieldset>
    </Card>
  );
}
