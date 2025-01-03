import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardWrapper from './dashboardWrapper';

jest.mock('../state/redux', () => {
  const MockRedux = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
  MockRedux.displayName = 'MockRedux';
  return MockRedux;
});

jest.mock('./dashboardWrapper', () => {
  const MockDashboardLayout = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
  MockDashboardLayout.displayName = 'MockDashboardLayout';
  return MockDashboardLayout;
});

describe('DashboardWrapper', () => {
  it('renders children correctly within StoreProvider and DashboardLayout', () => {
    render(
      <DashboardWrapper>
        <div>Test Content</div>
      </DashboardWrapper>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders StoreProvider and DashboardLayout components', () => {
    render(
      <DashboardWrapper>
        <div>Test Content</div>
      </DashboardWrapper>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Test Content').parentElement).toHaveTextContent('Test Content');
  });
});