import { render } from "@testing-library/react";
import { TrainingPage } from "./training";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@/shared/context/ThemeContext";
import { vi } from 'vitest';

// Mock navigation data
vi.mock("@/features/training/data/navigation", () => ({
  navigationData: [{
    id: 1,
    title: "Introduction",
    slug: "introduction",
    lectures: [
      {
        title: "Welcome to OpaciTool",
        slug: "welcome",
      },
      {
        title: "Getting Started",
        slug: "getting-started",
      }
    ]
  }]
}));

describe("Training Page", () => {
  const renderTraining = (initialEntry = '/training') => {
    const routes = [
      {
        path: '/training/*',
        element: <TrainingPage />
      }
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: [initialEntry],
    });

    return render(
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    );
  };

  it("redirects to first lecture if no last visited lecture", () => {
    localStorage.clear();
    const { container } = renderTraining();
    
    // Wait for navigation to complete
    expect(container.innerHTML).toContain("Welcome to OpaciTool");
  });

  it("redirects to last visited lecture if available", () => {
    localStorage.setItem("lastVisitedLecture", "/training/introduction/getting-started");
    const { container } = renderTraining();
    
    // Wait for navigation to complete
    expect(container.innerHTML).toContain("Getting Started");
  });
}); 