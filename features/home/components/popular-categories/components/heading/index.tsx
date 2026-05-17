// components
import IconProvider from '@/providers/Iconprovider';
import clsx from 'clsx';
// main
import { FC } from 'react';
// types
import { HeadingProps } from '@/types/home/components/popular-categories/types/types';

const PopularCategoriesHeading: FC<HeadingProps> = ({ title, iconName, className }) => {
  return (
    <div className={clsx('w-full flex items-center justify-between', className)}>
      <div className="flex items-center gap-[var(--gap-m)]">
        {iconName && (
          <IconProvider
            icon={iconName}
            size={28}
            className="lg:w-8 lg:h-8"
            color={'var(--color-primary-950)'}
          />
        )}
        <h3 className="text-[var(--color-primary-950)] text-[1.5rem] font-semibold text-title-m lg:text-title-l">
          {title}
        </h3>
      </div>
    </div>
  );
};
export default PopularCategoriesHeading;
