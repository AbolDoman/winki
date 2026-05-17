import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const AUTH_COOKIE = 'auth_token';
const OTP_COOKIE = 'otp_token';
const MAX_AGE_DAYS = 30;

/** POST — store token in httpOnly cookie */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { token, type = 'auth', maxAge } = body as {
    token?: string;
    type?: 'auth' | 'otp';
    maxAge?: number;
  };

  if (!token || typeof token !== 'string') {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const cookieStore = await cookies();
  const isSecure = request.nextUrl.protocol === 'https:';
  const name = type === 'otp' ? OTP_COOKIE : AUTH_COOKIE;
  const resolvedMaxAge = maxAge ?? (type === 'otp' ? 120 : MAX_AGE_DAYS * 24 * 60 * 60);

  cookieStore.set(name, token, {
    httpOnly: true,
    secure: isSecure,
    sameSite: 'strict',
    path: '/',
    maxAge: resolvedMaxAge,
  });

  return NextResponse.json({ success: true });
}

/** DELETE — clear auth cookies */
export async function DELETE() {
  const cookieStore = await cookies();

  cookieStore.delete(AUTH_COOKIE);
  cookieStore.delete(OTP_COOKIE);

  return NextResponse.json({ success: true });
}

/** GET — check auth status (never returns the token itself) */
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  return NextResponse.json({
    authenticated: !!token,
  });
}
