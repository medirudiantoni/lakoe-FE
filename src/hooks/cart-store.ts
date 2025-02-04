// import { ProductType } from '@/features/auth/types/product-type';
import { ProductType } from '@/features/auth/types/prisma-types';
import { create } from 'zustand';

export interface Cart extends ProductType {
  quantity: number;
  attachment: string[];
  category2: string
}

interface CartStore {
  cart: Cart[];
  totalQuantity: number;
  totalPrice: number;
  addCart: (item: Cart) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeCart: (id: string) => void;
}

const calculateTotalPrice = (cart: Cart[]) =>
  cart.reduce((total, product) => total + product?.price! * product.quantity, 0);

const useCart = create<CartStore>((set) => ({
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
  addCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((product) => product.id === item.id);
      const updatedCart = !existingItem ? [...state.cart, { ...item, quantity: 1 }] : state.cart;
      return {
        cart: updatedCart,
        totalQuantity: !existingItem ? state.totalQuantity + 1 : state.totalQuantity,
        totalPrice: calculateTotalPrice(updatedCart),
      };
    }),
  increase: (id) =>
    set((state) => {
      const updatedCart = state.cart
        .map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      return {
        cart: updatedCart,
        totalQuantity: state.totalQuantity,
        totalPrice: calculateTotalPrice(updatedCart),
      };
    }),
  decrease: (id) =>
    set((state) => {
      const updatedCart = state.cart
        .map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
        .filter((product) => product.quantity > 0); // Hapus item jika quantity 0

      return {
        cart: updatedCart,
        totalQuantity: state.totalQuantity,
        totalPrice: calculateTotalPrice(updatedCart),
      };
    }),
  removeCart: (id) =>
    set((state) => {
      const updatedCart = state.cart.filter((product) => product.id !== id);
      return {
        cart: updatedCart,
        totalQuantity: updatedCart.reduce((total, product) => total + product.quantity, 0),
        totalPrice: calculateTotalPrice(updatedCart),
      };
    }),
}));

export default useCart;