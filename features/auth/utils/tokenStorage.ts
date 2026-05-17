import { AUTH_COOKIE_KEY, OTP_COOKIE_KEY } from '../constants';

const isBrowser = typeof window !== 'undefined';

// ──────────────────────────────────────────────
// httpOnly cookie management via Route Handler
// Token is NEVER accessible to client-side JS
// ──────────────────────────────────────────────

const sessionEndpoint = '/api/auth/session';

/** Store auth token in httpOnly cookie via server route */
export const setAuthToken = async (token: string, maxAgeSeconds?: number) => {
  if (!token?.trim() || !isBrowser) return;

  await fetch(sessionEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: token.trim(),
      type: 'auth',
      ...(maxAgeSeconds !== undefined ? { maxAge: maxAgeSeconds } : {}),
    }),
  });
};

/** Store OTP token in httpOnly cookie via server route */
export const setOtpToken = async (token: string, maxAgeSeconds = 120) => {
  if (!token?.trim() || !isBrowser) return;

  await fetch(sessionEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: token.trim(),
      type: 'otp',
      maxAge: maxAgeSeconds,
    }),
  });
};

/** Clear all auth cookies via server route */
export const clearAuthToken = async () => {
  if (!isBrowser) return;
  await fetch(sessionEndpoint, { method: 'DELETE' });
};

export const clearOtpToken = clearAuthToken;
export const clearAuthStorage = clearAuthToken;

/**
 * Check if user is authenticated (does NOT return the token).
 * For sync checks, use the auth store's `isAuthenticated` instead.
 */
export const checkAuthenticated = async (): Promise<boolean> => {
  if (!isBrowser) return false;

  try {
    const res = await fetch(sessionEndpoint);
    const data = await res.json();
    return data.authenticated === true;
  } catch {
    return false;
  }
};

/**
 * @deprecated Token is now httpOnly — use auth store `isAuthenticated` for sync checks.
 * Returns null always. Exists only for backward compatibility during migration.
 */
export const getAuthToken = (): string | null => {
  // Token is httpOnly, JS cannot read it.
  // The proxy route handler reads it server-side.
  // For auth checks, use the Zustand auth store's `isAuthenticated`.

  // Legacy fallback: try reading non-httpOnly cookie for migration period
  if (!isBrowser) return null;
  const match = document.cookie.split('; ').find((c) => c.startsWith(`${AUTH_COOKIE_KEY}=`));
  if (match) {
    return decodeURIComponent(match.substring(AUTH_COOKIE_KEY.length + 1)) || null;
  }
  return null;
};

/** @deprecated Use auth store instead */
export const getOtpToken = (): string | null => {
  if (!isBrowser) return null;
  const match = document.cookie.split('; ').find((c) => c.startsWith(`${OTP_COOKIE_KEY}=`));
  if (match) {
    return decodeURIComponent(match.substring(OTP_COOKIE_KEY.length + 1)) || null;
  }
  return null;
};
