import { useObservationDevice } from "@/shared/hooks";
import {
  Card,
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
  Heading,
} from "@/shared/ui";

export function DeviceInfoCard({ observationUID }: { observationUID: string }) {
  const { observationDevice, isLoading } = useObservationDevice({
    observationUID,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="space-y-8">
      <div className="space-y-6" data-testid="device-card">
        <Heading>Device Information</Heading>
        <DescriptionList className="sm:mt-2">
          <DescriptionTerm>Platform</DescriptionTerm>
          <DescriptionDetails>
            {observationDevice?.platform || "N/A"}
          </DescriptionDetails>
          <DescriptionTerm>Camera</DescriptionTerm>
          <DescriptionDetails>
            {observationDevice?.camera || "N/A"}
          </DescriptionDetails>
          <DescriptionTerm>Model</DescriptionTerm>
          <DescriptionDetails>
            {observationDevice?.model || "N/A"}
          </DescriptionDetails>
        </DescriptionList>
      </div>
    </Card>
  );
}
