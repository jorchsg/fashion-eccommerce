import { create } from "zustand";

interface UIState {
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  isFilterDrawerOpen: boolean;
  wishlistIds: string[];

  // Actions
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;

  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;

  openFilterDrawer: () => void;
  closeFilterDrawer: () => void;
  toggleFilterDrawer: () => void;

  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useUIStore = create<UIState>()((set, get) => ({
  isSearchOpen: false,
  isMobileMenuOpen: false,
  isFilterDrawerOpen: false,
  wishlistIds: [],

  openSearch: () =>
    set({ isSearchOpen: true, isMobileMenuOpen: false }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () =>
    set((state) => ({ isSearchOpen: !state.isSearchOpen })),

  openMobileMenu: () =>
    set({ isMobileMenuOpen: true, isSearchOpen: false }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  openFilterDrawer: () => set({ isFilterDrawerOpen: true }),
  closeFilterDrawer: () => set({ isFilterDrawerOpen: false }),
  toggleFilterDrawer: () =>
    set((state) => ({ isFilterDrawerOpen: !state.isFilterDrawerOpen })),

  addToWishlist: (productId) =>
    set((state) => ({
      wishlistIds: [...state.wishlistIds, productId],
    })),

  removeFromWishlist: (productId) =>
    set((state) => ({
      wishlistIds: state.wishlistIds.filter((id) => id !== productId),
    })),

  toggleWishlist: (productId) => {
    const { wishlistIds, addToWishlist, removeFromWishlist } = get();
    if (wishlistIds.includes(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  },

  isInWishlist: (productId) => get().wishlistIds.includes(productId),
}));
