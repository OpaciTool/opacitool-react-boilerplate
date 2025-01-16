import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { QueryClientProvider } from "@tanstack/react-query";

import { Dashboard, ObservationsPage, SupportPage } from "@/pages";
import { queryClient } from "@/shared/lib";
import { ApplicationLayout } from "@/shared/ui";

const router = createBrowserRouter([
  {
    element: (
      <QueryClientProvider client={queryClient}>
        <AnimatePresence mode="wait">
          <Outlet />
          <Toaster position="top-right" />
        </AnimatePresence>
      </QueryClientProvider>
    ),
    children: [
      {
        path: "/",
        element: (
          <ApplicationLayout>
            <Dashboard />
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
        element: (
          <ApplicationLayout>
            <div>Training</div>
          </ApplicationLayout>
        ),
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
