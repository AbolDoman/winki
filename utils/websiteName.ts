/**
 * Set website name in cache (called by ClientMetadata)
 */
export const setWebsiteNameCache = (name: string) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('websiteName', name);
  }
};

/**
 * Get website name from API cache
 */
export const getWebsiteName = (): string => {
  if (typeof window === 'undefined') return 'فروشگاه آنلاین';
  return sessionStorage.getItem('websiteName') || 'فروشگاه آنلاین';
};
