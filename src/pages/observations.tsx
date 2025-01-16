import { Divider, Heading } from "@/shared/ui";
import { motion } from "framer-motion";

export function ObservationsPage() {
  return (
    <motion.div
      animate={{
        opacity: 1,
        x: 0,
      }}
      className="max-lg:hidden"
      exit={{
        opacity: 0,
        x: -10,
      }}
      initial={{
        opacity: 0,
        x: -10,
      }}
    >
      <Heading>Observations</Heading>
      <Divider className="mt-6" />
    </motion.div>
  );
}
