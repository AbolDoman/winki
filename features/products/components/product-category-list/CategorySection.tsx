import CategorySlider from './CategorySlider';
import type { CategoryItem } from '@/types/product/types/productsPageTypes';

interface CategorySectionProps {
  title?: string;
  categories?: CategoryItem[];
  buildCategoryHref?: (categoryId: number | null) => string;
  onCategorySelect?: (categoryId: number | null) => void;
  allItemsTitle?: string;
  showAllItem?: boolean;
  activeCategoryId?: number | null;
}

export interface SubCategory {
  id?: number | null;
  title: string;
  image: string;
  link: string;
}

const DEFAULT_CATEGORY_IMAGE = '/images/home-1.png';

const normalizeCategoryImage = (icon?: string | null): string => {
  if (!icon) {
    return DEFAULT_CATEGORY_IMAGE;
  }

  const value = icon.trim();

  if (!value) {
    return DEFAULT_CATEGORY_IMAGE;
  }

  if (/^https?:\/\//i.test(value) || value.startsWith('/') || /^data:/i.test(value)) {
    return value;
  }

  if (value.startsWith('//')) {
    return `https:${value}`;
  }

  if (value.startsWith('images/')) {
    return `/${value}`;
  }

  if (/\.(png|jpe?g|webp|svg|gif|avif)$/i.test(value)) {
    return `/${value}`;
  }

  return DEFAULT_CATEGORY_IMAGE;
};

const CategorySection = ({
  title = 'تمام محصولات',
  categories = [],
  buildCategoryHref,
  onCategorySelect,
  allItemsTitle = 'تمام محصولات',
  showAllItem = true,
  activeCategoryId,
}: CategorySectionProps) => {
  const categoryItems: SubCategory[] = [
    ...(showAllItem
      ? [
          {
            id: null,
            title: allItemsTitle,
            image: DEFAULT_CATEGORY_IMAGE,
            link: buildCategoryHref?.(null) ?? '/products',
          },
        ]
      : []),
    ...categories.map((category) => ({
      id: category.id,
      title: category.title,
      image: normalizeCategoryImage(category.icon),
      link: buildCategoryHref?.(category.id) ?? '/products',
    })),
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="hidden text-xl sm:block">{title}</h1>
      {categoryItems.length > 0 && (
        <CategorySlider
          items={categoryItems}
          activeCategoryId={activeCategoryId}
          onSelect={onCategorySelect}
        />
      )}
    </div>
  );
};

export default CategorySection;
