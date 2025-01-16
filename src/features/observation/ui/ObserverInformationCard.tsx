import { Card, Fieldset, Heading, Text } from "@/shared/ui";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ObservationFormData } from "../model";
import { ObservationFormFieldInput } from "./FormField";

export function ObserverInformationCard({
  errors,
  register,
}: {
  errors: FieldErrors<ObservationFormData>;
  register: UseFormRegister<ObservationFormData>;
}) {
  return (
    <Card className="space-y-6" role="form">
      <Heading>Observer Information</Heading>
      <Fieldset className="space-y-8">
        <ObservationFormFieldInput
          errorMessage={errors.observer_name?.message}
          fieldName="observer_name"
          label="Observer Name"
          register={register}
        />
        <ObservationFormFieldInput
          errorMessage={errors.observer_company?.message}
          fieldName="observer_company"
          hoverCardContent={
            <Text>
              Indicate the company or organization that you represent.
            </Text>
          }
          label="Company/Organization"
          register={register}
        />
        <ObservationFormFieldInput
          errorMessage={errors.certification_issued_by?.message}
          fieldName="certification_issued_by"
          hoverCardContent={
            <Text>
              Indicate the smoke school service provider who issued your
              certification and the date it was issued.
            </Text>
          }
          label="Certification Issued By"
          register={register}
        />
        <ObservationFormFieldInput
          errorMessage={errors.certification_date?.message}
          fieldName="certification_date"
          hoverCardContent={
            <Text>
              Indicate the date of your most recent EPA Method 9 certification.
              All EPA Method 9 certifications are valid for exactly 6 months.
            </Text>
          }
          inputType="date"
          label="Certification Date"
          register={register}
        />
      </Fieldset>
    </Card>
  );
}
