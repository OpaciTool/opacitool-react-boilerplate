import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/shared/context/ThemeContext";

import { ObservationsPage, SupportPage, TrainingPage } from "@/pages";
import { queryClient } from "@/shared/lib";
import { ApplicationLayout } from "@/shared/ui";
import { TrainingLayout } from "@/features/training/components/TrainingLayout";
import { TrainingRedirect } from "@/features/training/components/TrainingRedirect";
import { DashboardTrainingIndex } from "@/pages/dashboard-training-index";
import { TrainingIndexPage } from "@/pages/training-index";

const router = createBrowserRouter([
  {
    element: (
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AnimatePresence mode="wait">
            <Outlet />
            <Toaster position="top-right" />
          </AnimatePresence>
        </QueryClientProvider>
      </ThemeProvider>
    ),
    children: [
      {
        path: "/",
        element: (
          <ApplicationLayout>
            <DashboardTrainingIndex />
          </ApplicationLayout>
        ),
      },
      {
        path: "/observations",
        element: (
          <ApplicationLayout>
            <ObservationsPage />
          </ApplicationLayout>
        ),
      },
      {
        path: "/support",
        element: (
          <ApplicationLayout contentPadding={false}>
            <SupportPage />
          </ApplicationLayout>
        ),
      },
      {
        path: "/training",
        element: <TrainingRedirect />,
      },
      {
        path: "/training/:moduleSlug/:lectureSlug",
        element: (
          <TrainingLayout>
            <TrainingPage />
          </TrainingLayout>
        ),
      },
      {
        path: "/training-index/:moduleSlug/:lectureSlug",
        element: (
          <TrainingLayout>
            <TrainingIndexPage />
          </TrainingLayout>
        ),
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
