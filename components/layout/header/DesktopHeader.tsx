import { cookies } from 'next/headers';
import HeaderLogo from './components/Logo';
import SearchInput from './components/SearchInput';
import IconProvider from '@/providers/Iconprovider';
import ActionCart from './components/ActionCart';
import HeaderAuthLink from './components/HeaderAuthLink';
import Navbar from './components/Navbar';
import type { HeaderMenu, HomeCategory } from '@/types/home/contracts';

export default async function DesktopHeader({
  menus,
  categories,
}: {
  menus: HeaderMenu[];
  categories: HomeCategory[];
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token');
  const isAuthenticated = !!token?.value;

  return (
    <header className="sticky -top-10 z-99 w-full hidden lg:block">
      {/* نوار بالایی — اسکرول می‌شود */}
      <div className="bg-(--color-primary-950)">
        <div className="container flex py-2 gap-5">
          <div className="flex items-center text-white gap-5 text-body-m">
            <span>ارتباط با ما</span>
            <span>پیگیری سفارشات</span>
          </div>
          <span className="text-white text-body-m">|</span>
          <div className="flex items-center gap-(--gap-sm) text-white text-body-m">
            <IconProvider icon="InfoCircle" />
            <span>راهنمای کاربران</span>
          </div>
        </div>
      </div>

      {/* لوگو + سرچ + سبد + navbar — sticky */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center gap-6 py-4 container">
          <HeaderLogo />
          <div className="flex-1">
            <SearchInput variant="desktop" />
          </div>
          <div className="flex shrink-0 items-center text-body-l py-[var(--padding-ml)] px-(--padding-base) gap-[var(--gap-m)] border border-[var(--color-neutral-100)] rounded-[var(--radius-ml)]">
            <ActionCart />
            <span className="border h-[1.5rem] w-px border-neutral-100" />
            <HeaderAuthLink isAuthenticated={isAuthenticated} />
          </div>
        </div>
        <Navbar menus={menus} categories={categories} />
      </div>
    </header>
  );
}
