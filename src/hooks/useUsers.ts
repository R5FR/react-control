import { useState, useEffect, useCallback, useMemo } from 'react';
import type { User, UseUsersReturn } from '../types';
import { getUsers, searchAndFilterUsers, sortUsers } from '../utils/userService';

const ITEMS_PER_PAGE = 10;
const FAVORITES_STORAGE_KEY = 'user-favorites';

export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'age' | 'none'>('none');
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch users from API
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsers();
      setUsers(data);
      setCurrentPage(1);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch users';
      setError(errorMessage);
      // Load favorites from localStorage if API fails
      console.warn('API failed, offline mode may be available');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Persist favorites to localStorage
  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // Toggle favorite
  const toggleFavorite = useCallback((userId: number) => {
    setFavorites(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  }, []);

  // Filter and search users
  const filteredUsers = useMemo(() => {
    let result = searchAndFilterUsers(users, search);
    result = sortUsers(result, sortBy);
    return result;
  }, [users, search, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage]);

  return {
    users: paginatedUsers,
    filteredUsers,
    loading,
    error,
    search,
    setSearch,
    sortBy,
    setSortBy,
    favorites,
    toggleFavorite,
    currentPage,
    setCurrentPage: (page: number) => setCurrentPage(page),
    totalPages,
    retry: fetchUsers,
  };
};
