import { render, screen, fireEvent, act } from "@testing-library/react";
import { SplitSection } from "../SplitSection";

describe("SplitSection", () => {
  const defaultProps = {
    title: "Test Title",
    content: {
      text: "Test content text",
      media: {
        type: "image" as const,
        url: "/test-image.jpg",
        alt: "Test image"
      }
    },
  };

  // Basic Rendering Tests
  it("renders title and content correctly", () => {
    render(<SplitSection {...defaultProps} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test content text")).toBeInTheDocument();
  });

  it("renders with left layout by default", () => {
    render(<SplitSection {...defaultProps} />);
    const container = screen.getByText("Test content text").closest("div");
    expect(container).not.toHaveClass("lg:order-2");
  });

  // Media Tests
  it("renders image when media is provided", () => {
    const propsWithImage = {
      ...defaultProps,
      content: {
        ...defaultProps.content,
        media: {
          type: "image" as const,
          url: "/test-image.jpg",
          alt: "Test image",
        },
      },
    };
    render(<SplitSection {...propsWithImage} />);
    const image = screen.getByAltText("Test image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("/test-image.jpg"),
    );
  });

  // Image Modal Tests
  it("opens modal when clicking on clickable image", () => {
    const propsWithClickableImage = {
      ...defaultProps,
      content: {
        ...defaultProps.content,
        media: {
          type: "image" as const,
          url: "/test-image.jpg",
          alt: "Test image",
          isClickable: true,
        },
      },
    };
    render(<SplitSection {...propsWithClickableImage} />);
    const image = screen.getByAltText("Test image");
    fireEvent.click(image);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  // Caption Tests
  it("renders image caption when provided", () => {
    const propsWithCaption = {
      ...defaultProps,
      content: {
        ...defaultProps.content,
        media: {
          type: "image" as const,
          url: "/test-image.jpg",
          alt: "Test image",
          caption: "Test caption",
        },
      },
    };
    render(<SplitSection {...propsWithCaption} />);
    expect(screen.getByText("Test caption")).toBeInTheDocument();
  });


  // Modal Close Tests
  it("closes modal when clicking close button", async () => {
    const propsWithClickableImage = {
      ...defaultProps,
      content: {
        ...defaultProps.content,
        media: {
          type: "image" as const,
          url: "/test-image.jpg",
          alt: "Test image",
          isClickable: true,
        },
      },
    };
    render(<SplitSection {...propsWithClickableImage} />);

    // Open modal
    const image = screen.getByAltText("Test image");
    
    await act(async () => {
      fireEvent.click(image);
    });
    
    // Find the close button using role and label
    const closeButton = screen.getByRole("button", { name: /close modal/i });
    
    await act(async () => {
      fireEvent.click(closeButton);
    });
    
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
