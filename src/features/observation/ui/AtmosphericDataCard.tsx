import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ObservationFormData } from "../model";
import { Card, Fieldset, Heading, Text } from "@/shared/ui";
import { ObservationFormDoubleField } from "./FormField";

export function AtmosphericDataCard({
  errors,
  register,
}: {
  errors: FieldErrors<ObservationFormData>;
  register: UseFormRegister<ObservationFormData>;
}) {
  return (
    <Card className="space-y-6" role="form">
      <Heading>Atmospheric Data</Heading>
      <Fieldset className="space-y-8">
        <ObservationFormDoubleField
          errorMessage={
            errors.percent_cloud_cover_start?.message ||
            errors.percent_cloud_cover_end?.message
          }
          fieldNames={["percent_cloud_cover_start", "percent_cloud_cover_end"]}
          hoverCardContent={
            <Text>
              Indicate the amount of cloud cover at the beginning and at the
              completion of the test. Report cloud cover as a percentage.
              Cloudless skies are 0%. Overcast skies are 100%.
            </Text>
          }
          inputLabels={["Start", "End"]}
          label="Percent Cloud Cover"
          register={register}
          unit="%"
          valueAsNumber
        />
        <ObservationFormDoubleField
          errorMessage={
            errors.ambient_temperature_start?.message ||
            errors.ambient_temperature_end?.message
          }
          fieldNames={["ambient_temperature_start", "ambient_temperature_end"]}
          inputLabels={["Start", "End"]}
          label="Ambient Temperature"
          register={register}
          unit="°F"
          valueAsNumber
        />
        <ObservationFormDoubleField
          errorMessage={
            errors.wind_speed_start?.message || errors.wind_speed_end?.message
          }
          fieldNames={["wind_speed_start", "wind_speed_end"]}
          inputLabels={["Start", "End"]}
          label="Wind Speed"
          register={register}
          unit="mph"
          valueAsNumber
        />
        <ObservationFormDoubleField
          errorMessage={
            errors.wind_direction_start?.message ||
            errors.wind_direction_end?.message
          }
          fieldNames={["wind_direction_start", "wind_direction_end"]}
          inputLabels={["Start", "End"]}
          label="Wind Direction"
          register={register}
        />
        <ObservationFormDoubleField
          errorMessage={
            errors.relative_humidity_start?.message ||
            errors.relative_humidity_end?.message
          }
          fieldNames={["relative_humidity_start", "relative_humidity_end"]}
          inputLabels={["Start", "End"]}
          label="Relative Humidity"
          register={register}
          unit="%"
          valueAsNumber
        />
        <ObservationFormDoubleField
          errorMessage={
            errors.wet_bulb_temperature_start?.message ||
            errors.wet_bulb_temperature_end?.message
          }
          fieldNames={[
            "wet_bulb_temperature_start",
            "wet_bulb_temperature_end",
          ]}
          hoverCardContent={
            <Text>
              This field only needs to be completed if you are unsure if the
              plume contains water vapor. This is an unusual situation for most
              sources. The wet bulb temperature will help you determine the
              probability of a steam plume.
            </Text>
          }
          inputLabels={["Start", "End"]}
          label="Wet Bulb Temperature"
          register={register}
          unit="°F"
          valueAsNumber
        />
      </Fieldset>
    </Card>
  );
}
