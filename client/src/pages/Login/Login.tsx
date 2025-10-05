import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { validate, ERROR_MESSAGES } from '@/lib';
import { useAlertStore } from '@/store';
import { useLogin } from '@/hooks';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const { showAlert } = useAlertStore();

  const login = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (login.isPending) return;

    if (!validate.username(username)) {
      showAlert(ERROR_MESSAGES.username.invalid, 'error');
      return;
    }

    if (!validate.password(password)) {
      showAlert(ERROR_MESSAGES.password.invalid, 'error');
      return;
    }

    login.mutate({ username, password });
  };

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
          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="on">
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="user.name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={login.isPending}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={login.isPending}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={
                    showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={remember}
                onCheckedChange={(v) => setRemember(Boolean(v))}
              />
              <Label
                htmlFor="remember"
                className="text-sm text-muted-foreground"
              >
                Recordarme en este dispositivo
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={login.isPending}>
              {login.isPending ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Iniciando sesión
                </span>
              ) : (
                'Entrar'
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              ¿Olvidaste tu contraseña? Contacta al administrador.
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
