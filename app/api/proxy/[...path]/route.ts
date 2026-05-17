import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { API_KEY, API_BASE_URL as BASE_URL } from '@/lib/server/config';

const AUTH_COOKIE = 'auth_token';
const CSRF_COOKIE = 'csrf_token';
const CSRF_HEADER = 'x-csrf-token';
const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

async function proxyRequest(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const targetPath = path.join('/');
  const url = new URL(`${BASE_URL}/${targetPath}`);

  // Forward query params
  request.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  // CSRF validation for mutating requests
  if (MUTATING_METHODS.has(request.method)) {
    const cookieStore = await cookies();
    const csrfCookie = cookieStore.get(CSRF_COOKIE)?.value;
    const csrfHeader = request.headers.get(CSRF_HEADER);

    if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
      return NextResponse.json(
        { success: false, message: 'CSRF validation failed' },
        { status: 403 },
      );
    }
  }

  // Build headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-API-Key': API_KEY,
  };

  // Read httpOnly auth token and forward as Bearer
  const cookieStore = await cookies();
  const authToken = cookieStore.get(AUTH_COOKIE)?.value;
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  // Forward request
  const fetchOptions: RequestInit = {
    method: request.method,
    headers,
  };

  if (MUTATING_METHODS.has(request.method)) {
    try {
      const body = await request.text();
      if (body) fetchOptions.body = body;
    } catch {
      // No body
    }
  }

  try {
    const response = await fetch(url.toString(), fetchOptions);
    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') ?? 'application/json',
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Proxy request failed' },
      { status: 502 },
    );
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
