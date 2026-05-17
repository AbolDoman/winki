import IconProvider, { type IconsaxIconName } from '@/providers/Iconprovider';
import Button from '@/components/ui/primitives/button/Button';
import type { HeaderMenuItem, HomeCategory } from '@/types/home/contracts';
import CategoryMegaMenu from './CategoryMegaMenu';

const CategoryTrigger = ({
  item,
  categories,
}: {
  item: HeaderMenuItem;
  categories?: readonly HomeCategory[];
}) => {
  const triggerIcon = item.icon ? (item.icon as IconsaxIconName) : undefined;

  return (
    <li className="group">
      <Button
        type="button"
        variant="primary"
        icon={triggerIcon}
        iconSize={24}
        size="md"
        iconPosition="right"
        className="flex items-center justify-between gap-[var(--gap-m)] py-[var(--padding-ml)] px-[var(--padding-xl)]"
      >
        <div className="flex items-center gap-[var(--gap-m)]">
          <span className="text-body-l font-normal">دسته بندی محصولات</span>
          <IconProvider icon="ArrowDown2" size={20} />
        </div>
        {item.badge && (
          <span
            className="px-2 py-1 text-xs rounded-full text-white"
            style={{ backgroundColor: item.badge.color }}
          >
            {item.badge.text}
          </span>
        )}
      </Button>
      <CategoryMegaMenu categories={categories} />
    </li>
  );
};

export default CategoryTrigger;
