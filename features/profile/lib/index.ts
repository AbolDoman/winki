/**
 * Profile Library - Public API
 *
 * This file exports all the utilities, types, and helpers
 * for the profile feature in a centralized way.
 */

// Types
export type {
  ProfilePage,
  ProfileRoutingState,
  ProfileQueryParams,
  ValidationResult,
} from './types';

export { PROFILE_PAGES, DEFAULT_PROFILE_PAGE, isValidProfilePage } from './types';

// Query Parsers
export {
  parsePageParam,
  parseOrderIdParam,
  parseProfileRoutingState,
  validateOrderId,
  buildProfileQuery,
  buildProfileUrl,
} from './queryParser';

// Navigation Helpers
export { profileLinks, getProfilePageHref } from './navigationHelpers';

// Page Registry
export { PAGE_COMPONENT_REGISTRY, getPageComponent } from './pageRegistry';
