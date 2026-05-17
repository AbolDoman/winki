import type { BlogPostsPagination } from '@/types/post/contracts';
import BlogMobileSlider from './BlogMobileSlider';
import BlogRegularCard from './BlogRegularCard';
import BlogShowcaseCard from './BlogShowcaseCard';

const BlogsPageHero = ({ posts }: { posts: BlogPostsPagination }) => {
  if (posts.data.length === 0) return null;

  const showcasePost = posts.data.find((post) => post.isReview) ?? posts.data[0];
  const regularPosts = posts.data.filter((post) => post.id !== showcasePost?.id).slice(0, 4);

  return (
    <section className="mt-8">
      <div className="hidden lg:block container">
        <div className="flex gap-5.5">
          {showcasePost && <BlogShowcaseCard post={showcasePost} />}
          <div className="shrink-0 grid grid-cols-2 gap-y-[22px] gap-x-6">
            {regularPosts.map((post) => (
              <BlogRegularCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>

      <div className="lg:hidden container">
        <BlogMobileSlider posts={posts.data} />
      </div>
    </section>
  );
};

export default BlogsPageHero;
