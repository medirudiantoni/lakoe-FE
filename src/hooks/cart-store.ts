import { CartItemType } from '@/features/auth/types/prisma-types';
import { create } from 'zustand';

interface CartStore {
  cart: CartItemType[];
  totalQuantity: number;
  totalPrice: number;
  setManyCart: (data: CartItemType[]) => void;
  addCart: (item: CartItemType) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeCart: (id: string) => void;
}

const calculateTotalPrice = (cart: CartItemType[]) =>
  cart.reduce((total, product) => total + product.price * product.quantity, 0);

const useCart = create<CartStore>((set) => ({
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
  setManyCart: (data) => set(() => ({
    cart: Array.from(new Map(data.map(item => [item.id, item])).values()), // Menghapus duplikasi berdasarkan ID
    totalQuantity: data.reduce((total, product) => total + product.quantity, 0),
    totalPrice: calculateTotalPrice(data),
  })),  
  addCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((product) => product.name === item.name);

      const updatedCart = existingItem
        ? state.cart.map((product) =>
            product.name === item.name
              ? { ...product, quantity: product.quantity + 1 }
              : product
          )
        : [...state.cart, { ...item, quantity: 1 }];

      return {
        cart: updatedCart,
        totalQuantity: updatedCart.reduce((total, product) => total + product.quantity, 0),
        totalPrice: calculateTotalPrice(updatedCart),
      };
    }),
  increase: (id) =>
    set((state) => {
      const updatedCart = state.cart.map((product) =>
        product.name === id ? { ...product, quantity: product.quantity + 1 } : product
      );
      return {
        cart: updatedCart,
        totalQuantity: updatedCart.reduce((total, product) => total + product.quantity, 0),
        totalPrice: calculateTotalPrice(updatedCart),
      };
    }),
  decrease: (id) =>
    set((state) => {
      const updatedCart = state.cart
        .map((product) =>
          product.name === id ? { ...product, quantity: product.quantity - 1 } : product
        )
        .filter((product) => product.quantity > 0);

      return {
        cart: updatedCart,
        totalQuantity: updatedCart.reduce((total, product) => total + product.quantity, 0),
        totalPrice: calculateTotalPrice(updatedCart),
      };
    }),
  removeCart: (id) =>
    set((state) => {
      const updatedCart = state.cart.filter((product) => product.name !== id);
      return {
        cart: updatedCart,
        totalQuantity: updatedCart.reduce((total, product) => total + product.quantity, 0),
        totalPrice: calculateTotalPrice(updatedCart),
      };
    }),
}));

export default useCart;