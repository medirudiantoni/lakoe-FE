import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { OrderItemType, ProductType, VariantOptionValueType } from "../types/prisma-types";

interface ProductSelectionState {
  selectedProducts: string[];
  setSelectedProducts: (ids: string[]) => void;
  toggleSelectAll: (allIds: string[]) => void;
  toggleProductSelection: (id: string) => void;
}

interface ProductStore {
  products: OrderItemType[];
  selectedProduct?: OrderItemType;
  selectedVariantOption?: VariantOptionValueType;
  setProducts: (products: OrderItemType[]) => void;
  setSelectedProduct: (product: OrderItemType | undefined) => void;
  setSelectedVariantOption: (variant: VariantOptionValueType | undefined) => void;
}

export const useCheckboxStore = create(
  persist<ProductSelectionState>(
    (set) => ({
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
    }),
    {
      name: "checkbox-store",
      storage: createJSONStorage(() => localStorage), // ✅ Perbaikan di sini
    }
  )
);

export const useProductStore = create(
  persist<ProductStore>(
    (set) => ({
      products: [],
      selectedProduct: undefined,
      selectedVariantOption: undefined,
      setProducts: (products) => set({ products }),
      setSelectedProduct: (product) => set({ selectedProduct: product }),
      setSelectedVariantOption: (variant) => set({ selectedVariantOption: variant }),
    }),
    {
      name: "product-store",
      storage: createJSONStorage(() => localStorage), // ✅ Perbaikan di sini
    }
  )
);
