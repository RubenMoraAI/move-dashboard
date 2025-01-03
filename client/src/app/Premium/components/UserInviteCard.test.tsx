import React from 'react';
import { render } from '@testing-library/react';
import UserInviteCard from './UserInviteCard';

describe('UserInviteCard', () => {
  it('should render the component', () => {
    const { getByText } = render(<UserInviteCard />);
    expect(getByText('You have a special invitation!')).toBeInTheDocument();
  });

  it('should render the Star icon', () => {
    const { container } = render(<UserInviteCard />);
    const starIcon = container.querySelector('svg');
    expect(starIcon).toBeInTheDocument();
  });

  it('should render the link text', () => {
    const { getByText } = render(<UserInviteCard />);
    expect(getByText('rubenmora.dev')).toBeInTheDocument();
  });
  it('should have the correct link URL', () => {
    const { getByRole } = render(<UserInviteCard />);
    const link = getByRole('link', { name: /rubenmora.dev/i });
    expect(link).toHaveAttribute('href', 'rubenmora.dev');
  });
});