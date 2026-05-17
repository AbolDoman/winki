import { LOCAL_DEV_DOMAIN } from '@/utils/local-dev';

export const getProductionDomain = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return LOCAL_DEV_DOMAIN;
    }

    if (hostname.includes('winki')) {
      return 'winki.ir';
    }

    if (hostname.includes('novinlife')) {
      return 'novinlife.com';
    }

    return LOCAL_DEV_DOMAIN;
  }

  return LOCAL_DEV_DOMAIN;
};
