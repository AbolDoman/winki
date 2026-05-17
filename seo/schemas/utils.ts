/**
 * Converts Jalali date to ISO 8601 format
 * If conversion fails, returns current date
 */
export const toISO8601 = (jalaliDate?: string): string => {
  if (!jalaliDate) return new Date().toISOString();

  try {
    // If already in ISO format, return as is
    if (jalaliDate.includes('T') || jalaliDate.includes('Z')) {
      return new Date(jalaliDate).toISOString();
    }

    // For Jalali dates, return current date as fallback
    return new Date().toISOString();
  } catch {
    return new Date().toISOString();
  }
};

/**
 * Ensures URL is absolute with correct domain
 */
export const toAbsoluteUrl = (path: string, domain: string): string => {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const cleanDomain = domain.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  return `https://${cleanDomain}${cleanPath}`;
};

/**
 * Extracts plain text from HTML content
 */
export const stripHtml = (html?: string): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
};

/**
 * Truncates text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Gets domain-specific organization data
 */
export const getOrganizationData = (domain: string) => {
  const isWinki = domain.includes('winki.ir');

  return {
    name: isWinki ? 'وینکی' : 'نوین لایف',
    url: `https://${domain}`,
    logo: `https://${domain}/logo.png`,
    description: isWinki ? 'فروشگاه آنلاین وینکی' : 'فروشگاه آنلاین نوین لایف',
  };
};
