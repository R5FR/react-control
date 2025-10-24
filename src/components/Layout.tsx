import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">웃</span>
            <span className="logo-text">Users</span>
          </Link>
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
