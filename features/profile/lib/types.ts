/**
 * Strict types for profile routing
 * These types ensure type safety across the profile feature
 */

/**
 * All valid profile pages as a const object for runtime validation
 */
export const PROFILE_PAGES = {
  DASHBOARD: 'dashboard',
  ORDERS: 'orders',
  WALLET: 'wallet',
  FAVORITES: 'favorites',
  NOTIFICATIONS: 'notifications',
  COMMENTS: 'comments',
  ACCOUNT: 'account',
  MESSAGES: 'messages',
  ADDRESSES: 'addresses',
} as const;

/**
 * Type-safe union of all valid profile pages
 */
export type ProfilePage = (typeof PROFILE_PAGES)[keyof typeof PROFILE_PAGES];

/**
 * Default page when no valid page is specified
 */
export const DEFAULT_PROFILE_PAGE: ProfilePage = PROFILE_PAGES.DASHBOARD;

/**
 * Runtime guard to check if a string is a valid ProfilePage
 */
export function isValidProfilePage(value: unknown): value is ProfilePage {
  if (typeof value !== 'string') return false;
  return Object.values(PROFILE_PAGES).includes(value as ProfilePage);
}

/**
 * Centralized routing state - single source of truth
 * This is computed from searchParams and used throughout the app
 */
export interface ProfileRoutingState {
  /**
   * Current profile page (always valid)
   */
  page: ProfilePage;

  /**
   * Optional order ID (only valid for orders page)
   * Must be a positive integer
   */
  orderId?: number;
}

/**
 * Query parameters structure for type-safe navigation
 */
export interface ProfileQueryParams {
  page?: ProfilePage;
  orderId?: number;
}

/**
 * Validation result for parsed values
 */
export interface ValidationResult<T> {
  isValid: boolean;
  value?: T;
  error?: string;
}
