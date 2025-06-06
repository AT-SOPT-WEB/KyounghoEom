import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { userId } = useAuth();
  
  return userId ? <>{children}</> : <Navigate to={ROUTES.LOGIN} />;
};

export default ProtectedRoute; 