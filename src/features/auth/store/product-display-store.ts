import { create } from "zustand";
import { ProductType } from "../types/prisma-types";

interface DisplayProduct {
    productsZust: ProductType[],
    setDisplayProducts: (data: ProductType[]) => void;
    removeProduct: (id: string) => void;
};

const useProductDisplay = create<DisplayProduct>(set => ({
    productsZust: [],
    setDisplayProducts: (data) => set({ productsZust: data }),
    removeProduct: (id) => set(state => ({ productsZust: state.productsZust.filter(e => e.id !== id) }))
}));

export default useProductDisplay;