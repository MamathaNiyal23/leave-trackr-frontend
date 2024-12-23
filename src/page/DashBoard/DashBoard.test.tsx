import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './DashBoard'
import UserDashboard from './UserDashBoard';
import AdminDashboard from './AdminDashBoard';


jest.mock('./UserDashBoard', () => jest.fn(() => <div>User Dashboard</div>));
jest.mock('./AdminDashBoard', () => jest.fn(() => <div>Admin Dashboard</div>));

describe('Dashboard Component', () => {
  afterEach(() => {

    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renders "Please log in" when no user is logged in', () => {
    render(<Dashboard />);
    expect(screen.getByText('Please log in')).toBeInTheDocument();
  });

  test('renders UserDashboard for a user role', () => {
    localStorage.setItem(
      'user',
      JSON.stringify({ username: 'Mamatha', role: 'user', userId: 1 })
    );

    render(<Dashboard />);

    expect(screen.getByText('Hello, Mamatha')).toBeInTheDocument();
    expect(screen.getByText('User Dashboard')).toBeInTheDocument();
  });

  test('renders AdminDashboard for an admin role', () => {
    localStorage.setItem(
      'user',
      JSON.stringify({ username: 'AdminUser', role: 'admin', userId: 2 })
    );

    render(<Dashboard />);

    expect(screen.getByText('Hello, AdminUser')).toBeInTheDocument();
    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
  });

  test('does not render both dashboards at the same time', () => {

    localStorage.setItem(
      'user',
      JSON.stringify({ username: 'Mamatha', role: 'user', userId: 1 })
    );

    render(<Dashboard />);

   
    expect(screen.getByText('User Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Admin Dashboard')).not.toBeInTheDocument();
  });
});
