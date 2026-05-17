import moment from 'moment-jalaali';
import { BASE_URL } from '@/utils/baseConfig';

const BLOG_PLACEHOLDER_IMAGE = '/placeholder.png';

let hasLoadedPersianLocale = false;

const ensurePersianLocale = () => {
  if (hasLoadedPersianLocale) return;

  moment.loadPersian({ dialect: 'persian-modern' });
  hasLoadedPersianLocale = true;
};

const normalizeUrl = (value: string) => value.replace(/([^:]\/)\/+/g, '$1');

const getApiOrigin = () => {
  try {
    return new URL(BASE_URL).origin;
  } catch {
    return '';
  }
};

export const resolveBlogImageSrc = (image?: string | null): string => {
  const value = image?.trim();
  if (!value) return BLOG_PLACEHOLDER_IMAGE;
  if (/^(https?:\/\/|data:|blob:)/i.test(value)) return value;

  const apiOrigin = getApiOrigin();
  if (!apiOrigin) {
    return value.startsWith('/') ? value : `/${value.replace(/^\/+/, '')}`;
  }

  const normalizedPath = value.replace(/^\/+/, '');
  const resolvedPath = value.startsWith('/')
    ? `/${normalizedPath}`
    : normalizedPath.includes('/')
      ? `/${normalizedPath}`
      : `/storage/${normalizedPath}`;

  return normalizeUrl(new URL(resolvedPath, apiOrigin).toString());
};

export const formatBlogDate = (date?: string | null): string => {
  const value = date?.trim();
  if (!value) return '';

  ensurePersianLocale();

  const parsed = /^\d{4}\/\d{1,2}\/\d{1,2}$/.test(value)
    ? moment(value, 'jYYYY/jMM/jDD')
    : moment(value);

  const formatted = parsed.format('jD jMMMM jYYYY');
  return formatted === 'Invalid date' ? '' : formatted;
};

export const toBlogDateTime = (date?: string | null): string | undefined => {
  const value = date?.trim();
  if (!value || /^\d{4}\/\d{1,2}\/\d{1,2}$/.test(value)) return undefined;

  const normalizedValue =
    value.includes(' ') && !value.includes('T') ? value.replace(' ', 'T') : value;
  const parsedDate = new Date(normalizedValue);

  return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate.toISOString();
};
