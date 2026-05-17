import { serverFetch } from '@/lib/server/serverFetch';
import { STOREFRONT_REVALIDATE } from '@/lib/server/storefrontCache';
import type { HomeLayoutResponse } from '@/types/home/contracts';
import DesktopHeader from './DesktopHeader';
import MobileNavbar from './MobileHeader';
import MobileTopHeader from './MobileTopHeader';

export default async function Header() {
  const payload = await serverFetch<HomeLayoutResponse>('/home/layout', {
    revalidate: STOREFRONT_REVALIDATE.NAVIGATION,
    tags: ['home-layout'],
  });

  const categories = payload?.data?.categories ?? [];
  const menus = payload?.data?.menus ?? [];

  return (
    <>
      <DesktopHeader menus={menus} categories={categories} />
      <MobileTopHeader />
      <MobileNavbar />
    </>
  );
}
