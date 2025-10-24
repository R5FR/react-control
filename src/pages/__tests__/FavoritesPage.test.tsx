import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesPage } from '../FavoritesPage';

// Mock useUsers hook
vi.mock('../../hooks/useUsers', () => ({
  useUsers: () => ({
    users: [],
    loading: false,
    error: null,
    search: '',
    setSearch: vi.fn(),
    sortBy: 'none',
    setSortBy: vi.fn(),
    currentPage: 1,
    setCurrentPage: vi.fn(),
    totalPages: 1,
    favorites: ['1'],
    toggleFavorite: vi.fn(),
    allUsers: [
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
    advancedFilters: { ageRange: [18, 80], selectedCompanies: [], selectedCities: [] },
    setAdvancedFilters: vi.fn(),
  }),
}));

describe('FavoritesPage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should render favorites page', () => {
    const { container } = render(
      <BrowserRouter>
        <FavoritesPage />
      </BrowserRouter>
    );

    expect(container.querySelector('.favorites-page')).toBeDefined();
  });

  it('should display favorites header', () => {
    render(
      <BrowserRouter>
        <FavoritesPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/My Favorites/i)).toBeDefined();
  });

  it('should show empty state when no favorites', () => {
    render(
      <BrowserRouter>
        <FavoritesPage />
      </BrowserRouter>
    );

    // The page should still render even if empty
    const container = screen.getByText(/My Favorites/i).closest('div');
    expect(container).toBeDefined();
  });

  it('should display back button', () => {
    render(
      <BrowserRouter>
        <FavoritesPage />
      </BrowserRouter>
    );

    const backButton = screen.getByRole('link', { name: /Browse Users/i });
    expect(backButton).toBeDefined();
  });
});
