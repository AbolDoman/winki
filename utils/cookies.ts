type CookieSameSite = 'Strict' | 'Lax' | 'None';

interface CookieOptions {
  days?: number;
  path?: string;
  sameSite?: CookieSameSite;
  secure?: boolean;
}

const isBrowser = typeof document !== 'undefined';

export const setCookie = (name: string, value: string, days = 30, options?: CookieOptions) => {
  if (!isBrowser) return;

  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const path = options?.path ?? '/';
  const sameSite = options?.sameSite ?? 'Strict';
  const isSecure =
    options?.secure ??
    (typeof window !== 'undefined' ? window.location.protocol === 'https:' : false);

  document.cookie = [
    `${name}=${encodeURIComponent(value)}`,
    `expires=${expires}`,
    `path=${path}`,
    `SameSite=${sameSite}`,
    isSecure ? 'Secure' : '',
  ]
    .filter(Boolean)
    .join('; ');
};

export const getCookie = (name: string): string | null => {
  if (!isBrowser) return null;

  const match = document.cookie.split('; ').find((cookiePair) => cookiePair.startsWith(`${name}=`));

  if (!match) return null;
  return decodeURIComponent(match.substring(name.length + 1));
};

export const removeCookie = (name: string, options?: Pick<CookieOptions, 'path'>) => {
  if (!isBrowser) return;

  setCookie(name, '', -1, { path: options?.path ?? '/' });
};
