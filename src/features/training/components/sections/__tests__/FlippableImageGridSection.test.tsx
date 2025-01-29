import { render, screen, fireEvent, act } from '@testing-library/react';
import { FlippableImageGridSection } from '../FlippableImageGridSection';

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
              url: '/test-front-1.jpg',
              alt: 'Front Image 1',
            },
            back: {
              url: '/test-back-1.jpg',
              alt: 'Back Image 1',
              text: 'Back Text 1',
            },
          },
          {
            front: {
              url: '/test-front-2.jpg',
              alt: 'Front Image 2',
            },
            back: {
              url: '/test-back-2.jpg',
              alt: 'Back Image 2',
              text: 'Back Text 2',
            },
          },
        ],
      },
    },
  };

  // Basic Rendering Tests
  it('renders title and description', () => {
    render(<FlippableImageGridSection {...defaultProps} />);
    expect(screen.getByText('Test Grid')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders all front images initially', () => {
    render(<FlippableImageGridSection {...defaultProps} />);
    expect(screen.getByAltText('Front Image 1')).toBeInTheDocument();
    expect(screen.getByAltText('Front Image 2')).toBeInTheDocument();
  });

  // Grid Layout Tests
  it('renders images in a grid', () => {
    render(<FlippableImageGridSection {...defaultProps} />);
    const gridContainer = screen.getByAltText('Front Image 1').closest('.grid');
    expect(gridContainer).toHaveClass('grid', 'grid-cols-3', 'gap-4');
  });

  // Flip Functionality Tests
  it('shows back content when card is clicked', async () => {
    render(<FlippableImageGridSection {...defaultProps} />);
    
    // Click first card
    const card = screen.getByAltText('Front Image 1').closest('.cursor-pointer');
    expect(card).toBeInTheDocument();
    
    await act(async () => {
      fireEvent.click(card!);
    });
    
    // Back content should be visible
    expect(screen.getByText('Back Text 1')).toBeInTheDocument();
  });

  it('maintains independent card states', async () => {
    render(<FlippableImageGridSection {...defaultProps} />);
    
    // Click first card
    const firstCard = screen.getByAltText('Front Image 1').closest('.cursor-pointer');
    
    await act(async () => {
      fireEvent.click(firstCard!);
    });
    
    // First card should show back, second card should still show front
    expect(screen.getByText('Back Text 1')).toBeInTheDocument();
    expect(screen.getByAltText('Front Image 2')).toBeInTheDocument();
  });
}); 