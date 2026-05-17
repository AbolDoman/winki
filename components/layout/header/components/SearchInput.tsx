'use client';

import { FormEvent, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import IconProvider from '@/providers/Iconprovider';
import { useSearchStore } from '@/store/search.store';
import { getProductionDomain } from '@/utils/domainName';
import { SearchInputProps } from '@/types/ui/header/components/search-input/types';

const SearchInput = ({ variant = 'mobile', showSubmitButton = false }: SearchInputProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { searchValue, setSearchValue } = useSearchStore();
  const domain = getProductionDomain();
  const domainName = domain === 'winki.ir' ? 'وینکی' : 'نوین لایف';
  const routeSearchValue = searchParams.get('search') ?? '';

  useEffect(() => {
    if (pathname !== '/products') {
      return;
    }

    setSearchValue(routeSearchValue);
  }, [pathname, routeSearchValue, setSearchValue]);

  const placeholderText =
    variant === 'mobile'
      ? { prefix: 'جستجو در ', showDomain: true }
      : { prefix: 'جستجو', showDomain: false };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedValue = searchValue.trim();
    const nextSearchParams = new URLSearchParams(
      pathname === '/products' ? searchParams.toString() : '',
    );

    if (trimmedValue) {
      nextSearchParams.set('search', trimmedValue);
    } else {
      nextSearchParams.delete('search');
    }

    nextSearchParams.delete('page');

    const queryString = nextSearchParams.toString();
    router.push(queryString ? `/products?${queryString}` : '/products');
  };

  return (
    <form className="relative w-full" onSubmit={handleSubmit}>
      <input
        id={`search-input-${variant}`}
        type="text"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={`h-12 w-full rounded-[var(--radius-ml)] pr-[43px] bg-[var(--color-neutral-50)] border border-transparent py-[var(--padding-ml)] pr-[1rem] text-right text-[var(--text-body-l)] font-normal leading-[var(--text-l)] tracking-[var(--tracking-s)] outline-none transition-colors cursor-text hover:border-neutral-200 focus:border-(--color-brand-400) focus:bg-white ${
          showSubmitButton ? 'pl-[6.25rem]' : 'pl-[1rem]'
        }`}
        dir="rtl"
      />
      <label
        htmlFor={`search-input-${variant}`}
        className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2 whitespace-nowrap text-[var(--text-body-l)] leading-[var(--text-l)] tracking-[var(--tracking-s)] cursor-text select-none"
      >
        <IconProvider icon="SearchNormal1" size={20} color="#9CA3AF" />
        {!searchValue && (
          <>
            <span className="text-[var(--color-neutral-400)]">{placeholderText.prefix}</span>
            {placeholderText.showDomain && (
              <span className="font-black text-[var(--color-brand-600)]">{domainName}</span>
            )}
          </>
        )}
      </label>
      {showSubmitButton && (
        <button
          type="submit"
          className="absolute left-2 top-1/2 flex h-8 min-w-[76px] -translate-y-1/2 items-center justify-center gap-1 rounded-[10px] bg-[var(--color-brand-600)] px-3 text-body-s font-medium text-white transition-colors hover:bg-[var(--color-brand-700)]"
          aria-label="جستجو"
        >
          <IconProvider icon="SearchNormal1" size={16} color="white" />
          <span>جستجو</span>
        </button>
      )}
    </form>
  );
};

export default SearchInput;
