import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks';

export const AuthenticatedUser = () => {
  const logout = useLogout();

  return (
    <div className="p-4 space-y-4">
      <h1>Usuario autenticado</h1>
      <Button onClick={() => logout.mutate()}>Cerrar sesión</Button>
    </div>
  );
};
