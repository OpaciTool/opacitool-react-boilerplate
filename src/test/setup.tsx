import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { setupServer } from "msw/node";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { MemoryRouter } from "react-router-dom";
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { HANDLERS } from "./handlers";

export const server = setupServer(...HANDLERS);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Start server before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  vi.mock("firebase/auth", async () => {
    return {
      onAuthStateChanged: vi.fn(),
      signInWithPopup: vi.fn(),
      signOut: vi.fn(),
      currentUser: {
        getIdToken: vi.fn(),
      },
    };
  });

  vi.mock("@/shared/config/firebaseConfig", async () => {
    return {
      onAuthStateChanged: vi.fn(() => vi.fn()),
      signInWithPopup: vi.fn(),
      signOut: vi.fn(),
      currentUser: {
        getIdToken: vi.fn(),
      },
    };
  });

  // Mock the useAuthState hook
  vi.mock("@/shared/hooks", async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...(actual as Record<string, unknown>),
      useAuthState: vi.fn(() => ({
        accessToken: "fake-access-token",
        auth: {
          uid: "fake-uid",
          email: "fake-email",
          emailVerified: true,
          isAnonymous: false,
          metadata: {},
          providerData: [],
          tenantId: null,
          displayName: "fake-display-name",
          phoneNumber: null,
          photoURL: null,
          refreshToken: "fake-refresh",
          delete: () => Promise.resolve(),
          getIdToken: () => Promise.resolve("fake-id-token"),
          getIdTokenResult: () =>
            Promise.resolve({
              claims: {},
              token: "",
              authTime: "",
              expirationTime: "",
              issuedAtTime: "",
              signInProvider: "",
              signInSecondFactor: "",
            }),
          reload: () => Promise.resolve(),
          toJSON: () => ({}),
          providerId: "",
        },
        user: {
          uid: "fake-uid",
          email: "fake-email",
          id: 1,
          firebase_uid: "fake-uid",
          created_at: "2021-08-26T00:00:00Z",
          modified_at: "2021-08-26T00:00:00Z",
        },
        isPending: false,
        isError: false,
      })),
    };
  });
});

//  Close server after all tests
afterAll(() => {
  server.close();
  vi.resetAllMocks();
});

// Reset handlers after each test `important for test isolation`
afterEach(() => {
  cleanup();
  queryClient.clear();
  vi.clearAllMocks();
  server.resetHandlers();
});

export const Wrapper = ({
  children,
  initialEntries,
}: {
  children: ReactNode;
  initialEntries?: string[] | undefined;
}) => (
  <MemoryRouter initialEntries={initialEntries}>
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        toastOptions={{
          duration: 1000,
        }}
      />
    </QueryClientProvider>
  </MemoryRouter>
);
