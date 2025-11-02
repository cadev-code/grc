import { ErrorMessage } from '@/components';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { RolesTable } from './RolesTable';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { RolesForm } from './RolesForm';
import { useRoles } from '@/hooks';

type Props = {
  open: boolean;
  onClose: (open: boolean) => void;
};

export const RolesManagement = ({ open, onClose }: Props) => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (open) {
      setShowForm(false);
    }
  }, [open]);

  const { isLoading, data, isError, error } = useRoles();

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
            {showForm ? (
              <RolesForm setShowForm={setShowForm} />
            ) : (
              <Button
                className="cursor-pointer"
                size="sm"
                onClick={() => setShowForm(true)}
              >
                Agregar Rol
              </Button>
            )}
            <RolesTable data={data?.data || []} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
