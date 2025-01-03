import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page'; 

jest.mock('./dashboard/page', () => {
    const MockDashboard = () => <div>Mock Dashboard</div>;
    return MockDashboard;
});

describe('Home', () => {
    it('renders Dashboard component', () => {
        render(<Home />);
        expect(screen.getByText('Mock Dashboard')).toBeInTheDocument();
    });
});