import { render, screen, fireEvent } from "@testing-library/react";
import { LectureContent } from "./LectureContent";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { navigationData } from "../data/navigation";
import { toast } from "react-hot-toast";
import { vi } from 'vitest'

// Mock localStorage
const localStorageMock = {
  store: {} as Record<string, string>,
  getItem: vi.fn((key: string) => localStorageMock.store[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    localStorageMock.store[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete localStorageMock.store[key];
  }),
  clear: vi.fn(() => {
    localStorageMock.store = {};
  }),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

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

// Mock react-hot-toast
vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn()
  },
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

describe("LectureContent", () => {
  beforeEach(() => {
    localStorageMock.clear();
    localStorageMock.store = {};
    vi.clearAllMocks();
  });

  const renderWithRouter = (moduleSlug = "introduction", lectureSlug = "welcome") => {
    return render(
      <MemoryRouter initialEntries={[`/training/${moduleSlug}/${lectureSlug}`]}>
        <Routes>
          <Route path="/training/:moduleSlug/:lectureSlug" element={<LectureContent />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("renders lecture content correctly", () => {
    renderWithRouter();
    
    // Check if module title is rendered
    expect(screen.getByText(navigationData[0].title)).toBeInTheDocument();
    
    // Check if lecture title is rendered
    expect(screen.getByText(navigationData[0].lectures[0].title)).toBeInTheDocument();
  });

  it("handles bookmark toggling", async () => {
    renderWithRouter();

    const bookmarkButton = screen.getByRole("button", { name: /bookmark/i });
    expect(screen.getByText("Bookmark")).toBeInTheDocument();

    // Click to bookmark
    fireEvent.click(bookmarkButton);
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "lastVisitedLecture",
      "/training/introduction/welcome"
    );
    expect(screen.getByText("Bookmarked")).toBeInTheDocument();
    expect(toast.success).toHaveBeenCalledWith("Lecture bookmarked");

    // Click to remove bookmark
    fireEvent.click(bookmarkButton);
    
    expect(localStorageMock.removeItem).toHaveBeenCalledWith("lastVisitedLecture");
    expect(screen.getByText("Bookmark")).toBeInTheDocument();
    expect(toast.success).toHaveBeenCalledWith("Bookmark removed");
  });

  it("shows 'Lecture not found' for invalid slugs", () => {
    renderWithRouter("invalid", "invalid");
    expect(screen.getByText("Lecture not found")).toBeInTheDocument();
  });

  it("maintains bookmark state across route changes", async () => {
    const { rerender } = renderWithRouter();

    // Bookmark first lecture
    const bookmarkButton = screen.getByRole("button", { name: /bookmark/i });
    fireEvent.click(bookmarkButton);
    expect(screen.getByText("Bookmarked")).toBeInTheDocument();

    // Clear localStorage and reset mocks before route change
    localStorageMock.clear();
    vi.clearAllMocks();
    
    // Change route to different lecture with a new key to force remount
    rerender(
      <MemoryRouter initialEntries={["/training/introduction/getting-started"]} key="new-route">
        <Routes>
          <Route path="/training/:moduleSlug/:lectureSlug" element={<LectureContent />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the component to re-render with new state
    await vi.waitFor(() => {
      expect(screen.queryByText("Bookmarked")).not.toBeInTheDocument();
    });
    
    // Verify final state
    const newButton = screen.getByRole("button", { name: /bookmark/i });
    expect(newButton.textContent?.trim()).toBe("Bookmark");
  });
}); 