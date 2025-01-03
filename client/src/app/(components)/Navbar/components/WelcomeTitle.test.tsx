import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WelcomeTitle from './WelcomeTitle';

describe('WelcomeTitle Component', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should render "Good Morning" before 12 PM', () => {
    const mockDate = new Date(2023, 0, 1, 8); 
    jest.setSystemTime(mockDate);
    render(<WelcomeTitle />);
    expect(screen.getByText(/Good Morning, Welcome back!/i)).toBeInTheDocument();
  });

  it('should render "Good Afternoon" between 12 PM and 6 PM', () => {
    const mockDate = new Date(2023, 0, 1, 14); 
    jest.setSystemTime(mockDate);
    render(<WelcomeTitle />);
    expect(screen.getByText(/Good Afternoon, Welcome back!/i)).toBeInTheDocument();
  });

  it('should render "Good Evening" after 6 PM', () => {
    const mockDate = new Date(2023, 0, 1, 20); 
    jest.setSystemTime(mockDate);
    render(<WelcomeTitle />);
    expect(screen.getByText(/Good Evening, Welcome back!/i)).toBeInTheDocument();
  });
});
