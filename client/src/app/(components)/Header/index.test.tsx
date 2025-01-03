import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './index';

describe('Header Component', () => {
  it('renders the header with the provided name', () => {
    render(<Header name="Test Header" />);
    expect(screen.getByText('Test Header')).toBeInTheDocument();
  });

  it('applies the correct styles', () => {
    render(<Header name="Styled Header" />);
    const headerElement = screen.getByText('Styled Header');
    expect(headerElement).toHaveClass('text-2xl font-semibold text-gray-700 dark:text-gray-300');
  });
});