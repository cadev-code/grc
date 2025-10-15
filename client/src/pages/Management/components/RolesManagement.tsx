import { ErrorMessage } from '@/components';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { useRoles } from '@/hooks';
import { rolesColumns } from './rolesColumns';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { Rol } from '@/types';
import { RolesTable } from './RolesTable';
import { Button } from '@/components/ui/button';

type Props = {
  open: boolean;
  onClose: (open: boolean) => void;
};

export const RolesManagement = ({ open, onClose }: Props) => {
  const { isLoading, data, isError, error } = useRoles();

  const columns = rolesColumns({
    onEdit: (rol: Rol) => {
      console.log('Editar rol:', rol);
    },
    onDelete: (rol: Rol) => {
      console.log('Eliminar rol:', rol);
    },
  });

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Roles de usuario</DialogTitle>
          <DialogDescription>
            Gestiona los roles y permisos de los usuarios
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="h-48 mx-auto flex items-center">
            <Spinner />
          </div>
        ) : isError && error ? (
          <ErrorMessage
            error={error?.response.data.error}
            message={error?.response.data.message}
          />
        ) : (
          <div className="space-y-4">
            <Button className="cursor-pointer" size="sm">
              Agregar Rol
            </Button>
            <RolesTable table={table} columns={columns} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
