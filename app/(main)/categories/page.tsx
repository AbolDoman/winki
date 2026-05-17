'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';
import apiClient from '@/lib/axios';
import { fixImageUrl } from '@/utils/imageUrl';

interface Category {
  id: number;
  title: string;
  slug: string;
  image: string;
  icon: string;
  description?: string;
  children?: Category[];
}

const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await apiClient.get('/home/categories');
  const list = data?.data;
  return Array.isArray(list) ? list : list?.categories ?? [];
};

const CategoryCard = ({ category }: { category: Category }) => (
  <Link
    href={`/categories/${category.slug}`}
    className="group flex flex-col items-center gap-3 rounded-xl border border-neutral-100 p-4 hover:shadow-md hover:border-neutral-200 transition-all"
  >
    <div className="relative size-24 flex items-center justify-center">
      <OptimizedImage
        variant="category"
        src={fixImageUrl(category.image)}
        alt={category.title}
        width={96}
        height={96}
        className="object-contain"
      />
    </div>
    <h3 className="text-sm font-medium text-(--color-primary-950) text-center">
      {category.title}
    </h3>
  </Link>
);

const CategoriesSkeleton = () => (
  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 animate-pulse">
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} className="flex flex-col items-center gap-3 rounded-xl border border-neutral-100 p-4">
        <div className="size-24 rounded-full bg-neutral-100" />
        <div className="h-4 w-16 rounded bg-neutral-100" />
      </div>
    ))}
  </div>
);

export default function CategoriesPage() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['all-categories'],
    queryFn: fetchCategories,
  });

  return (
    <div className="container py-8 [direction:rtl]">
      <h1 className="text-xl sm:text-2xl font-semibold text-(--color-primary-950) mb-6">
        دسته‌بندی محصولات
      </h1>

      {isLoading ? (
        <CategoriesSkeleton />
      ) : categories.length === 0 ? (
        <p className="text-neutral-500 text-center py-12">دسته‌بندی‌ای یافت نشد</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
