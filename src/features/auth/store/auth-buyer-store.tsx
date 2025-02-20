import Cookies from 'js-cookie';
import { create } from 'zustand';

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
  logout: (tokenBuyer: string) => void;
}

export const useAuthBuyerStore = create<AuthState>((set) => ({
  buyer: null,
  setBuyer: (buyerData) => {
    set({ buyer: buyerData });
  },
  clearAuth: () => {
    set({ buyer: null });
  },
  logout: (tokenBuyer) => {
    Cookies.remove(`token-buyer-${tokenBuyer}`);
    set({ buyer: null });
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },
}));
