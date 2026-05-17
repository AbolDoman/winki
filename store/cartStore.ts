import toast from 'react-hot-toast';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  addToCart as addToCartApi,
  clearCart as clearServerCartApi,
  decrementCartItem as decrementCartItemApi,
  getCart as getCartApi,
  incrementCartItem as incrementCartItemApi,
  removeCartItem as removeCartItemApi,
  updateCartItem as updateCartItemApi,
} from '@/services/cartApi';
import type { CartApi, CartApiItem } from '@/types/cart/types';
import type { CartColorVariant, CartItem as CartUiItem } from '@/types/cart/types/cart';
import { getAuthToken } from '@/features/auth/utils/tokenStorage';

/** Check auth — prefers auth store, falls back to legacy cookie */
const isUserAuthenticated = (): boolean => {
  // Legacy fallback during migration
  if (getAuthToken()) return true;
  // Check auth store (available after hydration)
  try {
    // Dynamic to avoid circular dependency at module level
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useAuthStore } = require('@/store/auth.store') as { useAuthStore: { getState: () => { isAuthenticated: boolean } } };
    return useAuthStore.getState().isAuthenticated;
  } catch {
    return false;
  }
};
import { extractApiErrorMessage } from '@/utils/error';
import { getPersistStorage } from '@/store/persistStorage';

const CART_PERSIST_KEY = 'cart-store';
const DEFAULT_IMAGE = '/placeholder.png';

type CartMode = 'guest' | 'authenticated';

export interface CartProductInput {
  id: number;
  title?: string;
  slug?: string;
  image?: string;
  imageUrl?: string;
  price?: number;
  discountedPrice?: number;
  discounted_price?: number;
  discount?: number;
  colorVariants?: CartColorVariant;
  product_variant_id?: number | null;
}

interface CartProductMeta {
  title: string;
  slug: string;
  image: string;
  discount?: number;
  discounted_price?: number;
  colorVariants?: CartColorVariant;
}

interface GuestCartItem {
  id: number;
  product_id: number;
  product_variant_id: number | null;
  quantity: number;
  price: number;
  total: number;
  title: string;
  slug: string;
  image: string;
  discount?: number;
  discounted_price?: number;
  colorVariants?: CartColorVariant;
}

interface CartState {
  mode: CartMode;
  guestItems: GuestCartItem[];
  productMetaByProductId: Record<number, CartProductMeta>;
  serverCart: CartApi | null;
  isBootstrapped: boolean;
  isLoading: boolean;
  isMerging: boolean;
  error: string | null;
  lastMergedToken: string | null;
}

interface CartActions {
  bootstrapCart: () => Promise<void>;
  refetchCart: () => Promise<void>;
  handleAuthSuccess: () => Promise<void>;
  handleLogout: () => void;

