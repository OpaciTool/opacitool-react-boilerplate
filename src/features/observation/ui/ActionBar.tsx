import { Button } from "@/shared/ui";
import { motion } from "framer-motion";
import { isDirty } from "zod";

type Props = {
  onSubmit: () => void;
  onDiscard: () => void;
};

export function ActionBar({ onDiscard, onSubmit }: Props) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="sticky bottom-0 isolate flex w-full justify-end space-x-4 border-t border-zinc-950/5 bg-zinc-100 px-5 py-4 dark:border-white/5 dark:bg-zinc-900"
      exit={{ opacity: 0, y: 10 }}
      initial={{ opacity: 0, y: 10 }}
    >
      <Button disabled={!isDirty} outline onClick={onDiscard}>
        Discard Changes
      </Button>
      <Button disabled={!isDirty} onClick={onSubmit}>
        Save Changes
      </Button>
    </motion.div>
  );
}
