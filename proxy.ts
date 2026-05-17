import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LOCAL_DEV_DOMAIN } from './utils/local-dev';
import { AUTH_COOKIE_KEY } from './features/auth/constants';

const MOBILE_UA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export default function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const searchParams = request.nextUrl.searchParams;

  const authToken = request.cookies.get(AUTH_COOKIE_KEY)?.value;

  const isAuthRoute = pathname === '/login' || pathname.startsWith('/login/');
  const isProtectedRoute = pathname === '/profile' || pathname.startsWith('/profile/');

  // ✅ SSR/Edge guard: /profile نیاز به توکن دارد
  if (isProtectedRoute && !authToken) {
    const loginUrl = new URL('/login', request.url);
    // مقصد کاربر را نگه می‌داریم تا بعد از لاگین برگردد
    loginUrl.searchParams.set('redirect', `${pathname}${search ?? ''}`);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ اگر لاگین است، نگذار وارد /login شود
  if (isAuthRoute && authToken) {
    const redirect = searchParams.get('redirect');
    if (redirect && redirect.startsWith('/')) {
      const redirectUrl = new URL(redirect, request.url);
      return NextResponse.redirect(redirectUrl);
    }

    const profileUrl = new URL('/profile', request.url);
    return NextResponse.redirect(profileUrl);
  }

  // Handle legacy /product URLs with category parameter
  if (pathname === '/product' && searchParams.get('category')) {
    const categorySlug = searchParams.get('category');
    if (categorySlug) {
      const cleanUrl = new URL(`/categories/${categorySlug}`, request.url);
      return NextResponse.redirect(cleanUrl, 301);
    }
  }

  // Enforce mobile-only access for /product/[slug]/reviews
  const reviewsMatch = pathname.match(/^\/product\/([^/]+)\/reviews\/?$/);
  if (reviewsMatch) {
    const ua = request.headers.get('user-agent') || '';
    if (!MOBILE_UA.test(ua)) {
      const slug = reviewsMatch[1];
      const redirectUrl = new URL(`/product/${slug}`, request.url);
      return NextResponse.redirect(redirectUrl, 302);
    }
  }

  const host = request.headers.get('host') || 'winki.ir';
  const hostname = host.split(':')[0].replace(/^www\./, '');
  const validDomains = ['winki.ir', 'novinlife.com'];

  let currentDomain: string;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    currentDomain = LOCAL_DEV_DOMAIN;
  } else {
    currentDomain = validDomains.includes(hostname) ? hostname : 'winki.ir';
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-hostname', hostname);
  requestHeaders.set('x-tenant-domain', currentDomain);
  requestHeaders.set('x-url', request.url);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
