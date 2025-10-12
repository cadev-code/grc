import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Management = () => {
  const [rol, setRol] = useState('');

  useEffect(() => {
    setRol('all');
  }, []);

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
                >
                  Administrar Roles
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre o usuario"
                    className="pl-10"
                  />
                </div>

                <Select
                  value={rol}
                  // onValueChange={(v: any) => setRole(v)}
                >
                  <SelectTrigger className="w-full sm:w-[220px]">
                    <SelectValue placeholder="Rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los roles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
