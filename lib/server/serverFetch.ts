import { API_KEY, API_BASE_URL as BASE_URL } from './config';

export interface ServerFetchOptions {
  /** Cache revalidate time in seconds (ISR) */
  revalidate?: number;
  /** Cache tags for on-demand invalidation */
  tags?: string[];
  /** Override cache strategy */
  cache?: 'no-store' | 'force-cache';
  /** Timeout in ms. Default: 15000 */
  timeout?: number;
  /** HTTP method. Default: GET */
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  /** JSON request body */
  body?: unknown;
}

const IS_DEV = process.env.NODE_ENV === 'development';

function buildFetchInit(options: ServerFetchOptions = {}): RequestInit {
  const { cache, revalidate, tags, method = 'GET', body, timeout = 15000 } = options;

  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout);

  const init: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-API-Key': API_KEY,
    },
    signal: controller.signal,
  };

  if (body) {
    init.body = JSON.stringify(body);
  }

  // In dev mode, never cache — prevents stale data after viewport changes or API blips
  if (IS_DEV || cache === 'no-store') {
    init.cache = 'no-store';
  } else {
    const nextConfig: { revalidate?: number; tags?: string[] } = {};

    if (revalidate !== undefined) {
      nextConfig.revalidate = revalidate;
    }
    if (tags && tags.length > 0) {
      nextConfig.tags = tags;
    }
    if (Object.keys(nextConfig).length > 0) {
      init.next = nextConfig;
    }
    if (cache) {
      init.cache = cache;
    }
  }

  return init;
}

/**
 * Unified server-side fetch — returns raw Response.
 * Use when you need status code checks (e.g. 404 handling).
 */
export async function serverFetchResponse(
  endpoint: string,
  options?: ServerFetchOptions,
): Promise<Response> {
  return fetch(`${BASE_URL}${endpoint}`, buildFetchInit(options));
}

/**
 * Unified server-side fetch — returns parsed JSON or null on failure.
 * Always sends API Key, has timeout (15s default), supports cache/revalidate/tags.
 */
export async function serverFetch<T>(
  endpoint: string,
  options?: ServerFetchOptions,
): Promise<T | null> {
  try {
    const response = await serverFetchResponse(endpoint, options);
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}
