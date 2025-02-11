import { render, screen, fireEvent, act } from '@testing-library/react';
import { FlippableImageGridSection } from '../FlippableImageGridSection';
import { vi } from 'vitest';

// Mock the getLectureMediaUrl function
vi.mock('../../../lib/getLectureMedia', () => ({
  getLectureMediaUrl: (url: string) => url,
}));

describe('FlippableImageGridSection', () => {
  const defaultProps = {
    title: 'Test Grid',
    content: {
      text: 'Test description',
      media: {
        type: 'flippable-image-grid' as const,
        images: [
          {
            front: {
              url: 'test-front-1.jpg',
              alt: 'Front Image 1',
            },
            back: {
              url: 'test-back-1.jpg',
              alt: 'Back Image 1',
              text: 'Back Text 1',
            },
          },
          {
            front: {
              url: 'test-front-2.jpg',
              alt: 'Front Image 2',
            },
            back: {
              url: 'test-back-2.jpg',
              alt: 'Back Image 2',
              text: 'Back Text 2',
            },
          },
        ],
      },
    },
    bgColor: 'bg-white',
  };

  // Basic Rendering Tests
  it('renders title and description', () => {
    render(<FlippableImageGridSection {...defaultProps} />);
    expect(screen.getByText('Test Grid')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders all front images initially', () => {
    render(<FlippableImageGridSection {...defaultProps} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('alt', 'Front Image 1');
    expect(images[1]).toHaveAttribute('alt', 'Front Image 2');
  });

  // Grid Layout Tests
  it('renders images in a grid', () => {
    render(<FlippableImageGridSection {...defaultProps} />);
    const grid = screen.getByRole('list');
    expect(grid).toHaveClass('grid', 'grid-cols-2', 'lg:grid-cols-3');
  });

  // Flip Functionality Tests
  it('flips card when clicked', async () => {
    render(<FlippableImageGridSection {...defaultProps} />);
    
    const firstCard = screen.getByAltText('Front Image 1').closest('[role="listitem"]');
    expect(firstCard).toBeInTheDocument();
    
    await act(async () => {
      fireEvent.click(firstCard!);
    });
    
    expect(screen.getByText('Back Text 1')).toBeInTheDocument();
    expect(screen.getByAltText('Front Image 2')).toBeInTheDocument();
  });
}); 