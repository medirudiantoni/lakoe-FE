import { StoreType } from '@/features/auth/types/prisma-types';
import { create } from 'zustand';

interface StoreHooksType {
  store: StoreType | null;
  setStore: (data: StoreType) => void;
  clearStore: () => void;
}

export const useSellerStore = create<StoreHooksType>((set) => ({
  store: null,
  setStore: (data) => set({ store: data }),
  clearStore: () => set({ store: null }),
}));
