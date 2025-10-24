import type { User, UsersResponse } from '../types';

const API_BASE_URL = 'https://dummyjson.com';

/**
 * Fetch users from API with server-side pagination
 */
export const getUsers = async (limit: number = 30, skip: number = 0): Promise<User[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users?limit=${limit}&skip=${skip}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const data: UsersResponse = await response.json();
    return data.users;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

/**
 * Fetch single user by ID
 */
export const getUserById = async (id: number): Promise<User> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('User not found');
      }
      throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch user ${id}:`, error);
    throw error;
  }
};

/**
 * Search and filter users by name, firstName, lastName, or email
 */
export const searchAndFilterUsers = (users: User[], searchTerm: string): User[] => {
  if (!searchTerm.trim()) return users;

  const lowerSearch = searchTerm.toLowerCase();
  return users.filter(user =>
    user.firstName.toLowerCase().includes(lowerSearch) ||
    user.lastName.toLowerCase().includes(lowerSearch) ||
    user.email.toLowerCase().includes(lowerSearch) ||
    user.username.toLowerCase().includes(lowerSearch)
  );
};

/**
 * Sort users by name or age
 */
export const sortUsers = (
  users: User[],
  sortBy: 'name' | 'age' | 'none'
): User[] => {
  if (sortBy === 'none') return users;

  const sorted = [...users];
  
  if (sortBy === 'name') {
    sorted.sort((a, b) =>
      `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
    );
  } else if (sortBy === 'age') {
    sorted.sort((a, b) => a.age - b.age);
  }

  return sorted;
};

/**
 * Get favorite users from localStorage
 */
export const getFavorites = (): number[] => {
  const saved = localStorage.getItem('user-favorites');
  return saved ? JSON.parse(saved) : [];
};

/**
 * Check if user is online
 */
export const checkOnlineStatus = (): boolean => {
  return navigator.onLine;
};
