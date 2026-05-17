/**
 * Client-safe configuration.
 * Only BASE_URL is exported here — used for image URLs and links.
 * API_KEY is server-only: import from '@/lib/server/config' instead.
 */
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  ? process.env.NEXT_PUBLIC_API_BASE_URL
  : 'https://api.winki.ir/api/v1';
