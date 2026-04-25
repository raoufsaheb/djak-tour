import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SplashScreen } from '../SplashScreen';

describe('SplashScreen', () => {
  it('renders correctly', () => {
    render(<SplashScreen />);
    
    expect(screen.getByText('DJAK-TOUR')).toBeInTheDocument();
  });

  it('has gradient background', () => {
    render(<SplashScreen />);
    
    const container = screen.getByText('DJAK-TOUR').parentElement?.parentElement;
    expect(container).toHaveClass('bg-gradient-to-br');
  });
});
