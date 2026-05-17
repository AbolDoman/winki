'use client';

// main
import { FC, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
// types
import { NavbarLinkProps } from '@/types/ui/header/navbar/desktop/types/types';
// components
import IconProvider, { type IconsaxIconName } from '@/providers/Iconprovider';
import CategoryTrigger from './CategoryTrigger';

const NavbarLink: FC<NavbarLinkProps> = ({ item, categories }) => {
  if (item.icon === 'HamburgerMenu') {
    return <CategoryTrigger item={item} categories={categories} />;
  }

  return <NavbarLinkItem item={item} />;
};

const NavbarLinkItem: FC<Pick<NavbarLinkProps, 'item'>> = ({ item }) => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const isActive =
    !!item.url &&
    (item.url === '/'
      ? pathname === '/'
      : pathname === item.url || pathname.startsWith(item.url + '/'));

  const highlighted = isActive || isHovered;
  const iconColor = highlighted ? 'var(--color-brand-600)' : 'var(--color-primary-950)';

  return (
    <li className={`border-b-2 transition-colors ${isActive ? 'border-(--color-brand-600)' : 'border-transparent'}`}>
      <Link
        href={item.url || '#'}
        className={`flex items-center gap-[var(--gap-m)] text-body-l font-normal transition-colors pb-1 ${
          isActive
            ? 'text-(--color-brand-600) font-medium'
            : 'text-(--color-primary-950) hover:text-(--color-brand-600)'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {item.icon && (
          <IconProvider
            icon={item.icon as IconsaxIconName}
            color={iconColor}
            size={24}
          />
        )}
        {item.title}
        {item.badge && (
          <span
            className="px-2 py-1 text-xs rounded-full text-white"
            style={{ backgroundColor: item.badge.color }}
          >
            {item.badge.text}
          </span>
        )}
      </Link>
    </li>
  );
};

export default NavbarLink;
