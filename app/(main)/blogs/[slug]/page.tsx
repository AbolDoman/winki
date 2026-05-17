import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';
import { mapBlogDetailViewModel } from '@/features/blog/lib/postMappers';
import {
  formatBlogDate,
  resolveBlogImageSrc,
  toBlogDateTime,
} from '@/features/blog/lib/postPresentation';
import { injectHeadingIds } from '@/features/blog/lib/headingUtils';
import { splitContentAtParagraph } from '@/features/blog/lib/contentSplitter';
import { serverFetch } from '@/lib/server/serverFetch';
import { STOREFRONT_REVALIDATE } from '@/lib/server/storefrontCache';
import TableOfContents from '@/features/blog/components/TableOfContents';
import AuthorBox from '@/features/blog/components/AuthorBox';
import { RelatedPostsSection, InlineRelatedPosts } from '@/features/blog/components/RelatedPosts';

const PROSE_CLASSES =
  'prose prose-lg max-w-none [&_img]:w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:shadow-md [&_p]:mb-4 [&_p]:text-gray-700 [&_p]:leading-7 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mb-6 [&_h1]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mb-4 [&_h2]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mb-3 [&_h3]:mt-6 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-gray-800 [&_h4]:mb-2 [&_h4]:mt-4 [&_ul]:list-disc [&_ul]:mr-6 [&_ul]:mb-4 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:mr-6 [&_ol]:mb-4 [&_ol]:space-y-2 [&_li]:text-gray-700 [&_a]:text-blue-600 [&_a]:underline [&_a]:hover:text-blue-800 [&_strong]:font-bold [&_strong]:text-gray-900 [&_em]:italic [&_blockquote]:border-r-4 [&_blockquote]:border-blue-500 [&_blockquote]:pr-4 [&_blockquote]:italic [&_blockquote]:bg-gray-50 [&_blockquote]:p-4 [&_blockquote]:rounded';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const rawData = await serverFetch<unknown>(`/post/${slug}`, {
    revalidate: STOREFRONT_REVALIDATE.BLOGS,
  });

  const post = mapBlogDetailViewModel(rawData);

  if (!post) {
    throw new Error('خطا در نگاشت داده بلاگ');
  }

  const createdAtLabel = formatBlogDate(post.createdAt);
  const createdAtDateTime = toBlogDateTime(post.createdAt);
  const imageSrc = resolveBlogImageSrc(post.image);

  // Inject heading IDs for table of contents anchor links
  const contentHtml = injectHeadingIds(post.contentHtml);

  // Split content to inject inline related posts after paragraph 3
  const splitContent = splitContentAtParagraph(contentHtml, 3);

  return (
    <div className="mb-30 [direction:rtl] container md:grid grid-cols-4 gap-8 mt-8">
      {/* Sidebar — Table of Contents (desktop) */}
      <aside className="hidden md:block col-span-1 sticky top-24 self-start">
        <TableOfContents html={contentHtml} />
      </aside>

      {/* Main content */}
      <div className="col-span-3">
        <article className="prose prose-lg max-w-none">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
              <span>نویسنده: {post.author.name}</span>
              {post.categoryTitle && (
                <span className="px-2 py-0.5 rounded bg-neutral-100 text-xs">
                  {post.categoryTitle}
                </span>
              )}
              {createdAtLabel && <time dateTime={createdAtDateTime}>{createdAtLabel}</time>}
            </div>
            {post.summary && (
              <p className="text-lg text-gray-700 leading-relaxed mb-6">{post.summary}</p>
            )}
          </header>

          {post.image && (
            <div className="mb-8 relative overflow-hidden rounded-2xl aspect-[16/9]">
              <OptimizedImage
                variant="blog-card"
                src={imageSrc}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Table of Contents — mobile only */}
          <div className="md:hidden">
            <TableOfContents html={contentHtml} />
          </div>

          {/* Article content — with inline related posts if enough paragraphs */}
          {splitContent ? (
            <>
              <div
                className={PROSE_CLASSES}
                dangerouslySetInnerHTML={{ __html: splitContent.before }}
              />
              <InlineRelatedPosts posts={post.similarPosts} />
              <div
                className={PROSE_CLASSES}
                dangerouslySetInnerHTML={{ __html: splitContent.after }}
              />
            </>
          ) : (
            <div
              className={PROSE_CLASSES}
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          )}

          {/* Author box */}
          <div className="mt-10">
            <AuthorBox author={post.author} />
          </div>

          {/* Related posts — end of article */}
          <RelatedPostsSection posts={post.similarPosts} />

          {/* Share */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">اشتراک‌گذاری این مطلب</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
