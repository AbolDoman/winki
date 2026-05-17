const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'X-CSRF-Token';
const CSRF_TOKEN_LENGTH = 32;

const isBrowser = typeof document !== 'undefined';

function generateToken(): string {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(CSRF_TOKEN_LENGTH);
    crypto.getRandomValues(array);
    return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback (should never happen in modern browsers)
  let result = '';
  for (let i = 0; i < CSRF_TOKEN_LENGTH * 2; i++) {
    result += Math.floor(Math.random() * 16).toString(16);
  }
  return result;
}

function getCookie(name: string): string | null {
  if (!isBrowser) return null;
  const match = document.cookie
    .split('; ')
    .find((pair) => pair.startsWith(`${name}=`));
  if (!match) return null;
  return decodeURIComponent(match.substring(name.length + 1)) || null;
}

function setCookie(name: string, value: string): void {
  if (!isBrowser) return;
  const isSecure = window.location.protocol === 'https:';
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    'path=/',
    'SameSite=Strict',
  ];
  if (isSecure) parts.push('Secure');
  document.cookie = parts.join('; ');
}

/**
 * Returns the current CSRF token, generating one if it doesn't exist.
 * Token is stored in a cookie (SameSite=Strict) so the server can read it,
 * and also sent in the X-CSRF-Token header for double-submit validation.
 */
export function getCsrfToken(): string {
  let token = getCookie(CSRF_COOKIE_NAME);
  if (!token) {
    token = generateToken();
    setCookie(CSRF_COOKIE_NAME, token);
  }
  return token;
}

/** Header name to use for CSRF token */
export { CSRF_HEADER_NAME };
