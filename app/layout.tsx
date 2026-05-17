import Script from 'next/script';

import { Toaster } from 'react-hot-toast';
// ui
import './globals.css';
import ErrorBoundary from '@/providers/ErrorBoundary';
import QueryProvider from '@/providers/QueryProvider';
import { ThemeProvider } from '@/providers/Themeprovider';
import ClientOnly from '@/providers/ClientOnly';
import AuthBootstrap from '@/features/auth/components/AuthBootstrap';

// metatags
export { generateMetadata } from '@/utils/generateMetaData';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const shouldLoadClarity = process.env.NODE_ENV === 'production';

  return (
    <html lang="fa" dir="rtl" className="hide-scrollbar" suppressHydrationWarning>
      <body dir="rtl" suppressHydrationWarning>
        <ErrorBoundary>
          <QueryProvider>
            <ThemeProvider>
              <AuthBootstrap />
              {children}
            </ThemeProvider>
          </QueryProvider>
        </ErrorBoundary>
        <ClientOnly>
          <Toaster
            position="top-left"
            toastOptions={{
              duration: 3000,
              className: '',
              success: {
                className:
                  'bg-[#ECFDF3] border-[#079455] border-r border-t border-l border-l-[3px]',
                iconTheme: {
                  primary: 'var(--color-brand-600)',
                  secondary: '#fff',
                },
              },
              error: {
                className: 'bg-white text-[#172334]',
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </ClientOnly>

        {shouldLoadClarity ? (
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "u7finwhzh1");
              `,
            }}
          />
        ) : null}
        <Script
          id="leado-chat"
          src="https://api.leadochat.com/api/leado.js?id=ODMyMzU3Mg=="
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
