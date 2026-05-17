/**
 * Navigation Helpers - Type-safe URL building for profile navigation
 * Replace string concatenation with structured query objects
 */

import { ProfilePage, ProfileQueryParams, PROFILE_PAGES } from './types';
import { buildProfileUrl } from './queryParser';

/**
 * Navigation link builder for profile pages
 * Use this instead of manually constructing URLs
 */
export const profileLinks = {
  /**
   * Dashboard (default profile page)
   */
  dashboard: (): string => {
    return '/profile';
  },

  /**
   * Orders list page
   */
  orders: (): string => {
    return buildProfileUrl({ page: PROFILE_PAGES.ORDERS });
  },

  /**
   * Order detail page (with specific order ID)
   * @param orderId - Order ID to view
   */
  orderDetail: (orderId: number): string => {
    return buildProfileUrl({
      page: PROFILE_PAGES.ORDERS,
      orderId,
    });
  },

  /**
   * Wallet page
   */
  wallet: (): string => {
    return buildProfileUrl({ page: PROFILE_PAGES.WALLET });
  },

  /**
   * Favorites page
   */
  favorites: (): string => {
    return buildProfileUrl({ page: PROFILE_PAGES.FAVORITES });
  },

  /**
   * Notifications page
   */
  notifications: (): string => {
    return buildProfileUrl({ page: PROFILE_PAGES.NOTIFICATIONS });
  },

  /**
   * Comments page
   */
  comments: (): string => {
    return buildProfileUrl({ page: PROFILE_PAGES.COMMENTS });
  },

  /**
   * Account settings page
   */
  account: (): string => {
    return buildProfileUrl({ page: PROFILE_PAGES.ACCOUNT });
  },

  /**
   * Messages page
   */
  messages: (): string => {
    return buildProfileUrl({ page: PROFILE_PAGES.MESSAGES });
  },

  /**
   * Addresses page
   */
  addresses: (): string => {
    return buildProfileUrl({ page: PROFILE_PAGES.ADDRESSES });
  },

  /**
   * Generic page link builder
   * @param page - ProfilePage to navigate to
   * @param params - Additional query parameters
   */
  page: (page: ProfilePage, params?: Omit<ProfileQueryParams, 'page'>): string => {
    return buildProfileUrl({ page, ...params });
  },
};

/**
 * Get the href for a profile section
 * This replaces the hardcoded hrefs in the sections array
 *
 * @param page - ProfilePage
 * @returns URL string
 */
export function getProfilePageHref(page: ProfilePage): string {
  switch (page) {
    case PROFILE_PAGES.DASHBOARD:
      return profileLinks.dashboard();
    case PROFILE_PAGES.ORDERS:
      return profileLinks.orders();
    case PROFILE_PAGES.WALLET:
      return profileLinks.wallet();
    case PROFILE_PAGES.FAVORITES:
      return profileLinks.favorites();
    case PROFILE_PAGES.NOTIFICATIONS:
      return profileLinks.notifications();
    case PROFILE_PAGES.COMMENTS:
      return profileLinks.comments();
    case PROFILE_PAGES.ACCOUNT:
      return profileLinks.account();
    case PROFILE_PAGES.MESSAGES:
      return profileLinks.messages();
    case PROFILE_PAGES.ADDRESSES:
      return profileLinks.addresses();
    default:
      return profileLinks.dashboard();
  }
}
