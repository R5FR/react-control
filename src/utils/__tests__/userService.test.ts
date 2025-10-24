import { describe, it, expect } from 'vitest';
import { searchAndFilterUsers, sortUsers } from '../userService';
import type { User } from '../../types';

// Mock user data
const mockUsers: User[] = [
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
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    age: 32,
    phone: '555-0002',
    username: 'janesmith',
    image: 'https://i.pravatar.cc/150?img=2',
    company: { name: 'Design Studio', department: 'Design', title: 'Designer' },
    address: { address: '456 Oak', city: 'Los Angeles', country: 'USA', postalCode: '90001', state: 'CA' },
    height: 165,
    weight: 62,
    bloodGroup: 'A+',
    birthDate: '1991-05-15',
    gender: 'Female',
    university: 'Stanford',
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob@example.com',
    age: 45,
    phone: '555-0003',
    username: 'bobjohnson',
    image: 'https://i.pravatar.cc/150?img=3',
    company: { name: 'Finance Inc', department: 'Finance', title: 'Manager' },
    address: { address: '789 Pine', city: 'Chicago', country: 'USA', postalCode: '60601', state: 'IL' },
    height: 178,
    weight: 80,
    bloodGroup: 'B+',
    birthDate: '1978-12-20',
    gender: 'Male',
    university: 'Harvard',
  },
];

describe('User Service Utilities', () => {
  describe('searchAndFilterUsers', () => {
    it('should return all users when search is empty', () => {
      const result = searchAndFilterUsers(mockUsers, '');
      expect(result).toHaveLength(3);
    });

    it('should return all users when search is whitespace', () => {
      const result = searchAndFilterUsers(mockUsers, '   ');
      expect(result).toHaveLength(3);
    });

    it('should filter users by first name', () => {
      const result = searchAndFilterUsers(mockUsers, 'john');
      expect(result).toHaveLength(2); // John Doe and Bob Johnson
      expect(result[0].firstName).toBe('John');
    });

    it('should filter users by last name', () => {
      const result = searchAndFilterUsers(mockUsers, 'smith');
      expect(result).toHaveLength(1);
      expect(result[0].lastName).toBe('Smith');
    });

    it('should filter users by email', () => {
      const result = searchAndFilterUsers(mockUsers, 'jane@example.com');
      expect(result).toHaveLength(1);
      expect(result[0].email).toBe('jane@example.com');
    });

    it('should filter users by username', () => {
      const result = searchAndFilterUsers(mockUsers, 'bobjohnson');
      expect(result).toHaveLength(1);
      expect(result[0].username).toBe('bobjohnson');
    });

    it('should be case insensitive', () => {
      const result1 = searchAndFilterUsers(mockUsers, 'JOHN');
      const result2 = searchAndFilterUsers(mockUsers, 'john');
      expect(result1).toHaveLength(result2.length);
    });

    it('should return empty array when no matches', () => {
      const result = searchAndFilterUsers(mockUsers, 'nonexistent');
      expect(result).toHaveLength(0);
    });
  });

  describe('sortUsers', () => {
    it('should return unsorted array when sortBy is "none"', () => {
      const result = sortUsers(mockUsers, 'none');
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
      expect(result[2].id).toBe(3);
    });

    it('should sort users by name alphabetically', () => {
      const result = sortUsers(mockUsers, 'name');
      expect(result[0].firstName).toBe('Bob'); // Bob Johnson
      expect(result[1].firstName).toBe('Jane'); // Jane Smith
      expect(result[2].firstName).toBe('John'); // John Doe
    });

    it('should sort users by age in ascending order', () => {
      const result = sortUsers(mockUsers, 'age');
      expect(result[0].age).toBe(28); // John - 28
      expect(result[1].age).toBe(32); // Jane - 32
      expect(result[2].age).toBe(45); // Bob - 45
    });

    it('should not mutate the original array', () => {
      const original = [...mockUsers];
      sortUsers(mockUsers, 'name');
      expect(mockUsers).toEqual(original);
    });

    it('should handle single user array', () => {
      const singleUser = [mockUsers[0]];
      const result = sortUsers(singleUser, 'name');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });

    it('should handle empty array', () => {
      const result = sortUsers([], 'name');
      expect(result).toHaveLength(0);
    });
  });
});
