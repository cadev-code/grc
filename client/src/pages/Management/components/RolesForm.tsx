import { useForm } from '@tanstack/react-form';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useCreateRole } from '@/hooks';
import z from 'zod';
import { Button } from '@/components/ui/button';

export const RolesForm = ({
  setShowForm,
}: {
  setShowForm: (show: boolean) => void;
}) => {
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

  return (
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
                <FieldLabel htmlFor={field.name}>Identificador</FieldLabel>
                <Input
                  className={
                    isInvalid ? 'transition-colors border-red-400' : ''
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
                    isInvalid ? 'transition-colors border-red-400' : ''
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
  );
};
