import { useForm } from '@tanstack/react-form';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useCreateRole } from '@/hooks';
import z from 'zod';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { HoverCard, HoverCardContent } from '@/components/ui/hover-card';
import { HoverCardTrigger } from '@radix-ui/react-hover-card';
import { CircleQuestionMark } from 'lucide-react';
import { useIsMutating } from '@tanstack/react-query';

export const RolesForm = ({
  setShowForm,
}: {
  setShowForm: (show: boolean) => void;
}) => {
  const formSchema = z.object({
    rol: z
      .string()
      .min(1)
      .regex(/^[a-z]+$/, {
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

  const closeForm = () => {
    setShowForm(false);
    form.reset();
  };

  const isMutating = useIsMutating();
  const createRol = useCreateRole(closeForm);

  const form = useForm({
    defaultValues: {
      rol: '',
      title: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      createRol.mutate(value);
    },
  });

  return (
    <form
      className="p-4 border rounded-md relative"
      id="add-rol"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="flex flex-row gap-2 items-end mb-4">
        <form.Field
          name="rol"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Identificador</FieldLabel>
                <div className="relative">
                  <Input
                    className={`pr-10 ${isInvalid ? 'transition-colors border-red-400' : ''}`}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={createRol.isPending}
                  />
                  <div className="absolute right-1 top-1/2 -translate-y-1/2">
                    <HoverCard>
                      <HoverCardTrigger>
                        <Button
                          className="pointer-events-none"
                          type="button"
                          variant="ghost"
                          size="sm"
                        >
                          <CircleQuestionMark />
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <p className="text-xs">
                          El identificador del rol debe ser único y solo puede
                          contener letras minúsculas sin espacios.
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
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
                <div className="relative">
                  <Input
                    className={`pr-10 ${isInvalid ? 'transition-colors border-red-400' : ''}`}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={createRol.isPending}
                  />
                  <div className="absolute right-1 top-1/2 -translate-y-1/2">
                    <HoverCard>
                      <HoverCardTrigger>
                        <Button
                          className="pointer-events-none"
                          type="button"
                          variant="ghost"
                          size="sm"
                        >
                          <CircleQuestionMark />
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <p className="text-xs">
                          El nombre del rol puede contener letras, acentos y
                          espacios.
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
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
          disabled={createRol.isPending}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isMutating > 0}>
          Guardar
        </Button>
      </div>
      {createRol.isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded">
          <Spinner className="size-6" />
        </div>
      )}
    </form>
  );
};
