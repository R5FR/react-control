// User API Response Types
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  username: string;
  image: string;
  company: Company;
  address: Address;
  height: number;
  weight: number;
  bloodGroup: string;
  birthDate: string;
  gender: string;
  university: string;
}

export interface Company {
  department: string;
  name: string;
  title: string;
}

export interface Address {
  address: string;
  city: string;
  country: string;
  postalCode: string;
  state: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

// Hook Return Types
export interface UseUsersReturn {
  users: User[];
  filteredUsers: User[];
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (value: string) => void;
  sortBy: 'name' | 'age' | 'none';
  setSortBy: (value: 'name' | 'age' | 'none') => void;
  favorites: number[];
  toggleFavorite: (userId: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  retry: () => void;
}

// Theme Context Types
export type ThemeMode = 'light' | 'dark';

export interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}
