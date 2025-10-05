import { useAuthStore } from '@/store';
import { JSX } from 'react';
import { Navigate } from 'react-router';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
