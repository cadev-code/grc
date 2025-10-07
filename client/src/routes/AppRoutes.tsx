import { Login } from '@/pages';
import { Navigate, Route, Routes } from 'react-router';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { Incidents } from '@/pages';

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

      <Route element={<ProtectedRoute />}>
        <Route path="incidentes" element={<Incidents />} />

        <Route index element={<Navigate to="/incidentes" replace />} />

        <Route path="*" element={<Navigate to="/incidentes" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
