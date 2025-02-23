import { render, screen, fireEvent } from "@testing-library/react";
import { SubsectionSplitSection } from "../SubsectionSplitSection";
import { vi } from 'vitest';

// Mock the getLectureMediaUrl function
vi.mock("@/features/training/lib/getLectureMedia", () => ({
  getLectureMediaUrl: (url: string) => url,
}));

describe("SubsectionSplitSection", () => {
  const defaultProps = {
    title: "Test Title",
    content: {
      subsections: [
        {
          heading: "First Subsection",
          description: "First subsection description",
          headingStyle: "text-blue-500"
        },
        {
          heading: "Second Subsection",
          description: "Second subsection description"
        }
      ],
      media: {
        type: "image",
        url: "/test-image.jpg",
        alt: "Test image",
        isClickable: true
      }
    }
  };

  it("renders title and subsections correctly", () => {
    render(<SubsectionSplitSection {...defaultProps} />);
    
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("First Subsection")).toBeInTheDocument();
    expect(screen.getByText("First subsection description")).toBeInTheDocument();
    expect(screen.getByText("Second Subsection")).toBeInTheDocument();
    expect(screen.getByText("Second subsection description")).toBeInTheDocument();
  });

  it("applies custom heading styles", () => {
    render(<SubsectionSplitSection {...defaultProps} />);
    
    const firstHeading = screen.getByText("First Subsection");
    expect(firstHeading).toHaveClass("text-blue-500");
  });

  it("renders with right layout when specified", () => {
    render(<SubsectionSplitSection {...defaultProps} layout="text-right" />);
    
    const container = screen.getByText("First Subsection").closest(".grid");
    expect(container?.firstElementChild).toHaveClass("lg:[&>*:first-child]:order-2");
  });

  it("opens modal when clicking clickable image", () => {
    render(<SubsectionSplitSection {...defaultProps} />);
    
    const image = screen.getByAltText("Test image");
    fireEvent.click(image);
    
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders image caption when provided", () => {
    const propsWithCaption = {
      ...defaultProps,
      content: {
        ...defaultProps.content,
        media: {
          ...defaultProps.content.media,
          caption: "Test caption"
        }
      }
    };
    
    render(<SubsectionSplitSection {...propsWithCaption} />);
    expect(screen.getByText("Test caption")).toBeInTheDocument();
  });
}); 