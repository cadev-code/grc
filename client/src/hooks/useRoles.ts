import { fetcher } from '@/api';
import { RolesResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useRoles = () => {
  return useQuery<RolesResponse, AxiosError>({
    queryKey: ['roles'],
    queryFn: () => fetcher<RolesResponse>('/roles/all'),
    retry: true,
    staleTime: 1000 * 60, // 1 minuto en cache
  });
};
