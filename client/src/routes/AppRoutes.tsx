import { AuthenticatedUser, Login } from '@/pages';
import { Navigate, Route, Routes } from 'react-router';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="authenticated"
        element={
          <ProtectedRoute>
            <AuthenticatedUser />
          </ProtectedRoute>
        }
      />

      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
