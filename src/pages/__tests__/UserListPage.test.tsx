import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserListPage } from '../UserListPage';

// Mock useUsers hook
vi.mock('../../hooks/useUsers', () => ({
  useUsers: () => ({
    users: [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        age: 28,
        phone: '555-0001',
        username: 'johndoe',
        image: 'https://i.pravatar.cc/150?img=1',
        company: { name: 'Tech Corp', department: 'Engineering', title: 'Developer' },
        address: { address: '123 Main', city: 'New York', country: 'USA', postalCode: '10001', state: 'NY' },
        height: 180,
        weight: 75,
        bloodGroup: 'O+',
        birthDate: '1995-01-01',
        gender: 'Male',
        university: 'MIT',
      },
    ],
    loading: false,
    error: null,
    search: '',
    setSearch: vi.fn(),
    sortBy: 'none',
    setSortBy: vi.fn(),
    currentPage: 1,
    setCurrentPage: vi.fn(),
    totalPages: 1,
    favorites: [],
    toggleFavorite: vi.fn(),
    allUsers: [],
    advancedFilters: { ageRange: [18, 80], selectedCompanies: [], selectedCities: [] },
    setAdvancedFilters: vi.fn(),
  }),
}));

describe('UserListPage', () => {
  it('should render the user list page', () => {
    const { container } = render(
      <BrowserRouter>
        <UserListPage />
      </BrowserRouter>
    );

    expect(container.querySelector('.user-list-page')).toBeDefined();
  });

  it('should display search input', () => {
    render(
      <BrowserRouter>
        <UserListPage />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText(/Search by name, email, or username/i);
    expect(searchInput).toBeDefined();
  });

  it('should display users', () => {
    render(
      <BrowserRouter>
        <UserListPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Tech Corp/)).toBeDefined();
    expect(screen.getByAltText('John')).toBeDefined();
  });
});
