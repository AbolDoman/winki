'use client';
// main
import Link from 'next/link';
// types
import { TabsTriggerProps } from '@/types/product/components/product-detail/components/product-detail-intro/types/types';
// hooks
import { useTabs } from '@/hooks/products';
import { formatPersianNumber } from '@/utils/numberFormatter';

export const TabsTrigger = ({
  value,
  tabTitle,
  targetId,
  disableScroll = false,
  hasNumber = false,
  number = 0,
}: TabsTriggerProps) => {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === value;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveTab(value);
    if (!disableScroll) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div
      className={`flex items-center gap-2  ${
        isActive ? 'text-[var(--color-brand-600)]' : 'text-[var(--color-neutral-600)]'
      }`}
    >
      {hasNumber && (
        <span
          className={`text-body-m text-(--color-neutral-600) font-normal ${
            isActive ? 'text-[var(--color-brand-600)]' : 'text-[var(--color-neutral-600)]'
          }`}
        >
          {formatPersianNumber(number)}
        </span>
      )}
      <Link href={`#${targetId}`} onClick={handleClick} className="cursor-pointer transition-all">
        <span className="text-title-s lg:text-body-m font-normal">{tabTitle}</span>
      </Link>
    </div>
  );
};
