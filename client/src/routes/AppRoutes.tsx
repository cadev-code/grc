import { Login } from '@/pages';
import { Navigate, Route, Routes } from 'react-router';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { Incidents, Management } from '@/pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="login" element={<Login />} />

        <Route index element={<Navigate to="/login" replace />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="incidentes" element={<Incidents />} />
        <Route path="management" element={<Management />} />

        <Route index element={<Navigate to="/incidentes" replace />} />

        <Route path="*" element={<Navigate to="/incidentes" replace />} />
      </Route>
    </Routes>
  );
};
