import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

import { ReferenceObservation } from "@/features/observation-reference/ui";
import { TestObservation } from "@/features/observation-test/ui";
import { useObservation } from "@/shared/hooks";

export function ObservationPage() {
  const params = useParams<{ observationUID?: string }>();
  const { isError, isLoading, observation } = useObservation({
    observationUID: params.observationUID,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    throw new Error("Error fetching observation");
  }

  if (observation?.type) {
    return (
      <motion.div
        animate={{
          opacity: 1,
          x: 0,
        }}
        className="space-y-16 p-6 lg:p-10"
        exit={{
          opacity: 0,
          x: -10,
        }}
        initial={{
          opacity: 0,
          x: -10,
        }}
      >
        {observation.type === "test" && <TestObservation />}
        {observation.type === "reference" && <ReferenceObservation />}
      </motion.div>
    );
  }

  return null;
}
