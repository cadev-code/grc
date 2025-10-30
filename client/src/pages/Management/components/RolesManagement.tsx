import { ErrorMessage } from '@/components';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { useCreateRole, useRoles } from '@/hooks';
import { rolesColumns } from './rolesColumns';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { Rol } from '@/types';
import { RolesTable } from './RolesTable';
import { Button } from '@/components/ui/button';
import { useForm } from '@tanstack/react-form';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import z from 'zod';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

type Props = {
  open: boolean;
  onClose: (open: boolean) => void;
};

export const RolesManagement = ({ open, onClose }: Props) => {
  const formSchema = z.object({
    rol: z
      .string()
      .min(1)
      .regex(/^[a-zA-Z]+$/, {
        message: 'El rol solo puede contener letras',
      }),
    title: z
      .string()
      .trim()
      .min(1)
      .regex(/^[a-zA-Z\s]+$/, {
        message: 'El nombre solo puede contener letras y espacios',
      }),
  });

  const { mutate: createRol } = useCreateRole();

  const form = useForm({
    defaultValues: {
      rol: '',
      title: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      createRol(value);
      setShowForm(false);
      form.reset();
    },
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (open) {
      setShowForm(false);
      form.reset();
    }
  }, [open, form]);

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
            {showForm ? (
              <form
                className="p-4 space-y-4 border rounded-md"
                id="add-rol"
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
              >
                <FieldGroup className="flex flex-row gap-2 items-end">
                  <form.Field
                    name="rol"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            Identificador
                          </FieldLabel>
                          <Input
                            className={
                              isInvalid
                                ? 'transition-colors border-red-400'
                                : ''
                            }
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            // agregar disabled si el formulario está en estado de envío
                          />
                        </Field>
                      );
                    }}
                  />
                  <form.Field
                    name="title"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Rol</FieldLabel>
                          <Input
                            className={
                              isInvalid
                                ? 'transition-colors border-red-400'
                                : ''
                            }
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            // agregar disabled si el formulario está en estado de envío
                          />
                        </Field>
                      );
                    }}
                  />
                </FieldGroup>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    type="button"
                    onClick={() => {
                      form.reset();
                      setShowForm(false);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">Guardar</Button>
                </div>
              </form>
            ) : (
              <Button
                className="cursor-pointer"
                size="sm"
                onClick={() => setShowForm(true)}
              >
                Agregar Rol
              </Button>
            )}
            <RolesTable table={table} columns={columns} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
