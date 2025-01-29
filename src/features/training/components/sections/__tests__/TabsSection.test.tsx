import { render, screen, fireEvent } from '@testing-library/react';
import { TabsSection } from '../TabsSection';

describe('TabsSection', () => {
  const defaultProps = {
    title: 'Test Tabs',
    content: {
      text: 'Test description',
      tabs: [
        {
          id: 'tab-1',
          label: 'Tab 1',
          content: {
            title: 'Tab 1 Title',
            description: 'Content for tab 1',
            text: 'Content for tab 1',
            media: {
              type: 'image' as const,
              url: '/test-image-1.jpg',
              alt: 'Test Image 1',
            },
          },
        },
        {
          id: 'tab-2',
          label: 'Tab 2',
          content: {
            title: 'Tab 2 Title',
            description: 'Content for tab 2',
            text: 'Content for tab 2',
            media: {
              type: 'image' as const,
              url: '/test-image-2.jpg',
              alt: 'Test Image 2',
              isClickable: true,
            },
          },
        },
      ],
    },
  };

  // Basic Rendering Tests
  it('renders section title and tab content', () => {
    render(<TabsSection {...defaultProps} />);
    expect(screen.getByText('Test Tabs')).toBeInTheDocument();
    expect(screen.getByText('Content for tab 1')).toBeInTheDocument();
  });

  it('renders all tab buttons', () => {
    render(<TabsSection {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Tab 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tab 2' })).toBeInTheDocument();
  });


  // Tab Styling Tests
  it('applies active styles to selected tab', () => {
    render(<TabsSection {...defaultProps} />);
    
    const tab1 = screen.getByRole('button', { name: 'Tab 1' });
    const tab2 = screen.getByRole('button', { name: 'Tab 2' });
    
    // First tab should be active by default
    expect(tab1).toHaveClass('border-orange-600', 'text-orange-600');
    expect(tab2).toHaveClass('border-transparent', 'text-zinc-500');
    
    // Click second tab
    fireEvent.click(tab2);
    
    // Check if active styles switched
    expect(tab1).toHaveClass('border-transparent', 'text-zinc-500');
    expect(tab2).toHaveClass('border-orange-600', 'text-orange-600');
  });

}); 