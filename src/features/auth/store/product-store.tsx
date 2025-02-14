import { create } from 'zustand';
import Cookies from 'js-cookie';
import { deleteProduct, fetchProduct, updateProductPrice, updateProductStock } from '../services/product-service';
import toast from 'react-hot-toast';
import { ProductType } from '../types/product-type';
import { useAuthStore } from './auth-store';

interface ProductSelectionState {
  selectedProducts: string[]; 
  setSelectedProducts: (ids: string[]) => void;
  toggleSelectAll: (allIds: string[]) => void;
  toggleProductSelection: (id: string) => void; 
}

interface CrudProduct{
  products: ProductType[];
  fetchProducts: () => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updatePrice: (id: string, price: number) => Promise<void>;
  updateStock: (id: string, price: number) => Promise<void>;
}

export const useCheckboxStore = create<ProductSelectionState>((set) => ({
  selectedProducts: [],
  setSelectedProducts: (ids) => set({ selectedProducts: ids }),
  toggleSelectAll: (allIds) =>
    set((state) => ({
      selectedProducts:
        state.selectedProducts.length === allIds.length ? [] : allIds,
    })),
  toggleProductSelection: (id) =>
    set((state) => ({
      selectedProducts: state.selectedProducts.includes(id)
        ? state.selectedProducts.filter((productId) => productId !== id)
        : [...state.selectedProducts, id],
    })),
}));

export const useProductStore = create<CrudProduct>((set) => ({
  products: [],

  fetchProducts: async () => {
    const { user } = useAuthStore.getState();
    const token = Cookies.get('token');

    if (!token) {
      toast.error('Token tidak ditemukan');
      return;
    }

    try {
      const storeId = user?.Stores?.id;
      if (!storeId) {
        toast.error('Store ID tidak ditemukan');
        return;
      }

      const products = await fetchProduct(storeId, token);
      console.log('Data produk dari API:', products);
      set({ products });
    } catch (error) {
      toast.error('Gagal mengambil produk');
      console.error('Gagal fetch produk:', error);
    }
  },

  deleteProduct: async (productId) => {
    const token = Cookies.get('token');
    if (!token) {
      console.log('Token tidak ditemukan!');
      return;
    }
  
    try {
      await deleteProduct(productId, token);
  
      set((state) => ({
        products: state.products.filter((product) => product.id !== productId),
      }));
    } catch (error) {
      console.error('Gagal menghapus produk:', error);
      toast.error('Produk gagal dihapus');
    }
  },
  
  updatePrice: async (productId, price) => {
    const token = Cookies.get('token');
    if (!token) {
      toast.error('Token tidak ditemukan');
      return;
    }
  
    try {
      await updateProductPrice(productId, price, token);
      toast.success('Harga produk berhasil diperbarui');
  
      set((state) => ({
        products: state.products.map((product) =>
          product.id === productId ? { ...product, price } : product
        ),
      }));
    } catch (error) {
      console.error('Gagal memperbarui harga:', error);
      toast.error('Gagal memperbarui harga produk');
    }
  },

  updateStock: async (productId, stock) => {
    const token = Cookies.get('token');
    if (!token) {
      toast.error('Token tidak ditemukan');
      return;
    }
  
    try {
      await updateProductStock(productId, stock, token);
      toast.success('Stock produk berhasil diperbarui');
  
      set((state) => ({
        products: state.products.map((product) =>
          product.id === productId ? { ...product, stock } : product
        ),
      }));
    } catch (error) {
      console.error('Gagal memperbarui stock:', error);
      toast.error('Gagal memperbarui stock produk');
    }
  },
  
}));
