import { fetcher } from '@/api';
import { RolesResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useRoles = () => {
  return useQuery<
    RolesResponse,
    AxiosError & { response: { data: { error: string; message: string } } }
  >({
    queryKey: ['roles'],
    queryFn: () => fetcher<RolesResponse>('/roles/all'),
    retry: 2, // Reintenta 2 veces en caso de error
    retryDelay: 1000, // Espera 1 segundos entre reintentos
    staleTime: 1000 * 60, // 1 minuto en cache
  });
};
