import { render, screen, fireEvent } from "@testing-library/react";
import { SplitSection } from "../SplitSection";

describe("SplitSection", () => {
  const defaultProps = {
    title: "Test Title",
    content: {
      text: "Test content text",
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

  // Width Tests
  it("applies custom width to image when specified", () => {
    const propsWithWidth = {
      ...defaultProps,
      content: {
        ...defaultProps.content,
        media: {
          type: "image" as const,
          url: "/test-image.jpg",
          alt: "Test image",
          width: "200px",
        },
      },
    };
    render(<SplitSection {...propsWithWidth} />);
    const image = screen.getByAltText("Test image");
    expect(image).toHaveStyle({ width: "200px" });
  });

  // Modal Close Tests
  it("closes modal when clicking close button", () => {
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
    fireEvent.click(screen.getByAltText("Test image"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Close modal
    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
