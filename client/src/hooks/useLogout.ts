import { useMutation } from '@tanstack/react-query';
import { poster } from '@/api';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { queryClient } from '@/config/queryClient';

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation<
    unknown,
    AxiosError<{ message: string; error: string }>,
    void
  >({
    mutationFn: () => poster('/auth/logout'),
    onError: (error) => {
      console.error('Logout error:', error.response?.data.error);
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['currentUser'] });
      navigate('/login');
    },
  });
};
