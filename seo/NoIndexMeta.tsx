'use client';

import { useEffect } from 'react';

export default function NoIndexMeta() {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.content = 'noindex, nofollow';

    return () => {
      const meta = document.querySelector('meta[name="robots"]');
      if (meta && meta.getAttribute('content') === 'noindex, nofollow') {
        meta.remove();
      }
    };
  }, []);

  return null;
}
