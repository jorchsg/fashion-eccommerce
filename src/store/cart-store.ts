import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateId } from "@/lib/utils";
import type { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (product: Product, size: string, color: string, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed
  getTotalItems: () => number;
  getSubtotal: () => number;
  getShipping: () => number;
  getTax: () => number;
  getTotal: () => number;
}

const SHIPPING_THRESHOLD = 150;
const SHIPPING_COST = 9.99;
const TAX_RATE = 0.08;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, size, color, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(
          (item) =>
            item.product.id === product.id &&
            item.size === size &&
            item.color === color
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === existingItem.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
            isOpen: true,
          });
        } else {
          const newItem: CartItem = {
            id: generateId(),
            product,
            quantity,
            size,
            color,
          };
          set({ items: [...items, newItem], isOpen: true });
        }
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity < 1) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getShipping: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
      },

      getTax: () => {
        return get().getSubtotal() * TAX_RATE;
      },

      getTotal: () => {
        const { getSubtotal, getShipping, getTax } = get();
        return getSubtotal() + getShipping() + getTax();
      },
    }),
    {
      name: "fashion-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
