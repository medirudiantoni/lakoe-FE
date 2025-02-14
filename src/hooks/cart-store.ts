import { ProductType } from '@/features/auth/types/prisma-types';
import { create } from 'zustand';

export interface Cart extends ProductType {
  quantity: number;
  optionIndex: number; 
  price: number;
}

interface CartStore {
  cart: Cart[];
  totalQuantity: number;
  totalPrice: number;
  addCart: (item: Cart) => void;
  increase: (id: string, optionIndex: number) => void;
  decrease: (id: string, optionIndex: number) => void;
  removeCart: (id: string, optionIndex: number) => void;
}

const calculateTotalPrice = (cart: Cart[]) =>
  cart.reduce((total, product) => total + product.price * product.quantity, 0);

const useCart = create<CartStore>((set) => ({
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
  addCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find(
        (product) => product.id === item.id && product.optionIndex === item.optionIndex
      );

      const updatedCart = existingItem
        ? state.cart.map((product) =>
            product.id === item.id && product.optionIndex === item.optionIndex
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
  increase: (id, optionIndex) =>
    set((state) => {
      const updatedCart = state.cart.map((product) =>
        product.id === id && product.optionIndex === optionIndex
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      return {
        cart: updatedCart,
        totalQuantity: updatedCart.reduce((total, product) => total + product.quantity, 0),
        totalPrice: calculateTotalPrice(updatedCart),
      };
    }),
  decrease: (id, optionIndex) =>
    set((state) => {
      const updatedCart = state.cart
        .map((product) =>
          product.id === id && product.optionIndex === optionIndex
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
        .filter((product) => product.quantity > 0);

      return {
        cart: updatedCart,
        totalQuantity: updatedCart.reduce((total, product) => total + product.quantity, 0),
        totalPrice: calculateTotalPrice(updatedCart),
      };
    }),
  removeCart: (id, optionIndex) =>
    set((state) => {
      const updatedCart = state.cart.filter(
        (product) => !(product.id === id && product.optionIndex === optionIndex)
      );
      return {
        cart: updatedCart,
        totalQuantity: updatedCart.reduce((total, product) => total + product.quantity, 0),
        totalPrice: calculateTotalPrice(updatedCart),
      };
    }),
}));

export default useCart;
