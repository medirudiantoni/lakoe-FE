import { create } from 'zustand';
import Cookies from 'js-cookie';

export interface AdminType {
  id: string;
  email: string;
  roleId: string; 
}

interface AdminAuthState {
  admin: AdminType | null;
  setAdmin: (admin: AdminType | null) => void;
  clearAdminAuth: () => void;
  logoutAdmin: () => void;
}

export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  admin: null,
  setAdmin: (adminData) => {
    set({ admin: adminData });
  },
  clearAdminAuth: () => {
    set({ admin: null });
  },
  logoutAdmin: () => {
    Cookies.remove('token');
    set({ admin: null });
    if (typeof window !== 'undefined') {
      window.location.href = '/login-admin';
    }
  },
}));
