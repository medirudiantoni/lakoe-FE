import { create } from 'zustand';
import Cookies from 'js-cookie';
import { StoreFormProps } from '@/features/auth/types/store-types';

export interface UserType {
  id: string;
  name: string;
  email: string;
  Stores: StoreFormProps;
}
interface AuthState {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  clearAuth: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (userData) => {
    set({ user: userData });
  },
  clearAuth: () => {
    set({ user: null });
  },
  logout: () => {
    Cookies.remove('token');
    set({ user: null });
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },
}));
