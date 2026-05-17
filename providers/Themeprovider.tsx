'use client';

import { useEffect, ReactNode } from 'react';

const THEME_REGISTRY = {
  وینکی: {
    classic: ['theme-classic', 'theme-winki'],
    modern: ['theme-modern', 'theme-winki'],
  },
} as const;

type ThemeType = 'classic' | 'modern';
type BrandType = 'وینکی';

interface ThemeProviderProps {
  children: ReactNode;
  theme?: ThemeType;
  brand?: BrandType;
}

export function ThemeProvider({ children, theme = 'modern', brand = 'وینکی' }: ThemeProviderProps) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const body = document.body;

    // حذف کلاس‌های قبلی theme
    body.className = body.className.replace(/\btheme-[\w-]+\b/g, '');

    const themeClasses = THEME_REGISTRY[brand][theme] ?? THEME_REGISTRY[brand].classic;

    body.classList.add(...themeClasses);
  }, [theme, brand]);

  return <>{children}</>;
}
