'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';
import type { BlogCardPost, BlogCategoryLink } from '@/types/post/contracts';
import { mapBlogListPageData } from '../lib/postMappers';
import { resolveBlogImageSrc } from '../lib/postPresentation';
import BlogsPageHero from './BlogsPageHero';
import apiClient from '@/lib/axios';

const PER_PAGE = 12;

const fetchBlogList = async (page: number, categorySlug?: string) => {
  const params: Record<string, string | number> = { per_page: PER_PAGE, page };
  if (categorySlug) params.category = categorySlug;
  const { data } = await apiClient.get('/posts', { params });
  return mapBlogListPageData(data);
};

const BlogListCard = ({ post }: { post: BlogCardPost }) => (
  <Link
    href={`/blogs/${post.slug}`}
    className="group flex flex-col rounded-xl overflow-hidden border border-neutral-100 hover:shadow-md transition-shadow"
  >
    <div className="relative h-40 sm:h-48">
      <OptimizedImage
        variant="blog-card"
        src={resolveBlogImageSrc(post.image)}
        alt={post.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-4 flex flex-col gap-2">
      <h3 className="text-sm sm:text-base font-medium text-(--color-primary-950) line-clamp-2">
        {post.title}
      </h3>
      {post.summary && (
        <p className="text-xs text-neutral-500 line-clamp-2">{post.summary}</p>
      )}
      <div className="flex items-center justify-between text-xs text-neutral-400 mt-1">
        {post.categoryTitle && <span>{post.categoryTitle}</span>}
        {post.authorName && <span>{post.authorName}</span>}
      </div>
    </div>
  </Link>
);

const BlogListSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 animate-pulse">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="flex flex-col rounded-xl overflow-hidden border border-neutral-100">
        <div className="h-40 sm:h-48 bg-neutral-100" />
        <div className="p-4 flex flex-col gap-2">
          <div className="h-4 w-3/4 rounded bg-neutral-100" />
          <div className="h-3 w-full rounded bg-neutral-100" />
          <div className="h-3 w-1/2 rounded bg-neutral-100" />
        </div>
      </div>
    ))}
  </div>
);

const CategoryTabs = ({
  categories,
  active,
  onChange,
}: {
  categories: BlogCategoryLink[];
  active: string | undefined;
  onChange: (slug: string | undefined) => void;
}) => (
  <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
    <button
      onClick={() => onChange(undefined)}
      className={`shrink-0 px-4 py-2 rounded-lg text-sm transition-colors ${
        !active
          ? 'bg-(--color-brand-600) text-white'
          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
      }`}
    >
      همه
    </button>
    {categories.map((cat) => (
      <button
        key={cat.id}
        onClick={() => onChange(cat.slug)}
        className={`shrink-0 px-4 py-2 rounded-lg text-sm transition-colors ${
          active === cat.slug
            ? 'bg-(--color-brand-600) text-white'
            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
        }`}
      >
        {cat.title}
      </button>
    ))}
  </div>
);

const BlogsPageContent = () => {
  const [page, setPage] = useState(1);
  const [categorySlug, setCategorySlug] = useState<string | undefined>();

  const { data, isLoading } = useQuery({
    queryKey: ['blogs', page, categorySlug],
    queryFn: () => fetchBlogList(page, categorySlug),
  });

  const posts = data?.posts.data ?? [];
  const categories = data?.categories ?? [];

  const handleCategoryChange = (slug: string | undefined) => {
    setCategorySlug(slug);
    setPage(1);
  };

  return (
    <div>
      {/* Hero — first 5 posts */}
      {posts.length > 0 && (
        <BlogsPageHero posts={{ data: posts.slice(0, 5) }} />
      )}

      <section className="container mt-8 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-(--color-primary-950)">
            همه مقالات
          </h2>
          {categories.length > 0 && (
            <CategoryTabs
              categories={categories}
              active={categorySlug}
              onChange={handleCategoryChange}
            />
          )}
        </div>

        {isLoading ? (
          <BlogListSkeleton />
        ) : posts.length > 5 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {posts.slice(5).map((post) => (
              <BlogListCard key={post.id} post={post} />
            ))}
          </div>
        ) : !isLoading && posts.length === 0 ? (
          <p className="text-neutral-500 text-center py-12">مقاله‌ای یافت نشد</p>
        ) : null}

        {/* Pagination */}
        {posts.length >= PER_PAGE && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border border-neutral-200 text-sm disabled:opacity-40"
            >
              قبلی
            </button>
            <span className="px-4 py-2 text-sm text-neutral-600">
              صفحه {page}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-lg border border-neutral-200 text-sm"
            >
              بعدی
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogsPageContent;
