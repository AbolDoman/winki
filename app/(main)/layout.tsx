import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import AutoBreadcrumb from '@/components/layout/AutoBreadcrumb';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <AutoBreadcrumb />
      {children}
      <Footer />
    </>
  );
}
