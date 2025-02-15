
import { ThemeToggle } from "@/shared/ui/theme-toggle";
import { ReactNode } from "react";

interface TrainingLayoutProps {
  children: ReactNode;
}

export function TrainingLayout({ children }: TrainingLayoutProps) {
  return (
    <div data-testid="training-layout" className="relative isolate flex min-h-svh w-full bg-white max-lg:flex-col lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <main className="flex flex-1 flex-col pb-2 lg:min-w-0 lg:pt-2">
        {children}
      </main>
    </div>
  );
} 