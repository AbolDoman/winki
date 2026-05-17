import Link from 'next/link';
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';
import { resolveBlogImageSrc } from '../lib/postPresentation';
import type { BlogSimilarPost } from '@/types/post/contracts';

/** Full related posts section — used at the end of the article */
export function RelatedPostsSection({ posts }: { posts: BlogSimilarPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-10 pt-8 border-t border-neutral-200">
      <h2 className="text-xl font-semibold text-(--color-primary-950) mb-6">مقالات مرتبط</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.slice(0, 6).map((post) => (
          <Link
            key={post.id}
            href={`/blogs/${post.slug}`}
            className="group flex flex-col rounded-xl overflow-hidden border border-neutral-100 hover:shadow-md transition-shadow"
          >
            <div className="relative h-36 bg-neutral-100">
              {post.image && (
                <OptimizedImage
                  variant="blog-card"
                  src={resolveBlogImageSrc(post.image)}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
            </div>
            <div className="p-3 flex flex-col gap-1">
              <h3 className="text-sm font-medium text-(--color-primary-950) line-clamp-2">
                {post.title}
              </h3>
              {post.summary && (
                <p className="text-xs text-neutral-500 line-clamp-1">{post.summary}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Compact inline related posts — injected between paragraphs */
export function InlineRelatedPosts({ posts }: { posts: BlogSimilarPost[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="my-6 rounded-xl border border-neutral-100 bg-neutral-50 p-4" dir="rtl">
      <h4 className="text-sm font-semibold text-(--color-primary-950) mb-3">پیشنهاد مطالعه</h4>
      <div className="flex flex-col gap-2">
        {posts.slice(0, 3).map((post) => (
          <Link
            key={post.id}
            href={`/blogs/${post.slug}`}
            className="flex items-center gap-3 rounded-lg p-2 hover:bg-neutral-100 transition-colors"
          >
            {post.image && (
              <div className="relative shrink-0 size-12 rounded-lg overflow-hidden bg-neutral-200">
                <OptimizedImage
                  variant="blog-card"
                  src={resolveBlogImageSrc(post.image)}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <span className="text-sm text-neutral-700 line-clamp-2">{post.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
