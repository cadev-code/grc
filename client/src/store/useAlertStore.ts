import { create } from 'zustand';

type Alert = {
  message: string;
  type?: 'success' | 'error' | 'info';
};

type AlertState = {
  alert: Alert | null;
  showAlert: (message: string, type?: Alert['type']) => void;
  clearAlert: () => void;
};

export const useAlertStore = create<AlertState>((set) => ({
  alert: null,
  showAlert: (message, type = 'info') => set({ alert: { message, type } }),
  clearAlert: () => set({ alert: null }),
}));
