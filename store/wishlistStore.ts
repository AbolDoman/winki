// ============================================================
// store/wishlistStore.ts
// مدیریت علاقه‌مندی‌ها (wishlist)
//
// مثل cart، این هم Client-side و persist است
//
// نحوه استفاده:
//   const ids = useWishlistStore(selectWishlistIds);
//   const toggle = useWishlistStore(selectToggle);
//   const isWishlisted = useWishlistStore(s => selectIsWishlisted(s, productId));
// ============================================================

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface WishlistState {
  ids: number[]; // فقط id محصولات را نگه می‌داریم
}

interface WishlistActions {
  toggle: (productId: number) => void;
  add: (productId: number) => void;
  remove: (productId: number) => void;
  clearAll: () => void;
}

type WishlistStore = WishlistState & WishlistActions;

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],

      toggle: (productId) => {
        const exists = get().ids.includes(productId);
        set({
          ids: exists ? get().ids.filter((id) => id !== productId) : [...get().ids, productId],
        });
      },

      add: (productId) => {
        if (!get().ids.includes(productId)) {
          set({ ids: [...get().ids, productId] });
        }
      },

      remove: (productId) => {
        set({ ids: get().ids.filter((id) => id !== productId) });
      },

      clearAll: () => set({ ids: [] }),
    }),
    {
      name: 'wishlist',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

// ─── Selectors ────────────────────────────────────────────────
export const selectWishlistIds = (s: WishlistStore) => s.ids;
export const selectWishlistCount = (s: WishlistStore) => s.ids.length;
export const selectToggle = (s: WishlistStore) => s.toggle;
export const selectRemoveWishlist = (s: WishlistStore) => s.remove;

// بررسی اینکه یک محصول خاص در wishlist است یا نه
// نحوه استفاده: useWishlistStore(s => s.ids.includes(productId))
export const selectIsWishlisted = (s: WishlistStore, productId: number) =>
  s.ids.includes(productId);
