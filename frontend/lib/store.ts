import { create } from "zustand";

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: number;
    image_url?: string;
  };
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shippingCharge: number;
  addItem: (item: CartItem) => void;
  removeItem: (cartId: string) => void;
  updateItemQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;
  setTotals: (subtotal: number, tax: number, shippingCharge: number) => void;
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  total: 0,
  subtotal: 0,
  tax: 0,
  shippingCharge: 0,

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  removeItem: (cartId) =>
    set((state) => ({
      items: state.items.filter((item) => item.cartId !== cartId),
    })),

  updateItemQuantity: (cartId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.cartId === cartId ? { ...item, quantity } : item,
      ),
    })),

  clearCart: () =>
    set({
      items: [],
      total: 0,
      subtotal: 0,
      tax: 0,
      shippingCharge: 0,
    }),

  setItems: (items) => set({ items }),

  setTotals: (subtotal, tax, shippingCharge) =>
    set({
      subtotal,
      tax,
      shippingCharge,
      total: subtotal + tax + shippingCharge,
    }),
}));
