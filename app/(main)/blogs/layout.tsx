import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children};</>;
}
