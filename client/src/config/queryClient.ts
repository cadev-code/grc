import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    // Peticiones GET, consulta de datos
    queries: {
      retry: 1, // Reintenta una vez en caso de error
      refetchOnWindowFocus: false, // No refetch (reconsulta) al enfocar la ventana
      staleTime: 1000 * 60 * 1, // Datos frescos por 1 minutos (reutiliza desde cache durante 1 minutos hasta vencer en caso de consultar al mismo sitio)
    },
    // POST, PUT, DELETE
    mutations: {
      retry: 0, // Si falla evita reintentos (evitar registros duplicados)
    },
  },
});
