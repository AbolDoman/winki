import { FC } from 'react';
import Link from 'next/link';
import IconProvider from '@/providers/Iconprovider';
import { MegaMenuListProps } from '@/types/ui/header/navbar/desktop/components/mega-menu/types/types';
import { fixImageUrl } from '@/utils/imageUrl';
import MegaMenuItem from './MeaMenuItem';

const MegaMenuList: FC<MegaMenuListProps> = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-[1rem]">
      <Link
        href="/categories"
        className="flex items-center gap-2 w-fit text-(--color-brand-600) hover:opacity-80 transition-opacity"
      >
        <span className="text-body-m">همه دسته بندی ها</span>
        <IconProvider icon="ArrowLeft2" size={16} color="var(--color-brand-600)" />
      </Link>
      {/* Mega Menu List Items */}
      <div className="grid grid-cols-2 mobile:grid-cols-3 tablet:grid-cols-6 desktop:grid-cols-8 gap-[var(--gap-base)] tablet:gap-[var(--gap-xl)]">
        {categories.map((category) => (
          <MegaMenuItem
            key={category.id}
            title={category?.title}
            image={fixImageUrl(category.image)}
            alt={category?.title}
            slug={category.slug}
          />
        ))}
      </div>
    </div>
  );
};
export default MegaMenuList;
