export const getSafeRedirect = (redirect: string | null): string =>
  redirect &&
  redirect.startsWith('/') &&
  !redirect.startsWith('//') &&
  !redirect.startsWith('/login')
    ? redirect
    : '/';
