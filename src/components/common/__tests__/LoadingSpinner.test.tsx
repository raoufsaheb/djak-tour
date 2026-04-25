import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner, FullScreenLoader } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default size', () => {
    render(<LoadingSpinner />);
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('renders with small size', () => {
    render(<LoadingSpinner size="sm" />);
    const spinner = document.querySelector('.w-6');
    expect(spinner).toBeInTheDocument();
  });

  it('renders with large size', () => {
    render(<LoadingSpinner size="lg" />);
    const spinner = document.querySelector('.w-16');
    expect(spinner).toBeInTheDocument();
  });
});

describe('FullScreenLoader', () => {
  it('renders with message', () => {
    render(<FullScreenLoader message="جاري التحميل..." />);
    expect(screen.getByText('جاري التحميل...')).toBeInTheDocument();
  });

  it('renders with default message', () => {
    render(<FullScreenLoader />);
    expect(screen.getByText('جاري التحميل...')).toBeInTheDocument();
  });
});
