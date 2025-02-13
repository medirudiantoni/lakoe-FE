import { create } from 'zustand';
import Cookies from 'js-cookie';
import { StoreFormProps } from '@/features/auth/types/store-types';

export interface BuyerType {
  id: string;
  name: string;
  email: string;
  phone: string;
}
interface AuthState {
  buyer: BuyerType | null;
  setBuyer: (buyer: BuyerType | null) => void;
  clearAuth: () => void;
  logout: () => void;
}

export const useAuthBuyerStore = create<AuthState>((set) => ({
  buyer: null,
  setBuyer: (buyerData) => {
    set({ buyer: buyerData });
  },
  clearAuth: () => {
    set({ buyer: null });
  },
  logout: () => {
    Cookies.remove('token-buyer');
    set({ buyer: null });
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },
}));
