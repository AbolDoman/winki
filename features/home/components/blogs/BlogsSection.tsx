import { FC } from 'react';
import { blogPostsProps } from '@/types/home/components/blogs/types';
import SectionHeader from '@/components/ui/SectionHeader';
import BlogCard from './BlogCard';
import BlogsSkeleton from './BlogsSkeleton';

interface BlogsSectionProps {
  posts: blogPostsProps[];
  isLoading?: boolean;
}

const BlogsSection: FC<BlogsSectionProps> = ({ posts, isLoading = false }) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  const sortedPosts = [...posts].sort((a, b) => (b.order ?? 0) - (a.order ?? 0)).slice(0, 3);

  const mainPost = sortedPosts[0];
  const otherPosts = sortedPosts.slice(1);

  return (
    <section className="container flex flex-col gap-6">
      <SectionHeader href="/blogs" title="بلاگ ها" icon="Notepad2" />
      {isLoading ? (
        <BlogsSkeleton />
      ) : (
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 ">
            <BlogCard post={mainPost} isMain={true} model="vertical" />
          </div>
          <div className="grid gap-6 lg:grid-rows-2 lg:col-span-8">
            {otherPosts.map((post) => (
              <BlogCard post={post} key={post.id} isMain={false} model="horizontal" />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogsSection;
