import { FC } from 'react';
import Link from 'next/link';
import IconProvider from '@/providers/Iconprovider';

interface SectionHeaderProps {
  title: string;
  icon?: string;
  href: string;
  linkText?: string;
  hasIcon?: boolean;
}

const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  icon,
  href,
  hasIcon,
  linkText = 'مشاهده همه',
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 shrink-0">
        {hasIcon && icon && (
          <IconProvider
            icon={icon}
            className="size-6 sm:size-7 lg:size-8"
            color="var(--color-primary-950)"
          />
        )}
        <h2 className="text-(--color-primary-950) text-lg sm:text-xl lg:text-2xl font-semibold whitespace-nowrap">
          {title}
        </h2>
      </div>
      <Link
        href={href}
        className="text-(--color-brand-600) flex shrink-0 gap-1.5 whitespace-nowrap items-center sm:bg-(--color-brand-50) text-body-s sm:text-body-m py-[10px] px-4 rounded-lg"
        aria-label={linkText}
      >
        <span className="text-xs lg:text-sm">{linkText}</span>
        <IconProvider icon="ArrowLeft2" size={16} color="var(--color-brand-600)" />
      </Link>
    </div>
  );
};

export default SectionHeader;
