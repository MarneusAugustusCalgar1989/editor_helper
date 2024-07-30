import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const context = useAuth();

  if (!context.user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
