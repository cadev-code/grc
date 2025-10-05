import { GlobalAlert } from '@/components';
import { AppRoutes } from '@/routes';
import { useCurrentUser } from '@/hooks';
import { useEffect } from 'react';
import { useAuthStore } from './store';
import { Loader2 } from 'lucide-react';

export const App = () => {
  const { data: user, isError, isLoading } = useCurrentUser();
  const { login, logout } = useAuthStore();

  useEffect(() => {
    if (user) {
      login(user);
    } else if (isError) {
      logout();
    }
  }, [user, isError, logout, login]);

  return (
    <>
      {isLoading ? (
        <div className="w-[100vw] h-[100vh] flex items-center justify-center text-gray-600">
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>
      ) : (
        <AppRoutes />
      )}
      <GlobalAlert />
    </>
  );
};
