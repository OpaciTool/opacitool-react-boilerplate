import { useTheme } from "@/shared/context/ThemeContext";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === 'dark' ? 180 : 0,
          scale: 1
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        {theme === 'dark' ? (
          <SunIcon className="size-6 text-zinc-400" />
        ) : (
          <MoonIcon className="size-6 text-zinc-600" />
        )}
      </motion.div>
    </motion.button>
  );
} 