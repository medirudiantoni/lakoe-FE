import { create } from 'zustand';
import { fetchCategory } from '../services/category-service';
type Category = {
  id: string;
  name: string;
};

type CategoryStore = {
  categories: Category[]; // Simpan semua kategori
  selectedCategoryId: string | null; // Simpan ID kategori yang dipilih
  fetchCategories: () => Promise<void>;
  setSelectedCategoryId: (id: string) => void;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  selectedCategoryId: null,

  fetchCategories: async () => {
    try {
      const categories = await fetchCategory();
      set({ categories }); // Simpan semua kategori
    } catch (error) {
      console.error("Gagal ambil kategori:", error);
    }
  },

  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }), // Set kategori yang dipilih
}));