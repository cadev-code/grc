import { useMutation, useQueryClient } from '@tanstack/react-query';
import { poster } from '@/api';
import { useAlertStore } from '@/store';
import { AxiosError } from 'axios';
import { CreateRol } from '@/types';

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlertStore();

  return useMutation({
    mutationFn: (data: CreateRol) => poster('/roles', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      showAlert('Rol creado exitosamente', 'success');
    },
    onError: (error: AxiosError<{ message: string; error: string }>) => {
      showAlert(error.response?.data?.message || 'Ocurrió un error', 'error');
    },
  });
};