  addItem: (product: CartProductInput, quantity?: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  updateQty: (itemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

type CartStore = CartState & CartActions;

const getErrorMessage = (error: unknown, fallback: string): string => {
  return extractApiErrorMessage(error, fallback);
};

const normalizeQuantity = (quantity?: number): number => {
  const value = Number(quantity);
  if (!Number.isFinite(value) || value < 1) return 1;
  return Math.floor(value);
};

const normalizeVariantId = (variantId?: number | null): number | null => {
  if (variantId == null) return null;
  const numericVariant = Number(variantId);
  if (!Number.isFinite(numericVariant) || numericVariant <= 0) return null;
  return Math.floor(numericVariant);
};

const normalizeProductId = (productId: number): number | null => {
  const numericProductId = Number(productId);
  if (!Number.isFinite(numericProductId) || numericProductId <= 0) return null;
  return Math.floor(numericProductId);
};

const resolveInputPrice = (product: CartProductInput): number => {
  if (typeof product.price === 'number' && Number.isFinite(product.price)) {
    return product.price;
  }
  if (typeof product.discountedPrice === 'number' && Number.isFinite(product.discountedPrice)) {
    return product.discountedPrice;
  }
  if (typeof product.discounted_price === 'number' && Number.isFinite(product.discounted_price)) {
    return product.discounted_price;
  }
  return 0;
};

const normalizeImageSrc = (input?: string | null): string => {
  const value = input?.trim();
  if (!value) return DEFAULT_IMAGE;
  if (/^(https?:\/\/|data:|blob:)/i.test(value)) return value;
  if (value.startsWith('/')) return value;
  return `/${value.replace(/^\/+/, '')}`;
};

const createFallbackTitle = (productId: number): string => `محصول ${productId}`;

const buildProductMeta = (product: CartProductInput): CartProductMeta => {
  const productId = normalizeProductId(product.id) ?? 0;
  const title = product.title?.trim() || createFallbackTitle(productId);
  const slug = product.slug?.trim() || `product-${productId}`;
  const image = normalizeImageSrc(product.image?.trim() || product.imageUrl?.trim());

  return {
    title,
    slug,
    image,
    discount: product.discount,
    discounted_price:
      typeof product.discounted_price === 'number'
        ? product.discounted_price
        : product.discountedPrice,
    colorVariants: product.colorVariants,
  };
};

const mergeProductMeta = (
  current: Record<number, CartProductMeta>,
  productId: number,
  nextMeta: CartProductMeta,
): Record<number, CartProductMeta> => {
  const prev = current[productId];
  if (!prev) {
    return {
      ...current,
      [productId]: nextMeta,
    };
  }

  return {
    ...current,
    [productId]: {
      title: nextMeta.title || prev.title,
      slug: nextMeta.slug || prev.slug,
      image: nextMeta.image || prev.image,
      discount: nextMeta.discount ?? prev.discount,
      discounted_price: nextMeta.discounted_price ?? prev.discounted_price,
      colorVariants: nextMeta.colorVariants ?? prev.colorVariants,
    },
  };
};

const findServerItemByIdentifier = (cart: CartApi | null, itemId: number): CartApiItem | null => {
  if (!cart) return null;
  return (
    cart.items.find((item) => item.id === itemId) ??
    cart.items.find((item) => item.product_id === itemId) ??
    null
  );
};

const mapGuestItemToUi = (item: GuestCartItem): CartUiItem => ({
  id: item.id,
  cart_item_id: null,
  product_id: item.product_id,
  product_variant_id: item.product_variant_id,
  title: item.title,
  slug: item.slug,
  image: normalizeImageSrc(item.image),
  price: item.price,
  total: item.total,
  quantity: item.quantity,
  discount: item.discount,
  discounted_price: item.discounted_price,
  colorVariants: item.colorVariants,
});

const mapServerItemToUi = (
  item: CartApiItem,
  productMetaByProductId: Record<number, CartProductMeta>,
): CartUiItem => {
  const meta = productMetaByProductId[item.product_id];
  const title = meta?.title || createFallbackTitle(item.product_id);
  const slug = meta?.slug || `product-${item.product_id}`;
  const image = normalizeImageSrc(meta?.image);

  return {
    id: item.id,
    cart_item_id: item.id,
    product_id: item.product_id,
    product_variant_id: item.product_variant_id,
    title,
    slug,
    image,
    price: item.price,
    total: item.total,
    quantity: item.quantity,
    discount: meta?.discount,
    discounted_price: meta?.discounted_price,
    colorVariants: meta?.colorVariants,
  };
};

let mergePromise: Promise<void> | null = null;

const EMPTY_CART_ITEMS: CartUiItem[] = [];
type CartItemsSelectorCache = {
  mode: CartMode | null;
  guestItemsRef: GuestCartItem[] | null;
  serverItemsRef: CartApiItem[] | null;
  productMetaRef: Record<number, CartProductMeta> | null;
  result: CartUiItem[];
};

const cartItemsSelectorCache: CartItemsSelectorCache = {
  mode: null,
  guestItemsRef: null,
  serverItemsRef: null,
  productMetaRef: null,
  result: EMPTY_CART_ITEMS,
};

const selectCartItemsMemoized = (state: CartStore): CartUiItem[] => {
  const serverItemsRef = state.serverCart?.items ?? null;
  const cacheHit =
    cartItemsSelectorCache.mode === state.mode &&
    cartItemsSelectorCache.guestItemsRef === state.guestItems &&
    cartItemsSelectorCache.serverItemsRef === serverItemsRef &&
    cartItemsSelectorCache.productMetaRef === state.productMetaByProductId;

  if (cacheHit) {
    return cartItemsSelectorCache.result;
  }

  const result =
    state.mode === 'authenticated'
      ? serverItemsRef && serverItemsRef.length > 0
        ? serverItemsRef.map((item) => mapServerItemToUi(item, state.productMetaByProductId))
        : EMPTY_CART_ITEMS
      : state.guestItems.length > 0
        ? state.guestItems.map(mapGuestItemToUi)
        : EMPTY_CART_ITEMS;

  cartItemsSelectorCache.mode = state.mode;
  cartItemsSelectorCache.guestItemsRef = state.guestItems;
  cartItemsSelectorCache.serverItemsRef = serverItemsRef;
  cartItemsSelectorCache.productMetaRef = state.productMetaByProductId;
  cartItemsSelectorCache.result = result;

  return result;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      mode: isUserAuthenticated() ? 'authenticated' : 'guest',
      guestItems: [],
      productMetaByProductId: {},
      serverCart: null,
      isBootstrapped: false,
      isLoading: false,
      isMerging: false,
      error: null,
      lastMergedToken: null,

      bootstrapCart: async () => {
        const token = isUserAuthenticated();
        if (!token) {
          set({
            mode: 'guest',
            serverCart: null,
            isBootstrapped: true,
            isLoading: false,
            error: null,
          });
          return;
        }

        set({
          mode: 'authenticated',
          isLoading: true,
          error: null,
        });

        try {
          const serverCart = await getCartApi();
          set({
            serverCart,
            mode: 'authenticated',
            error: null,
          });
        } catch (error) {
          set({
            error: getErrorMessage(error, 'خطا در دریافت سبد خرید'),
            serverCart: null,
          });
        } finally {
          set({
            isLoading: false,
            isBootstrapped: true,
          });
        }
      },

      refetchCart: async () => {
        const token = isUserAuthenticated();
        if (!token) {
          set({
            mode: 'guest',
            serverCart: null,
            isBootstrapped: true,
            isLoading: false,
          });
          return;
        }

        set({
          mode: 'authenticated',
          isLoading: true,
          error: null,
        });

        try {
          const serverCart = await getCartApi();
          set({
            serverCart,
            error: null,
          });
        } catch (error) {
          const message = getErrorMessage(error, 'خطا در بروزرسانی سبد خرید');
          set({
            error: message,
            serverCart: null,
          });
        } finally {
          set({
            isLoading: false,
            isBootstrapped: true,
          });
        }
      },

      handleAuthSuccess: async () => {
        if (get().lastMergedToken) {
          await get().refetchCart();
          return;
        }

        if (mergePromise) {
          await mergePromise;
          return;
        }

        mergePromise = (async () => {
          set({
            mode: 'authenticated',
            isLoading: true,
            isMerging: true,
            error: null,
          });

          const guestItemsSnapshot = [...get().guestItems];
          let hasMergeError = false;

          for (const item of guestItemsSnapshot) {
            try {
              await addToCartApi({
                product_id: item.product_id,
                product_variant_id: item.product_variant_id,
                quantity: item.quantity,
              });
            } catch {
              hasMergeError = true;
            }
          }

          set({
            guestItems: [],
            lastMergedToken: 'merged',
          });

          try {
            const serverCart = await getCartApi();
            set({
              serverCart,
              error: null,
            });
          } catch (error) {
            set({
              error: getErrorMessage(error, 'خطا در دریافت سبد خرید'),
              serverCart: null,
            });
          }

          if (hasMergeError) {
            toast.error('برخی از آیتم‌های سبد مهمان قابل انتقال نبود');
          }
        })();

        try {
          await mergePromise;
        } finally {
          mergePromise = null;
          set({
            isLoading: false,
            isMerging: false,
            isBootstrapped: true,
          });
        }
      },

      handleLogout: () => {
        set({
          mode: 'guest',
          serverCart: null,
          isLoading: false,
          isMerging: false,
          error: null,
          lastMergedToken: null,
          isBootstrapped: true,
        });
      },

      addItem: async (product, quantity = 1) => {
        const productId = normalizeProductId(product.id);
        if (!productId) {
          toast.error('شناسه محصول معتبر نیست');
          return;
        }

        const normalizedQty = normalizeQuantity(quantity);
        const variantId = normalizeVariantId(product.product_variant_id);
        const meta = buildProductMeta(product);
        const token = isUserAuthenticated();

        if (token) {
          set((state) => ({
            mode: 'authenticated',
            isLoading: true,
            error: null,
            productMetaByProductId: mergeProductMeta(state.productMetaByProductId, productId, meta),
          }));

          try {
            await addToCartApi({
              product_id: productId,
              product_variant_id: variantId,
              quantity: normalizedQty,
            });

            const serverCart = await getCartApi();
            set({
              serverCart,
              error: null,
            });
            toast.success('محصول به سبد خرید اضافه شد');
          } catch (error) {
            const message = getErrorMessage(error, 'افزودن محصول به سبد خرید انجام نشد');
            set({ error: message });
            toast.error(message);
          } finally {
            set({
              isLoading: false,
              isBootstrapped: true,
            });
          }
          return;
        }

        set((state) => {
          const existingIndex = state.guestItems.findIndex(
            (item) =>
              item.product_id === productId &&
              item.product_variant_id === normalizeVariantId(variantId),
          );

          const nextGuestItems = [...state.guestItems];

          if (existingIndex >= 0) {
            const existingItem = nextGuestItems[existingIndex];
            const nextQuantity = existingItem.quantity + normalizedQty;
            nextGuestItems[existingIndex] = {
              ...existingItem,
              quantity: nextQuantity,
              total: existingItem.price * nextQuantity,
            };
          } else {
            const price = resolveInputPrice(product);
            nextGuestItems.push({
              id: productId,
              product_id: productId,
              product_variant_id: variantId,
              quantity: normalizedQty,
              price,
              total: price * normalizedQty,
              title: meta.title,
              slug: meta.slug,
              image: meta.image,
              discount: meta.discount,
              discounted_price: meta.discounted_price,
              colorVariants: meta.colorVariants,
            });
          }

          return {
            mode: 'guest',
            guestItems: nextGuestItems,
            productMetaByProductId: mergeProductMeta(state.productMetaByProductId, productId, meta),
            error: null,
            isBootstrapped: true,
          };
        });
        toast.success('محصول به سبد خرید اضافه شد');
      },

      removeItem: async (itemId) => {
        const token = isUserAuthenticated();

        if (token) {
          const targetItem = findServerItemByIdentifier(get().serverCart, itemId);
          if (!targetItem) return;

          set({
            mode: 'authenticated',
            isLoading: true,
            error: null,
          });

          try {
            await removeCartItemApi(targetItem.id);
            const serverCart = await getCartApi();
            set({
              serverCart,
              error: null,
            });
          } catch (error) {
            const message = getErrorMessage(error, 'حذف آیتم از سبد خرید انجام نشد');
            set({ error: message });
            toast.error(message);
          } finally {
            set({
              isLoading: false,
              isBootstrapped: true,
            });
          }
          return;
        }

        set((state) => ({
          mode: 'guest',
          guestItems: state.guestItems.filter(
            (item) => item.id !== itemId && item.product_id !== itemId,
          ),
          isBootstrapped: true,
        }));
      },

      updateQty: async (itemId, quantity) => {
        const normalizedQty = Math.max(0, Math.floor(Number(quantity) || 0));
        if (normalizedQty <= 0) {
          await get().removeItem(itemId);
          return;
        }

        const token = isUserAuthenticated();
        if (token) {
          const targetItem = findServerItemByIdentifier(get().serverCart, itemId);
          if (!targetItem) return;
          if (targetItem.quantity === normalizedQty) return;

          set({
            mode: 'authenticated',
            isLoading: true,
            error: null,
          });

          try {
            const quantityDiff = normalizedQty - targetItem.quantity;
            if (quantityDiff === 1) {
              await incrementCartItemApi(targetItem.id, { quantity: 1 });
            } else if (quantityDiff === -1) {
              await decrementCartItemApi(targetItem.id, { quantity: 1 });
            } else {
              await updateCartItemApi(targetItem.id, { quantity: normalizedQty });
            }

            const serverCart = await getCartApi();
            set({
              serverCart,
              error: null,
            });
          } catch (error) {
            const message = getErrorMessage(error, 'بروزرسانی تعداد آیتم انجام نشد');
            set({ error: message });
            toast.error(message);
          } finally {
            set({
              isLoading: false,
              isBootstrapped: true,
            });
          }
          return;
        }

        set((state) => ({
          mode: 'guest',
          guestItems: state.guestItems.map((item) =>
            item.id === itemId || item.product_id === itemId
              ? {
                  ...item,
                  quantity: normalizedQty,
                  total: item.price * normalizedQty,
                }
              : item,
          ),
          isBootstrapped: true,
        }));
      },

      clearCart: async () => {
        const token = isUserAuthenticated();
        if (token) {
          set({
            mode: 'authenticated',
            isLoading: true,
            error: null,
          });

          try {
            await clearServerCartApi();
            try {
              const serverCart = await getCartApi();
              set({
                serverCart,
                error: null,
              });
            } catch {
              const currentCartId = get().serverCart?.id ?? 0;
              set({
                serverCart: {
                  id: currentCartId,
                  items: [],
                  total_items: 0,
                  total_amount: 0,
                },
                error: null,
              });
            }
          } catch (error) {
            const message = getErrorMessage(error, 'پاکسازی سبد خرید انجام نشد');
            set({ error: message });
            toast.error(message);
          } finally {
            set({
              isLoading: false,
              isBootstrapped: true,
            });
          }
          return;
        }

        set({
          mode: 'guest',
          guestItems: [],
          isBootstrapped: true,
          error: null,
        });
      },
    }),
    {
      name: CART_PERSIST_KEY,
      storage: createJSONStorage(getPersistStorage),
      partialize: (state) => ({
        guestItems: state.guestItems,
        productMetaByProductId: state.productMetaByProductId,
      }),
      version: 1,
    },
  ),
);

