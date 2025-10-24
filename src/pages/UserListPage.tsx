import { useUsers } from '../hooks/useUsers';
import { UserCard } from '../components/UserCard';
import { Skeleton } from '../components/Loader';
import './UserListPage.css';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

export const UserListPage: React.FC = () => {
  const {
    users,
    loading,
    error,
    search,
    setSearch,
    sortBy,
    setSortBy,
    favorites,
    toggleFavorite,
    currentPage,
    setCurrentPage,
    totalPages,
    retry,
  } = useUsers();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return <Skeleton count={6} />;
  }

  return (
    <div className="user-list-page">
      <div className="page-header">
        <h1>User Directory</h1>
        <p className="page-subtitle">Browse and explore all users in the system</p>
      </div>
      <div className="controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name, email, or username..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
        </div>

        <div className="sort-controls">
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value as 'name' | 'age' | 'none');
              setCurrentPage(1);
            }}
            className="sort-select"
          >
            <option value="none">No sort</option>
            <option value="name">Sort by Name</option>
            <option value="age">Sort by Age</option>
          </select>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={retry} className="retry-btn">
              Retry
            </button>
          </div>
        )}
      </div>

      {users.length === 0 && !loading ? (
        <div className="no-results">
          <p>No users found. Try adjusting your search.</p>
        </div>
      ) : (
        <>
          <div className="users-grid">
            {users.map(user => (
              <UserCard
                key={user.id}
                user={user}
                isFavorite={favorites.includes(user.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>

            <div className="pagination">
              <button
                onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                ← Previous
              </button>
              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next →
              </button>
            </div>
        </>
      )}
    </div>
  );
};
