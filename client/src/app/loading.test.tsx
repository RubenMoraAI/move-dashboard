import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from './loading';

jest.mock('lucide-react', () => ({
  Loader: () => <div data-testid="loader-icon" />,
}));

describe('Loading', () => {
  it('renders the loading component correctly', () => {
    render(<Loading />);

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});