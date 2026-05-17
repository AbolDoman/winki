/**
 * Server-only configuration.
 * API_KEY is NOT prefixed with NEXT_PUBLIC_ so it's never bundled into client JS.
 */

const FALLBACK_API_KEY = 'a42686bfde5d0c4f34a504b8dcdbf262a460cd92029b1355496a09a3c5ae2dc5';
const FALLBACK_BASE_URL = 'https://api.winki.ir/api/v1';

export const API_KEY = process.env.API_KEY
  ?? process.env.NEXT_PUBLIC_API_KEY
  ?? FALLBACK_API_KEY;

export const API_BASE_URL = process.env.API_BASE_URL
  ?? process.env.NEXT_PUBLIC_API_BASE_URL
  ?? FALLBACK_BASE_URL;
