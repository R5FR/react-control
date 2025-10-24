import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { User } from '../types';
import './UserCard.css';

interface UserCardProps {
  user: User;
  isFavorite: boolean;
  onToggleFavorite: (userId: number) => void;
}

const UserCardComponent: React.FC<UserCardProps> = ({
  user,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="user-card">
      <Link to={`/user/${user.id}`} className="user-card-link">
        <div className="user-card-header">
          <img src={user.image} alt={user.firstName} className="user-avatar" />
          <button
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(user.id);
            }}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            ★
          </button>
        </div>
        <div className="user-card-content">
          <h3 className="user-name">
            {user.firstName} {user.lastName}
          </h3>
          <p className="user-email">{user.email}</p>
          <p className="user-company">{user.company.name}</p>
          <p className="user-city">{user.address.city}</p>
        </div>
      </Link>
    </div>
  );
};

export const UserCard = memo(UserCardComponent);
