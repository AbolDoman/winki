'use client';

import { useQuery } from '@tanstack/react-query';
import PopularCategories from '@/features/home/components/popular-categories/components';
import ProductsSection from '@/features/home/components/products/ProductsSection';
import BlogsSection from '@/features/home/components/blogs/BlogsSection';
import Promo from '@/features/home/components/promo-section/Promo';
import Slider from '@/features/home/components/hero/components/Slider';
import OffersSection from '@/features/home/components/products/OffersSection';
import Link from 'next/link';
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';
import apiClient from '@/lib/axios';
import type { HomePageSections } from '@/types/home/contracts';
import type { SliderType } from '@/types/home/components/hero/type';

const STALE = 60 * 1000;

async function fetchSection<T>(endpoint: string): Promise<T[]> {
  try {
    const { data } = await apiClient.get(endpoint, { skipToast: true });
    const result = data?.data;
    return Array.isArray(result) ? result : [];
  } catch {
    return [];
  }
}

type BannerItem = {
  id: number;
  image: string;
  url: string;
  title: string;
  subtitle: string;
  is_active: boolean;
};
type Widget = { type: string; items?: BannerItem[] };

async function fetchSlides(): Promise<SliderType[]> {
  try {
    const widgets = await fetchSection<Widget>('/home/widgets');
    const banner = widgets.find((w) => w.type === 'banner');
    return (banner?.items ?? [])
      .filter((i) => i.is_active)
      .map((i) => ({
        id: i.id,
        image: 'https://api.winki.ir/storage/' + i.image,
        url: i.url,
        title: i.title,
        subtitle: i.subtitle,
      }));
  } catch {
    return [];
  }
}

function SectionSkeleton({ title = false, items = 4 }: { title?: boolean; items?: number }) {
  return (
    <section>
      <div className="container animate-pulse">
        {title && <div className="mb-6 h-8 w-48 rounded-xl bg-neutral-100" />}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: items }).map((_, i) => (
            <div key={i} className="h-40 rounded-2xl bg-neutral-100 md:h-56" />
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroSkeleton() {
  return (
    <div className="sm:mt-6 lg:mt-16 sm:container">
      <div className="h-[200px] md:h-[380px] lg:h-[420px] sm:rounded-2xl bg-neutral-100 animate-pulse" />
    </div>
  );
}

export default function HomePageContent() {
  const slides = useQuery({
    queryKey: ['home', 'slides'],
    queryFn: fetchSlides,
    staleTime: STALE,
  });

  const categories = useQuery({
    queryKey: ['home', 'categories'],
    queryFn: () => fetchSection<HomePageSections['categories'][number]>('/home/categories'),
    staleTime: STALE,
  });

  const mostViewed = useQuery({
    queryKey: ['home', 'most-viewed'],
    queryFn: () =>
      fetchSection<HomePageSections['most_viewed_products'][number]>('/home/most-viewed-products'),
    staleTime: STALE,
  });

  const mostLiked = useQuery({
    queryKey: ['home', 'most-liked'],
    queryFn: () =>
      fetchSection<HomePageSections['most_liked_products'][number]>('/home/most-liked-products'),
    staleTime: STALE,
  });

  const specialSales = useQuery({
    queryKey: ['home', 'special-sales'],
    queryFn: () => fetchSection<HomePageSections['special_sales'][number]>('/home/special-sales'),
    staleTime: STALE,
  });

  const latestPosts = useQuery({
    queryKey: ['home', 'latest-posts'],
    queryFn: () => fetchSection<HomePageSections['latest_posts'][number]>('/home/latest-posts'),
    staleTime: STALE,
  });

  const latestPostsMapped = (latestPosts.data ?? []).map((post) => ({
    ...post,
    description: post.summary,
    date: '',
    author: '',
    category: post.category ?? { id: 0, title: '' },
  }));

  return (
    <main className="mb-20 flex flex-col gap-4 sm:gap-6 lg:gap-16">
      {/* Hero Slider */}
      {slides.isLoading ? (
        <HeroSkeleton />
      ) : (slides.data ?? []).length > 0 ? (
        <div className="sm:mt-6 lg:mt-16 sm:container">
          <Slider theme="modern" slides={slides.data!} />
        </div>
      ) : null}

      {/* Categories — mobile: grid + link, desktop: slider */}
      {categories.isLoading ? (
        <SectionSkeleton items={6} />
      ) : (categories.data ?? []).length > 0 ? (
        <>
          {/* Mobile: grid 3 cols, max 6 items + "همه" link */}
          <section className="container lg:hidden">
            <div className="grid grid-cols-3 gap-3">
              {categories.data!.slice(0, 6).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="flex flex-col items-center gap-2 rounded-xl border border-neutral-100 p-3"
                >
                  <div className="relative size-16">
                    <OptimizedImage
                      variant="category"
                      src={cat.image}
                      alt={cat.title}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-medium text-center line-clamp-2">{cat.title}</span>
                </Link>
              ))}
            </div>
            {categories.data!.length > 6 && (
              <Link
                href="/categories"
                className="mt-3 flex items-center justify-center gap-1 rounded-lg border border-neutral-100 py-2.5 text-sm text-(--color-brand-600)"
              >
                مشاهده همه دسته‌بندی‌ها
              </Link>
            )}
          </section>
          {/* Desktop: existing slider */}
          <div className="hidden lg:block">
            <PopularCategories categories={categories.data!} />
          </div>
        </>
      ) : null}

      {/* Most Viewed */}
      {mostViewed.isLoading ? (
        <SectionSkeleton title items={8} />
      ) : (mostViewed.data ?? []).length > 0 ? (
        <ProductsSection
          data={mostViewed.data!.slice(0, 8)}
          title="پربازدیدترین ها"
          sort="most_visited"
        />
      ) : null}

      <section aria-label="promo-section" className="container">
        <Promo />
      </section>

      {/* Most Liked */}
      {mostLiked.isLoading ? (
        <SectionSkeleton title items={8} />
      ) : (mostLiked.data ?? []).length > 0 ? (
        <ProductsSection
          data={mostLiked.data!.slice(0, 8)}
          title="پرفروش‌ترین ها"
          sort="bestseller"
        />
      ) : null}

      {/* Special Sales */}
      {specialSales.isLoading ? (
        <SectionSkeleton title items={4} />
      ) : (specialSales.data ?? []).length > 0 ? (
        <OffersSection specialSale={specialSales.data![0]} />
      ) : null}

      {/* Latest Posts */}
      {latestPosts.isLoading ? (
        <SectionSkeleton title items={3} />
      ) : latestPostsMapped.length > 0 ? (
        <BlogsSection posts={latestPostsMapped} />
      ) : null}
    </main>
  );
}
