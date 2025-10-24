import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCard } from '../components/UserCard';
import type { User } from '../types';
import toast from 'react-hot-toast';
import './FavoritesPage.css';

export const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = () => {
      try {
        const favoritesStr = localStorage.getItem('FAVORITES_STORAGE_KEY');
        if (favoritesStr) {
          const favoriteIds = JSON.parse(favoritesStr);
          const allUsersStr = localStorage.getItem('ALL_USERS_CACHE');
          
          if (allUsersStr) {
            const allUsers: User[] = JSON.parse(allUsersStr);
            const favUsers = allUsers.filter((user: User) =>
              favoriteIds.includes(user.id)
            );
            setFavorites(favUsers);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading favorites:', error);
        toast.error('Failed to load favorites');
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const handleToggleFavorite = (userId: number) => {
    setFavorites(prev => prev.filter(user => user.id !== userId));
    toast.success('Removed from favorites');
  };

  if (loading) {
    return (
      <div className="favorites-page">
        <div className="page-header">
          <h1>My Favorites</h1>
          <p className="page-subtitle">Loading your favorite users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="page-header">
        <h1>My Favorites</h1>
        <p className="page-subtitle">
          {favorites.length} user{favorites.length !== 1 ? 's' : ''} marked as favorite
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">[*]</div>
          <h2>No Favorites Yet</h2>
          <p>Start adding users to your favorites to see them here.</p>
          <Link to="/" className="back-to-list-btn">
            Browse Users
          </Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map(user => (
            <UserCard
              key={user.id}
              user={user}
              isFavorite={true}
              onToggleFavorite={() => handleToggleFavorite(user.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
