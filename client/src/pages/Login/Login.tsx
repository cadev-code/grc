import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { REGEX } from '@/lib';
import { useLogin } from '@/hooks';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

const formSchema = z.object({
  username: z
    .string()
    .regex(REGEX.USERNAME, 'Nombre de usuario inválido o inexistente.'),
  password: z
    .string()
    .regex(REGEX.PASSWORD, 'Contraseña inválida o incorrecta.'),
  rememberMe: z.boolean(),
});

export const Login = () => {
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: (values) => {
      login.mutate(values.value);
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const login = useLogin();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-border">
        <CardHeader>
          <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
          <CardDescription>
            Accede al sistema de gestión de incidentes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="login"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="username"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Usuario</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        disabled={login.isPending}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Contraseña</FieldLabel>
                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="password"
                          placeholder="••••••••"
                          disabled={login.isPending}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2"
                          onClick={() => setShowPassword((v) => !v)}
                          aria-label={
                            showPassword
                              ? 'Ocultar contraseña'
                              : 'Mostrar contraseña'
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="rememberMe"
                children={(field) => {
                  return (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={field.name}
                        checked={field.state.value}
                        onCheckedChange={(v) => field.handleChange(Boolean(v))}
                      />
                      <Label
                        htmlFor={field.name}
                        className="text-sm text-muted-foreground"
                      >
                        Recordarme en este dispositivo
                      </Label>
                    </div>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Field orientation="horizontal">
            <Button
              form="login"
              type="submit"
              className="w-full"
              disabled={login.isPending}
            >
              {login.isPending ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Iniciando sesión
                </span>
              ) : (
                'Entrar'
              )}
            </Button>
          </Field>
          <div className="text-center text-sm text-muted-foreground">
            ¿Olvidaste tu contraseña? Contacta al administrador.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
