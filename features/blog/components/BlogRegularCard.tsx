import Link from 'next/link';
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';
import type { BlogCardPost } from '@/types/post/contracts';
import { resolveBlogImageSrc } from '../lib/postPresentation';

const BlogRegularCard = ({ post }: { post: BlogCardPost }) => {
  const imageSrc = resolveBlogImageSrc(post.image);

  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group block h-[204px] w-[306px] rounded-[16px] relative overflow-hidden"
    >
      <OptimizedImage
        variant="blog-card"
        src={imageSrc}
        alt={post.title}
        fill
        className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
      />
      <div className="absolute h-[72px] bottom-0 w-full">
        <div className="h-full w-full bg-gradient-to-t from-black/20 to-transparent backdrop-blur-xs [mask-image:linear-gradient(to_top,black,transparent)] relative"></div>
        <div className="absolute h-[72px] bottom-0 w-full text-white px-3 flex items-center text-base leading-[160%] bg-linear-to-t from-black/40 to-transparent line-clamp-2">
          {post.title}
        </div>
      </div>
    </Link>
  );
};

export default BlogRegularCard;
