import { create } from 'zustand';
import Cookies from 'js-cookie';
import { deleteProduct } from '../services/product-service';
import toast from 'react-hot-toast';
import { ProductType } from '../types/product-type';

interface ProductSelectionState {
  selectedProducts: string[]; 
  setSelectedProducts: (ids: string[]) => void;
  toggleSelectAll: (allIds: string[]) => void;
  toggleProductSelection: (id: string) => void; 
}

interface CrudProduct{
  products: ProductType[]
  deleteProduct: (id:string) => void;
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

  deleteProduct: async (productId) => {
    const token = Cookies.get('token')
    if(!token) {
      console.log('token not found')
      return;
    }

    try {
      await deleteProduct(productId, token)
      toast.success('Produk telah dihapus')
    } catch (error) {
      console.log('Error deleting product', error)
      toast.error('Produk gagal dhapus')
    }
  }
}))
