import { render, screen, fireEvent, act, within } from '@testing-library/react';
import { ImageGridSection } from '../ImageGridSection';
import { vi } from 'vitest';

// Mock the getLectureMediaUrl function
vi.mock("../../../lib/getLectureMedia", () => ({
  getLectureMediaUrl: (url: string) => url,
}));

describe('ImageGridSection', () => {
  const defaultProps = {
    title: 'Test Grid',
    content: {
      text: 'Test description',
      media: {
        type: 'image-grid' as const,
        images: [
          {
            url: '/test-image-1.jpg',
            alt: 'Test Image 1',
            caption: 'Caption 1',
            isClickable: true,
          },
          {
            url: '/test-image-2.jpg',
            alt: 'Test Image 2',
            caption: 'Caption 2',
          },
        ],
      },
    },
    bgColor: 'bg-white',
  };

  // Basic Rendering Tests
  it('renders title and description', () => {
    render(<ImageGridSection {...defaultProps} />);
    expect(screen.getByText('Test Grid')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders all images', () => {
    render(<ImageGridSection {...defaultProps} />);
    expect(screen.getByAltText('Test Image 1')).toBeInTheDocument();
    expect(screen.getByAltText('Test Image 2')).toBeInTheDocument();
  });

  // Caption Tests
  it('renders image captions', () => {
    render(<ImageGridSection {...defaultProps} />);
    expect(screen.getByText('Caption 1')).toBeInTheDocument();
    expect(screen.getByText('Caption 2')).toBeInTheDocument();
  });

  // Grid Layout Tests
  it('renders images in a grid with default layout', () => {
    render(<ImageGridSection {...defaultProps} />);
    const gridContainer = screen.getByRole('list');
    expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2');
  });

  it('renders images in a custom grid layout when specified', () => {
    const propsWithCustomGrid = {
      ...defaultProps,
      content: {
        ...defaultProps.content,
        media: {
          ...defaultProps.content.media,
          grid: 'grid-cols-1 md:grid-cols-3',
        },
      },
    };
    render(<ImageGridSection {...propsWithCustomGrid} />);
    const gridContainer = screen.getByRole('list');
    expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-3');
  });

  // Modal Tests
  it('opens modal when clicking on clickable image', async () => {
    render(<ImageGridSection {...defaultProps} />);
    const clickableImage = screen.getByAltText('Test Image 1');
    
    await act(async () => {
      fireEvent.click(clickableImage);
    });
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    // Look for caption specifically within the dialog
    expect(within(dialog).getByText('Caption 1')).toBeInTheDocument();
  });

  it('does not open modal when clicking non-clickable image', () => {
    render(<ImageGridSection {...defaultProps} />);
    const nonClickableImage = screen.getByAltText('Test Image 2');
    fireEvent.click(nonClickableImage);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes modal when clicking close button', async () => {
    render(<ImageGridSection {...defaultProps} />);
    
    // Open modal
    const clickableImage = screen.getByAltText('Test Image 1');
    await act(async () => {
      fireEvent.click(clickableImage);
    });
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    
    // Close modal
    const closeButton = within(dialog).getByRole('button');
    await act(async () => {
      fireEvent.click(closeButton);
    });
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // Magnifying Glass Icon Tests
  it('shows magnifying glass icon on clickable images', () => {
    render(<ImageGridSection {...defaultProps} />);
    const magnifyingGlassIcon = screen.getByTestId('magnifying-glass-icon-0');
    expect(magnifyingGlassIcon).toBeInTheDocument();
  });

  it('does not show magnifying glass icon on non-clickable images', () => {
    const propsWithNonClickableImage = {
      ...defaultProps,
      content: {
        ...defaultProps.content,
        media: {
          ...defaultProps.content.media,
          images: [
            {
              ...defaultProps.content.media.images[0],
              isClickable: false,
            },
          ],
        },
      },
    };
    render(<ImageGridSection {...propsWithNonClickableImage} />);
    const magnifyingGlassIcon = screen.queryByTestId('magnifying-glass-icon-0');
    expect(magnifyingGlassIcon).not.toBeInTheDocument();
  });
}); 