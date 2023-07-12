import { Route, Navigate } from 'react-router-dom';
import { ReactElement } from 'react';
import { useAuth } from '../../context/AuthProvider';

function ProtectedRoute({ children }: { children: ReactElement }) {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