export const selectCartItems = (state: CartStore): CartUiItem[] => selectCartItemsMemoized(state);
export const selectAddItem = (state: CartStore): CartActions['addItem'] => state.addItem;
export const selectRemoveItem = (state: CartStore): CartActions['removeItem'] => state.removeItem;
export const selectUpdateQty = (state: CartStore): CartActions['updateQty'] => state.updateQty;
export const selectClearCart = (state: CartStore): CartActions['clearCart'] => state.clearCart;

export const selectCartCount = (state: CartStore): number => {
  if (state.mode === 'authenticated') {
    return state.serverCart?.total_items ?? 0;
  }
  return state.guestItems.reduce((sum, item) => sum + item.quantity, 0);
};

export const selectCartTotal = (state: CartStore): number => {
  if (state.mode === 'authenticated') {
    return state.serverCart?.total_amount ?? 0;
  }
  return state.guestItems.reduce((sum, item) => sum + item.total, 0);
};

export const selectBootstrapCart = (state: CartStore): CartActions['bootstrapCart'] =>
  state.bootstrapCart;
export const selectRefetchCart = (state: CartStore): CartActions['refetchCart'] =>
  state.refetchCart;
export const selectHandleAuthSuccess = (state: CartStore): CartActions['handleAuthSuccess'] =>
  state.handleAuthSuccess;
export const selectHandleCartLogout = (state: CartStore): CartActions['handleLogout'] =>
  state.handleLogout;
export const selectCartLoading = (state: CartStore): boolean => state.isLoading;
export const selectCartError = (state: CartStore): string | null => state.error;
