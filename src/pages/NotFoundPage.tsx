import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you're looking for doesn't exist or the user was not found.</p>
        <Link to="/" className="home-link">
          Back to Home
        </Link>
      </div>
    </div>
  );
};
