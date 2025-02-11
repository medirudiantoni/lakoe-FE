import { VariantOptions } from "@/page/productpage/add-product/item-variant-form";
import { create } from "zustand";

type VariantProduct = {
    name: string;
    isActive: boolean;
    variantOptions: VariantOptions;
}

type VariantGlobalState = {
    variants: VariantProduct[];
    addVariants: (data: VariantProduct) => void;
};

const useVariantState = create<VariantGlobalState>(set => ({
    variants: [],
    addVariants: (data) => set(state => ({ variants: [...state.variants, data] }))
}));

export default useVariantState;