import { create } from 'zustand';
import { ProductType } from '../types/prisma-types';
// import { ProductType } from '../types/product-type';

interface ProductStore {
  products: ProductType[] | null;
  setProducts: (products: ProductType[]) => void;
  updateProductStatus: (productId: string, newStatus: boolean) => void;
  removeProduct: (id: string) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: null,
  setProducts: (products) => set({ products }),
  updateProductStatus: (productId, newStatus) =>
    set((state) => ({
      products: state.products
        ? state.products.map((product) =>
            product.id === productId
              ? { ...product, isActive: newStatus }
              : product
          )
        : null,
    })),
  removeProduct: (id) => set(state => ({ products: state.products?.filter(e => e.id !== id) }))
}));
