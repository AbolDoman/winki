import { BasicInfo } from '@/services/basicInformation';

export function getFavicon(basicInfo: BasicInfo | null): string {
  if (!basicInfo?.favicon) {
    return '/favicon.ico'; // fallback to default favicon
  }

  // If favicon is a full URL, return it as is
  if (basicInfo.favicon.startsWith('http')) {
    return basicInfo.favicon;
  }

  // If favicon is a relative path, ensure it starts with /
  return basicInfo.favicon.startsWith('/') ? basicInfo.favicon : `/${basicInfo.favicon}`;
}
