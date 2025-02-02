import { render, screen } from "@testing-library/react";
import { TrainingLayout } from "./TrainingLayout";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@/shared/context/ThemeContext";

describe("TrainingLayout", () => {
  const renderTrainingLayout = () => {
    return render(
      <ThemeProvider>
        <MemoryRouter>
          <TrainingLayout>
            <div data-testid="outlet-content">Outlet Content</div>
          </TrainingLayout>
        </MemoryRouter>
      </ThemeProvider>
    );
  };

  it("renders the layout structure correctly", () => {
    renderTrainingLayout();
    expect(screen.getByTestId("outlet-content")).toBeInTheDocument();
  });

  it("applies correct layout classes", () => {
    renderTrainingLayout();
    const container = screen.getByTestId("outlet-content").closest('div[class*="relative isolate"]');
    expect(container).toHaveClass("min-h-svh");
  });

  it("renders with proper dark mode support", () => {
    renderTrainingLayout();
    const container = screen.getByTestId("outlet-content").closest('div[class*="relative isolate"]');
    expect(container).toHaveClass("dark:bg-zinc-900");
  });
}); 