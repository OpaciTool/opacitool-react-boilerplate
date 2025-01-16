import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { ObservationPdfWrapper } from "@/features/observation-pdf";

import { QueryClientProvider } from "@tanstack/react-query";

import { EnvErrorBoundary, EnvValidator } from "@/widgets/error";

import {
  AccountSettingsPage,
  Dashboard,
  ForgotPasswordPage,
  LoginPage,
  ObservationPage,
  ObservationsPage,
  RegisterPage,
  SupportPage,
  VerifyEmail,
} from "@/pages";
import { queryClient } from "@/shared/lib";
import { ApplicationLayout } from "@/shared/ui";

const REQUIRED_ENV_VARIABLES = ["VITE_API_URL"];

const router = createBrowserRouter([
  {
    element: (
      <QueryClientProvider client={queryClient}>
        <AnimatePresence mode="wait">
          <EnvErrorBoundary>
            <EnvValidator requiredEnvVars={REQUIRED_ENV_VARIABLES}>
              <Outlet />
            </EnvValidator>
          </EnvErrorBoundary>
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
        path: "/observations/:observationUID",
        element: (
          <ApplicationLayout contentPadding={false}>
            <ObservationPage />
          </ApplicationLayout>
        ),
      },
      {
        path: "/observations/:observationUID/print",
        element: <ObservationPdfWrapper />,
      },
      {
        path: "/account",
        element: (
          <ApplicationLayout>
            <AccountSettingsPage />
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
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
