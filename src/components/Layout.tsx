import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    const updateFavoriteCount = () => {
      const favoritesStr = localStorage.getItem('FAVORITES_STORAGE_KEY');
      if (favoritesStr) {
        const favorites = JSON.parse(favoritesStr);
        setFavoriteCount(favorites.length);
      } else {
        setFavoriteCount(0);
      }
    };

    updateFavoriteCount();

    // Listen for storage changes to update the badge
    window.addEventListener('storage', updateFavoriteCount);
    window.addEventListener('favoritesChanged', updateFavoriteCount);

    return () => {
      window.removeEventListener('storage', updateFavoriteCount);
      window.removeEventListener('favoritesChanged', updateFavoriteCount);
    };
  }, []);

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">웃</span>
            <span className="logo-text">Users</span>
          </Link>
          <nav className="nav">
            <Link to="/favorites" className="nav-link">
              <span>★</span>
              {favoriteCount > 0 && <span className="badge">{favoriteCount}</span>}
            </Link>
          </nav>
          <button
            className={`theme-btn ${theme}`}
            onClick={toggleTheme}
            title="Toggle dark mode"
            aria-label="Toggle dark mode"
          >
            {theme === 'light' ? '☾' : '☼'}
          </button>
        </div>
      </header>

      <main className="main">
        {children}
      </main>

      <footer className="footer">
        <p>© footer</p>
      </footer>
    </div>
  );
};
