import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleter } from '@/api';
import { useAlertStore } from '@/store';
import { AxiosError } from 'axios';

export const useDeleteRol = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlertStore();

  return useMutation({
    mutationFn: (id: number) => deleter(`/roles/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      showAlert('Rol eliminado correctamente', 'success');
    },
    onError: (error: AxiosError<{ message: string; error: string }>) => {
      showAlert(error.response?.data?.message || 'Ocurrió un error', 'error');
    },
  });
};
