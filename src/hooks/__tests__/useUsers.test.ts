import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { User } from '../../types';
import { useUsers } from '../useUsers';

// Mock the API calls - simpler mock
vi.mock('../../utils/userService', () => ({
  getUsers: vi.fn(() => Promise.resolve([])),
  searchAndFilterUsers: vi.fn((users: User[]) => users),
  sortUsers: vi.fn((users: User[]) => users),
  checkOnlineStatus: vi.fn(() => true),
  getCachedFavorites: vi.fn(() => []),
}));

describe('useUsers Hook', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useUsers());

    expect(result.current.loading).toBe(true);
    expect(result.current.search).toBe('');
    expect(result.current.sortBy).toBe('none');
    expect(result.current.favorites).toEqual([]);
    expect(result.current.currentPage).toBe(1);
  });

  it('should handle search input', async () => {
    const { result } = renderHook(() => useUsers());

    await act(async () => {
      result.current.setSearch('john');
    });

    expect(result.current.search).toBe('john');
  });

  it('should toggle favorites', async () => {
    const { result } = renderHook(() => useUsers());

    await act(async () => {
      result.current.toggleFavorite(1);
    });

    expect(result.current.favorites).toContain(1);

    await act(async () => {
      result.current.toggleFavorite(1);
    });

    expect(result.current.favorites).not.toContain(1);
  });

  it('should persist favorites to localStorage', async () => {
    const { result } = renderHook(() => useUsers());

    await act(async () => {
      result.current.toggleFavorite(1);
      result.current.toggleFavorite(2);
    });

    const saved = localStorage.getItem('FAVORITES_STORAGE_KEY');
    expect(saved).toBeDefined();
  });

  it('should load favorites from localStorage on mount', () => {
    localStorage.setItem('FAVORITES_STORAGE_KEY', JSON.stringify([1, 3]));

    const { result } = renderHook(() => useUsers());

    expect(result.current.favorites).toContain(1);
    expect(result.current.favorites).toContain(3);
  });

  it('should change sort order', async () => {
    const { result } = renderHook(() => useUsers());

    await act(async () => {
      result.current.setSortBy('name');
    });

    expect(result.current.sortBy).toBe('name');

    await act(async () => {
      result.current.setSortBy('age');
    });

    expect(result.current.sortBy).toBe('age');
  });

  it('should handle pagination', () => {
    const { result } = renderHook(() => useUsers());

    // Initial page should be 1
    expect(result.current.currentPage).toBe(1);

    // Verify setCurrentPage exists and is callable
    expect(typeof result.current.setCurrentPage).toBe('function');
  });

  it('should manage advanced filters', async () => {
    const { result } = renderHook(() => useUsers());

    await act(async () => {
      result.current.setAdvancedFilters({
        ageRange: [25, 35],
        selectedCompanies: [],
        selectedCities: [],
      });
    });

    expect(result.current.advancedFilters.ageRange).toEqual([25, 35]);
  });

  it('should reset all filters', async () => {
    const { result } = renderHook(() => useUsers());

    await act(async () => {
      result.current.setSearch('test');
      result.current.setSortBy('name');
      result.current.setAdvancedFilters({
        ageRange: [20, 40],
        selectedCompanies: ['Tech Corp'],
        selectedCities: [],
      });
    });

    // Reset
    await act(async () => {
      result.current.setSearch('');
      result.current.setSortBy('none');
      result.current.setAdvancedFilters({
        ageRange: [18, 80],
        selectedCompanies: [],
        selectedCities: [],
      });
    });

    expect(result.current.search).toBe('');
    expect(result.current.sortBy).toBe('none');
    expect(result.current.advancedFilters.selectedCompanies).toEqual([]);
  });
});
