import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { User } from '../types';
import { getUserById } from '../utils/userService';
import { Loader } from '../components/Loader';
import './UserDetailPage.css';
import toast from 'react-hot-toast';

export const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const userData = await getUserById(Number(id));
        setUser(userData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load user';
        setError(errorMessage);
        toast.error(errorMessage);
        
        if (errorMessage === 'User not found') {
          setTimeout(() => navigate('/404'), 2000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate]);

  if (loading) {
    return <Loader message="Loading user details..." />;
  }

  if (error || !user) {
    return (
      <div className="user-detail-page error">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate(-1)} className="back-btn">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-detail-page">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back to list
      </button>

      <div className="detail-container">
        <div className="detail-header">
          <img src={user.image} alt={user.firstName} className="detail-avatar" />
          <div className="detail-header-info">
            <h1>
              {user.firstName} {user.lastName}
            </h1>
            <p className="detail-subtitle">{user.company.title}</p>
          </div>
        </div>

        <div className="detail-sections">
          <section className="detail-section">
            <h2>Contact Information</h2>
            <div className="detail-item">
              <label>Email:</label>
              <p>{user.email}</p>
            </div>
            <div className="detail-item">
              <label>Phone:</label>
              <p>{user.phone}</p>
            </div>
            <div className="detail-item">
              <label>Username:</label>
              <p>{user.username}</p>
            </div>
          </section>

          <section className="detail-section">
            <h2>Personal Information</h2>
            <div className="detail-item">
              <label>Age:</label>
              <p>{user.age} years old</p>
            </div>
            <div className="detail-item">
              <label>Gender:</label>
              <p>{user.gender}</p>
            </div>
            <div className="detail-item">
              <label>Birth Date:</label>
              <p>{new Date(user.birthDate).toLocaleDateString()}</p>
            </div>
            <div className="detail-item">
              <label>Blood Type:</label>
              <p>{user.bloodGroup}</p>
            </div>
          </section>

          <section className="detail-section">
            <h2>Physical Information</h2>
            <div className="detail-item">
              <label>Height:</label>
              <p>{user.height} cm</p>
            </div>
            <div className="detail-item">
              <label>Weight:</label>
              <p>{user.weight} kg</p>
            </div>
          </section>

          <section className="detail-section">
            <h2>Work Information</h2>
            <div className="detail-item">
              <label>Company:</label>
              <p>{user.company.name}</p>
            </div>
            <div className="detail-item">
              <label>Department:</label>
              <p>{user.company.department}</p>
            </div>
            <div className="detail-item">
              <label>Job Title:</label>
              <p>{user.company.title}</p>
            </div>
          </section>

          <section className="detail-section">
            <h2>Address</h2>
            <div className="detail-item">
              <label>Street:</label>
              <p>{user.address.address}</p>
            </div>
            <div className="detail-item">
              <label>City:</label>
              <p>{user.address.city}</p>
            </div>
            <div className="detail-item">
              <label>State:</label>
              <p>{user.address.state}</p>
            </div>
            <div className="detail-item">
              <label>Country:</label>
              <p>{user.address.country}</p>
            </div>
            <div className="detail-item">
              <label>Postal Code:</label>
              <p>{user.address.postalCode}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
