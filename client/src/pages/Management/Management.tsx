import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRoles } from '@/hooks';
import { Rol } from '@/types';
import { Plus, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FilterBar, RolesManagement } from './components';

export const Management = () => {
  const { data: rolesData, isLoading: rolesIsLoading } = useRoles();

  const [roles, setRoles] = useState<Rol[]>([]);

  useEffect(() => {
    if (!rolesIsLoading && !rolesData?.error) {
      setRoles(rolesData?.data || []);
    }
  }, [rolesData, rolesIsLoading]);

  const [filter, setFilter] = useState({
    search: '',
    rol: 'all',
  });

  const [openRoles, setOpenRoles] = useState(false);

  return (
    <div className="min-h-screen w-full">
      <header className="border-b bg-card">
        <div className="container px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <div>
              <h1 className="text-xl font-bold">Usuarios</h1>
              <p className="text-sm text-muted-foreground">
                Administra usuarios y roles
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2"></div>
        </div>
      </header>

      <div className="container px-6 py-8 space-y-6">
        <Card className="rounded-md">
          <CardHeader>
            <CardTitle>Usuarios registrados</CardTitle>
            <CardDescription>
              Filtra y gestiona las cuentas de usuario
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Button size="sm" className="cursor-pointer">
                  <Plus />
                  Agregar Usuario
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => setOpenRoles(true)}
                >
                  Administrar Roles
                </Button>
              </div>

              <FilterBar
                filter={filter}
                setFilter={setFilter}
                roles={roles}
                isLoading={rolesIsLoading}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <RolesManagement open={openRoles} onClose={setOpenRoles} />
    </div>
  );
};
