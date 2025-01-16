import { Card, Fieldset, Heading, Text } from "@/shared/ui";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ObservationFormData } from "../model";
import { ObservationFormFieldInput } from "./FormField";

export function FacilityInfoCard({
  errors,
  register,
}: {
  errors: FieldErrors<ObservationFormData>;
  register: UseFormRegister<ObservationFormData>;
}) {
  return (
    <Card className="space-y-6" role="form">
      <Heading>Facility & Source Information</Heading>
      <Fieldset className="space-y-8">
        <ObservationFormFieldInput
          errorMessage={errors.facility_name?.message}
          fieldName="facility_name"
          label="Facility Name"
          register={register}
        />
        <ObservationFormFieldInput
          errorMessage={errors.permit_number?.message}
          fieldName="permit_number"
          hoverCardContent={
            <Text>
              Indicate the air permit number issued by the regulating agency.
            </Text>
          }
          label="Permit Number"
          register={register}
        />
        <ObservationFormFieldInput
          errorMessage={errors.facility_address?.message}
          fieldName="facility_address"
          label="Facility Address"
          register={register}
        />
        <ObservationFormFieldInput
          errorMessage={errors.facility_contact_name?.message}
          fieldName="facility_contact_name"
          label="Facility Contact Name"
          register={register}
        />
        <ObservationFormFieldInput
          errorMessage={errors.facility_contact_phone?.message}
          fieldName="facility_contact_phone"
          label="Facility Contact Phone"
          register={register}
        />
        <ObservationFormFieldInput
          errorMessage={errors.process_equipment_id?.message}
          fieldName="process_equipment_id"
          hoverCardContent={
            <Text>
              The facility&apos;s air permit should contain an identification
              number (such as Emission Point #1 or EP-1) for the process
              equipment. Alternatively, the facility may use an in-house ID.
            </Text>
          }
          label="Process Equipment ID"
          register={register}
        />
        <ObservationFormFieldInput
          errorMessage={errors.process_equipment_operating_mode?.message}
          fieldName="process_equipment_operating_mode"
          hoverCardContent={
            <Text>
              Indicate the production or operational rate of the source
              equipment. You may need to acquire this information from the
              operator of the equipment. This is usually expressed as units per
              time (ex. 250 tons/hour).
            </Text>
          }
          label="Process Equipment Operating Mode"
          register={register}
        />
        <ObservationFormFieldInput
          errorMessage={errors.control_equipment_id?.message}
          fieldName="control_equipment_id"
          hoverCardContent={
            <Text>
              Indicate the type of equipment or process which is used to control
              emissions. This information can be obtained from the operator.
              Examples include baghouses, scrubbers, thermal oxidizers and
              cyclones for point-source emissions. Examples for fugitive
              emissions include water spray, inherent rock moisture and sweeping
              for fugitive emissions.
            </Text>
          }
          label="Control Equipment ID"
          register={register}
        />
        <ObservationFormFieldInput
          errorMessage={errors.control_equipment_operating_mode?.message}
          fieldName="control_equipment_operating_mode"
          hoverCardContent={
            <Text>
              The capacity or performance of most modern control methods are
              monitored and recorded. This information can be obtained from the
              operator. Different types of controls have different measuring
              methods. Baghouses measure pressure differential. A thermal
              oxidizer may measure the destruction efficiency of VOCs. Fugitive
              emission controls, such as water spray, are measured in gallons
              per hour.
            </Text>
          }
          label="Control Equipment Operating Mode"
          register={register}
        />
      </Fieldset>
    </Card>
  );
}
