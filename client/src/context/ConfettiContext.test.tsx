import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ConfettiProvider, useConfetti } from './ConfettiContext';
import Confetti from 'react-confetti';

jest.mock('react-confetti', () => jest.fn(() => null));

const TestComponent = () => {
  const { triggerConfetti } = useConfetti();
  return (
    <button onClick={triggerConfetti}>Trigger Confetti</button>
  );
};

describe('ConfettiContext', () => {
  it('renders children correctly', () => {
    render(
      <ConfettiProvider>
        <div>Test</div>
      </ConfettiProvider>
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('triggers confetti when triggerConfetti is called', () => {
    render(
      <ConfettiProvider>
        <TestComponent />
      </ConfettiProvider>
    );

    const button = screen.getByText('Trigger Confetti');
    act(() => {
      button.click();
    });

    expect(Confetti).toHaveBeenCalled();
  });

  it('stops confetti after the specified duration', async () => {
    jest.useFakeTimers();
    render(
      <ConfettiProvider>
        <TestComponent />
      </ConfettiProvider>
    );

    const button = screen.getByText('Trigger Confetti');
    act(() => {
      button.click();
    });

    expect(Confetti).toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(3000); 
    });

    expect(Confetti).toHaveBeenCalledTimes(3); 
    jest.useRealTimers();
  });
});