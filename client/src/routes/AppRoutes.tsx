import { AuthenticatedUser, Login } from '@/pages';
import { Navigate, Route, Routes } from 'react-router';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="authenticated" element={<AuthenticatedUser />} />

      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
