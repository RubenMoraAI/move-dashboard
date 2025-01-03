import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserMenu from './UserMenu';

describe('UserMenu Component', () => {
  it('should render the component without errors', () => {
    render(<UserMenu />);
    expect(screen.getByText('Thomas Anree')).toBeInTheDocument();
    expect(screen.getByText('Principal Ops')).toBeInTheDocument();
  });

  it('should display the dropdown menu when clicking on the user header', () => {
    render(<UserMenu />);
    const userHeader = screen.getByText('Thomas Anree');
    fireEvent.click(userHeader);
    expect(screen.getByText('My Profile')).toBeInTheDocument();
    expect(screen.getByText('My Contacts')).toBeInTheDocument();
    expect(screen.getByText('Log Out')).toBeInTheDocument();
  });

  it('should hide the dropdown menu when clicking again on the user header', () => {
    render(<UserMenu />);
    const userHeader = screen.getByText('Thomas Anree');
    fireEvent.click(userHeader);
    fireEvent.click(userHeader);
    expect(screen.queryByText('My Profile')).not.toBeInTheDocument();
  });

  it('should close the dropdown menu when clicking outside the component', () => {
    render(
      <div>
        <UserMenu />
        <div data-testid="outside-element">Outside Element</div>
      </div>
    );
    const userHeader = screen.getByText('Thomas Anree');
    fireEvent.click(userHeader);
    expect(screen.getByText('My Profile')).toBeInTheDocument();
    const outsideElement = screen.getByTestId('outside-element');
    fireEvent.mouseDown(outsideElement);
    expect(screen.queryByText('My Profile')).not.toBeInTheDocument();
  });
});
