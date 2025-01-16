import { Card, Heading } from "@/shared/ui";
import { ViewingAngleSvg } from "./ViewingAngleSvg";

export function ViewingAngleCard({
  viewingAngle,
}: {
  viewingAngle?: number | null;
}) {
  return (
    <Card className="space-y-6">
      <Heading>Viewing Angle</Heading>
      <div className="relative flex aspect-1 overflow-hidden bg-zinc-100">
        <ViewingAngleSvg
          className="absolute bottom-0 left-0 w-full"
          viewingAngle={viewingAngle}
        />
      </div>
    </Card>
  );
}
