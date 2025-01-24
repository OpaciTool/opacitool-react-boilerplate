import { render, screen, fireEvent } from "@testing-library/react";
import { TrainingSidebar } from "./TrainingSidebar";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/shared/context/ThemeContext";
import { vi } from 'vitest';

// Mock navigation data
vi.mock("../data/navigation", () => ({
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

describe("TrainingSidebar", () => {
  const renderWithRouter = (lectureSlug = "welcome") => {
    return render(
      <MemoryRouter initialEntries={[`/training/introduction/${lectureSlug}`]}>
        <Routes>
          <Route path="/training/:moduleSlug/:lectureSlug" element={<TrainingSidebar />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("renders navigation structure correctly", () => {
    renderWithRouter();
    
    // Check module title
    expect(screen.getByText("Introduction")).toBeInTheDocument();
    
    // Check lecture titles
    expect(screen.getByText("Welcome to OpaciTool")).toBeInTheDocument();
    expect(screen.getByText("Getting Started")).toBeInTheDocument();
  });

  it("handles module expansion and collapse", async () => {
    renderWithRouter();
    
    const moduleButton = screen.getByRole("button", { name: /1 Introduction/i });
    
    // Module should be expanded by default (showing lectures)
    expect(screen.getByText("Welcome to OpaciTool")).toBeInTheDocument();
    expect(screen.getByText("Getting Started")).toBeInTheDocument();
    
    // Click to collapse
    fireEvent.click(moduleButton);
    
    // After collapse, lectures should not be in the document
    expect(screen.queryByText("Welcome to OpaciTool")).not.toBeInTheDocument();
    expect(screen.queryByText("Getting Started")).not.toBeInTheDocument();
    
    // Click to expand again
    fireEvent.click(moduleButton);
    
    // After expansion, lectures should be visible again
    await screen.findByText("Welcome to OpaciTool");
    await screen.findByText("Getting Started");
    
    // Verify final state
    expect(screen.getByText("Welcome to OpaciTool")).toBeInTheDocument();
    expect(screen.getByText("Getting Started")).toBeInTheDocument();
  });

  it("shows close button only on mobile", () => {
    const onClose = vi.fn();
    render(
      <MemoryRouter>
        <TrainingSidebar onClose={onClose} />
      </MemoryRouter>
    );
    
    const closeButton = screen.getByRole("button", { name: "Close sidebar" });
    expect(closeButton).toHaveClass("lg:hidden");
    
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it("highlights current lecture", () => {
    renderWithRouter("welcome");
    
    const currentLecture = screen.getByText("Welcome to OpaciTool");
    expect(currentLecture).toHaveClass("text-orange-600");
    
    const otherLecture = screen.getByText("Getting Started");
    expect(otherLecture).toHaveClass("text-zinc-600");
  });

  it("renders back to homepage link", () => {
    renderWithRouter();
    
    const backLink = screen.getByText("Back to Homepage");
    expect(backLink.closest("a")).toHaveAttribute("href", "/");
  });
});

describe("TrainingSidebar Mobile Functionality", () => {
  const renderMobileSidebar = (onClose = vi.fn()) => {
    return render(
      <ThemeProvider>
        <MemoryRouter>
          <TrainingSidebar onClose={onClose} />
        </MemoryRouter>
      </ThemeProvider>
    );
  };

  it("toggles sidebar visibility on mobile", () => {
    const onClose = vi.fn();
    renderMobileSidebar(onClose);

    // Initially sidebar should be visible
    const sidebar = screen.getByRole("navigation");
    expect(sidebar).toBeInTheDocument();

    // Click close button
    const closeButton = screen.getByRole("button", { name: "Close sidebar" });
    fireEvent.click(closeButton);
    
    // Should call onClose
    expect(onClose).toHaveBeenCalled();
  });

  it("hides close button on desktop", () => {
    const onClose = vi.fn();
    renderMobileSidebar(onClose);

    const closeButton = screen.getByRole("button", { name: "Close sidebar" });
    expect(closeButton).toHaveClass("lg:hidden");
  });
}); 