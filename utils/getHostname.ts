import { headers } from 'next/headers';
import { LOCAL_DEV_DOMAIN } from '@/utils/local-dev';

export async function getHostname(): Promise<string> {
  const h = await headers();
  const host =
    h.get('x-hostname') ||
    h.get('x-forwarded-host') ||
    h.get('host') ||
    h.get('x-tenant-domain') ||
    'novinlife.com';
  const hostname = host.split(':')[0];

  // In development, use LOCAL_DEV_DOMAIN instead of localhost/127.0.0.1
  if (
    process.env.NODE_ENV === 'development' &&
    (hostname === 'localhost' || hostname === '127.0.0.1')
  ) {
    return LOCAL_DEV_DOMAIN;
  }

  return hostname;
}
