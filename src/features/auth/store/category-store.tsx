import { create } from 'zustand';
import { fetchCategory } from '../services/category-service';
type Category = {
  id: string;
  name: string;
  children?: Category[];
};

type CategoryStore = {
  categories: Category[]; 
  selectedCategoryId: string | null; 
  fetchCategories: () => Promise<void>;
  setSelectedCategoryId: (id: string) => void;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  selectedCategoryId: null,

  fetchCategories: async () => {
    try {
      const categories = await fetchCategory();
      
      // Pastikan setiap kategori memiliki `children` (meskipun kosong)
      const formattedCategories = categories.map((cat:any) => ({
        ...cat,
        children: cat.children ?? [] // Jaga-jaga kalau API tidak mengembalikan `children`
      }));
  
      set({ categories: formattedCategories });
    } catch (error) {
      console.error("Gagal ambil kategori:", error);
    }
  },
  

  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
}));