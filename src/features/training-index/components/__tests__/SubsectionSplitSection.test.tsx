import { render, screen, fireEvent } from "@testing-library/react";
import { SubsectionSplitSection } from "../SubsectionSplitSection";
import { vi } from "vitest";

// Mock the getLectureMediaUrl function
vi.mock("@/features/training/lib/getLectureMedia", () => ({
  getLectureMediaUrl: (url: string) => url,
}));

describe("SubsectionSplitSection", () => {
  const mockProps = {
    title: "Test Title",
    content: {
      subsections: [
        {
          heading: "First Subsection",
          description: "First subsection description",
          headingStyle: "text-blue-500",
        },
        {
          heading: "Second Subsection",
          description: "Second subsection description",
        },
      ],
      media: {
        type: "image",
        url: "/test-image.jpg",
        alt: "Test image",
        isClickable: true,
      },
    },
  };

  // Mock window.scrollTo
  beforeAll(() => {
    window.scrollTo = vi.fn();
  });

  it("renders title correctly", () => {
    render(<SubsectionSplitSection {...mockProps} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders subsections correctly", () => {
    render(<SubsectionSplitSection {...mockProps} />);
    expect(screen.getByText("First Subsection")).toBeInTheDocument();
    expect(screen.getByText("First subsection description")).toBeInTheDocument();
    expect(screen.getByText("Second Subsection")).toBeInTheDocument();
    expect(screen.getByText("Second subsection description")).toBeInTheDocument();
  });

  it("applies custom heading style", () => {
    render(<SubsectionSplitSection {...mockProps} />);
    const heading = screen.getByText("First Subsection");
    expect(heading).toHaveClass("text-blue-500");
  });

  it("renders media content", () => {
    render(<SubsectionSplitSection {...mockProps} />);
    const image = screen.getByAltText("Test image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-image.jpg");
  });

  it("handles image click when isClickable is true", async () => {
    render(<SubsectionSplitSection {...mockProps} />);
    const image = screen.getByAltText("Test image");
    
    // Add act to handle state updates
    await fireEvent.click(image);
    
    // Check if dialog is present in the document
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();
  });

  it("renders with right layout when specified", () => {
    render(<SubsectionSplitSection {...mockProps} layout="text-right" />);
    
    const container = screen.getByText("First Subsection").closest(".grid");
    expect(container).toHaveClass("lg:[&>div:first-child]:order-2");
  });

  it("renders image caption when provided", () => {
    const propsWithCaption = {
      ...mockProps,
      content: {
        ...mockProps.content,
        media: {
          ...mockProps.content.media,
          caption: "Test caption"
        }
      }
    };
    
    render(<SubsectionSplitSection {...propsWithCaption} />);
    expect(screen.getByText("Test caption")).toBeInTheDocument();
  });
}); 