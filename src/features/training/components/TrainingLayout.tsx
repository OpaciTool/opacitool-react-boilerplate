import { ThemeToggle } from "@/shared/ui/theme-toggle";

export function TrainingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate flex min-h-svh w-full bg-white max-lg:flex-col lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <main className="flex flex-1 flex-col pb-2 lg:min-w-0 lg:pt-2">
        {children}
      </main>
    </div>
  );
} 