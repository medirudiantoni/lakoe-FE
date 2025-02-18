import { StoreType } from '@/features/auth/types/prisma-types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

interface StoreHooksType {
  store: StoreType | null;
  setStore: (data: StoreType) => void;
  clearStore: () => void;
}

export const useSellerStore = create<StoreHooksType>()(
  persist(
    (set) => ({
      store: null,
      setStore: (data) => {
        set({ store: data });
        Cookies.set('store', JSON.stringify(data)); 
      },
      clearStore: () => {
        set({ store: null });
        Cookies.remove('store');
      },
    }),
    {
      name: 'seller-store', 
    }
  )
);
