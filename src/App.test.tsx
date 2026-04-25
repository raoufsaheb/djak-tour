import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  it('has correct direction attribute', () => {
    render(<App />);
    expect(document.documentElement.dir).toBe('rtl');
  });

  it('has correct language attribute', () => {
    render(<App />);
    expect(document.documentElement.lang).toBe('ar');
  });
});
