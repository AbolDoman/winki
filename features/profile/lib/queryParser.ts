/**
 * Centralized, type-safe query parameter parser
 * DO NOT trust raw query strings - always validate
 */

import { ReadonlyURLSearchParams } from 'next/navigation';
import {
  ProfilePage,
  ProfileQueryParams,
  ProfileRoutingState,
  ValidationResult,
  isValidProfilePage,
  DEFAULT_PROFILE_PAGE,
  PROFILE_PAGES,
} from './types';

/**
 * Safely parse the 'page' query parameter
 * @param searchParams - Next.js searchParams
 * @returns Valid ProfilePage or default
 */
export function parsePageParam(searchParams: ReadonlyURLSearchParams | null): ProfilePage {
  if (!searchParams) return DEFAULT_PROFILE_PAGE;

  const rawPage = searchParams.get('page');

  // Return default if no page param
  if (!rawPage) return DEFAULT_PROFILE_PAGE;

  // Validate and return
  if (isValidProfilePage(rawPage)) {
    return rawPage;
  }

  // Invalid page - return default (graceful fallback)
  console.warn(`[Profile] Invalid page parameter: "${rawPage}". Falling back to dashboard.`);
  return DEFAULT_PROFILE_PAGE;
}

/**
 * Safely parse and validate the 'orderId' query parameter
 * @param searchParams - Next.js searchParams
 * @returns Validated order ID or undefined
 */
export function parseOrderIdParam(
  searchParams: ReadonlyURLSearchParams | null,
): number | undefined {
  if (!searchParams) return undefined;

  const rawOrderId = searchParams.get('orderId');

  // No orderId param
  if (!rawOrderId) return undefined;

  // Validate it's a number
  const validation = validateOrderId(rawOrderId);

  if (validation.isValid && validation.value !== undefined) {
    return validation.value;
  }

  // Invalid orderId - log and return undefined
  console.warn(`[Profile] Invalid orderId parameter: "${rawOrderId}". ${validation.error}`);
  return undefined;
}

/**
 * Validate that orderId is a positive integer
 * @param value - Raw string value
 * @returns Validation result with parsed number
 */
export function validateOrderId(value: string): ValidationResult<number> {
  // Check if it's a valid number
  const parsed = Number(value);

  if (isNaN(parsed)) {
    return {
      isValid: false,
      error: 'Order ID must be a number',
    };
  }

  // Check if it's an integer
  if (!Number.isInteger(parsed)) {
    return {
      isValid: false,
      error: 'Order ID must be an integer',
    };
  }

  // Check if it's positive
  if (parsed <= 0) {
    return {
      isValid: false,
      error: 'Order ID must be positive',
    };
  }

  return {
    isValid: true,
    value: parsed,
  };
}

/**
 * Parse all profile query parameters into a single routing state
 * This is the SINGLE SOURCE OF TRUTH for routing state
 *
 * @param searchParams - Next.js searchParams
 * @returns Validated routing state
 */
export function parseProfileRoutingState(
  searchParams: ReadonlyURLSearchParams | null,
): ProfileRoutingState {
  const page = parsePageParam(searchParams);
  const orderId = parseOrderIdParam(searchParams);

  // Only include orderId if we're on the orders page
  const state: ProfileRoutingState = {
    page,
  };

  if (page === PROFILE_PAGES.ORDERS && orderId !== undefined) {
    state.orderId = orderId;
  }

  return state;
}

/**
 * Build a type-safe query string from ProfileQueryParams
 * Use this for navigation instead of string concatenation
 *
 * @param params - Query parameters
 * @returns Query string (without leading '?')
 */
export function buildProfileQuery(params: ProfileQueryParams): string {
  const searchParams = new URLSearchParams();

  // Add page if it's not the default
  if (params.page && params.page !== DEFAULT_PROFILE_PAGE) {
    searchParams.set('page', params.page);
  }

  // Add orderId if present (only for orders page)
  if (params.orderId !== undefined && params.page === PROFILE_PAGES.ORDERS) {
    searchParams.set('orderId', params.orderId.toString());
  }

  return searchParams.toString();
}

/**
 * Build a complete profile URL with query parameters
 * Use this for Link href or router.push
 *
 * @param params - Query parameters
 * @returns Complete URL with query string
 */
export function buildProfileUrl(params: ProfileQueryParams): string {
  const query = buildProfileQuery(params);
  return query ? `/profile?${query}` : '/profile';
}
