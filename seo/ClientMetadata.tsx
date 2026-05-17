'use client';

import { getBasicInformation } from '@/services/basicInformation';
import { useEffect, useState } from 'react';

type BasicInformationResponse = {
  output?: {
    favicon?: string;
  };
};

export default function ClientMetadata() {
  const [basicData, setBasicData] = useState<BasicInformationResponse | null>(null);

  // جایگزین useQuery: دریافت داده یک‌بار در mount
  useEffect(() => {
    let cancelled = false;

    const fetchBasicInformation = async () => {
      try {
        const data = await getBasicInformation();
        if (!cancelled) setBasicData(data as BasicInformationResponse);
      } catch (error) {
        console.error('[ClientMetadata Fetch Error]', error);
      }
    };

    fetchBasicInformation();

    return () => {
      cancelled = true;
    };
  }, []);

  // اعمال meta و favicon بعد از آماده شدن data
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Add Google verification for novinlife.com
    const hostname = window.location.hostname;
    if (hostname.includes('novinlife.com')) {
      let verificationMeta = document.querySelector('meta[name="google-site-verification"]');

      if (!verificationMeta) {
        verificationMeta = document.createElement('meta');
        verificationMeta.setAttribute('name', 'google-site-verification');
        verificationMeta.setAttribute('content', 'Bz_HJflhmYfCsaALHtbx0-CqhlDDNqGLPH-anCBYOKQ');
        document.head.appendChild(verificationMeta);
      }
    }

    const favicon = basicData?.output?.favicon;
    if (!favicon) return;

    try {
      const updateLink = (rel: string) => {
        let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;

        if (!link) {
          link = document.createElement('link');
          link.rel = rel;
          document.head.appendChild(link);
        }

        link.href = favicon;
      };

      updateLink('icon');
      updateLink('shortcut icon');
      updateLink('apple-touch-icon');
    } catch (error) {
      console.error('[ClientMetadata Error]', error);
    }
  }, [basicData]);

  return null;
}
