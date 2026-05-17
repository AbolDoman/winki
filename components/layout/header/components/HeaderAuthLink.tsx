'use client';

import { useState } from 'react';
import Link from 'next/link';
import IconProvider from '@/providers/Iconprovider';

interface HeaderAuthLinkProps {
  isAuthenticated: boolean;
}

const HeaderAuthLink = ({ isAuthenticated }: HeaderAuthLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={isAuthenticated ? '/profile' : '/login'}
      className="flex items-center gap-(--gap-m) transition-colors hover:text-(--color-brand-600)"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <IconProvider
        icon={isAuthenticated ? 'User' : 'Login'}
        color={isHovered ? 'var(--color-brand-600)' : 'var(--color-primary-950)'}
        className="stroke-[1.5px] w-[1.5rem] h-[1.5rem]"
      />
      <span>{isAuthenticated ? 'پروفایل' : 'ورود/ثبت نام'}</span>
    </Link>
  );
};

export default HeaderAuthLink;
