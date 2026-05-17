import { BASE_URL } from './baseConfig';

/**
 * Fix double slashes in image URLs
 * Example: https://company.winki.ir//storage/... → https://company.winki.ir/storage/...
 */
export const fixImageUrl = (url: string | null | undefined): string => {
  if (!url) return '';

  // اگر URL کامل است، فقط double slash را برطرف کن
  if (url.startsWith('http')) {
    return url.replace(/([^:]\/)\/+/g, '$1');
  }

  // اگر relative path است، به URL کامل تبدیل کن
  const fullUrl = `${BASE_URL}/storage/${url}`;
  return fullUrl.replace(/([^:]\/)\/+/g, '$1');
};

export const fixImageUrls = (urls: Array<string | null | undefined>): string[] =>
  urls.map((url) => fixImageUrl(url)).filter((url) => Boolean(url));
