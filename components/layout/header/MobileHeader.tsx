'use client';
import { FC, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import IconProvider from '@/providers/Iconprovider';
import { NavItem } from '@/types/ui/header/navbar/mobile/types/types';
export const navItems: NavItem[] = [
  {
    route: '/',
    label: 'خانه',
    icon: 'Home',
  },
  {
    route: '/categories',
    label: 'دسته‌بندی',
    icon: 'Category',
  },
  {
    route: '/cart',
    label: 'سبد خرید',
    icon: 'ShoppingCart',
  },
  {
    route: '/blogs',
    label: 'بلاگ ها',
    icon: 'Notepad2',
  },
  {
    route: '/profile',
    label: 'پروفایل',
    icon: 'User',
  },
];

const MobileNavbar: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  // Fix: Handle -1 case and sync with pathname changes
  const getActiveIndex = () => {
    const index = navItems.findIndex((item) => item.route === pathname);
    return index >= 0 ? index : 0; // Default to home if no match
  };

  const [activeIndex, setActiveIndex] = useState<number>(getActiveIndex());

  const handleNavClick = (index: number, route: string) => {
    try {
      setActiveIndex(index);
      router.push(route);
    } catch (error) {
      console.error('Navigation error:', error);
      // Reset to home on error
      setActiveIndex(0); // Home index
      router.push('/');
    }
  };

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 w-screen bg-white z-9999 p-1 pb-[env(safe-area-inset-bottom)]"
      style={{
        boxShadow: '0px 2px 8px rgba(113, 113, 113, 0.12)',
        margin: 0,
        maxWidth: '100vw',
      }}
    >
      <ul className="flex items-center py-2">
        {navItems.map((item, index) => (
          <li key={item.route} className="w-1/5">
            <button
              onClick={() => handleNavClick(index, item.route)}
              className={`w-full flex flex-col items-center justify-center md:flex-row md:items-center md:gap-[8px] h-[60px] py-2 px-1 rounded-lg transition-colors duration-200 ${
                activeIndex === index && 'bg-[var(--color-brand-600)]'
              }`}
              aria-label={item.label}
            >
              <IconProvider
                icon={item.icon}
                size={24}
                color={activeIndex === index ? 'white' : 'var(--color-neutral-400)'}
                className="md:w-[32px] md:h-[32px]"
                variant={activeIndex === index ? 'Bold' : 'Outline'}
              />
              <span
                className={`text-body-s md:text-body-m mt-1 font-medium whitespace-nowrap ${
                  activeIndex === index ? 'text-white' : 'text-[var(--color-neutral-400)]'
                }`}
              >
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNavbar;
