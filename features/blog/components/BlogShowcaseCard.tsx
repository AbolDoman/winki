import Link from 'next/link';
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';
import IconProvider from '@/providers/Iconprovider';
import type { BlogCardPost } from '@/types/post/contracts';
import { formatBlogDate, resolveBlogImageSrc } from '../lib/postPresentation';

const BlogShowcaseCard = ({ post }: { post: BlogCardPost }) => {
  const imageSrc = resolveBlogImageSrc(post.image);
  const createdAtLabel = formatBlogDate(post.createdAt);

  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group block w-full h-[432px] rounded-[16px] relative overflow-hidden"
    >
      <OptimizedImage
        variant="blog-card"
        src={imageSrc}
        alt={post.title}
        fill
        className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
      />
      <div className="absolute h-[140px] bottom-0 w-full">
        <div className="h-full w-full bg-gradient-to-t from-black/20 to-transparent backdrop-blur-xl mask-[linear-gradient(to_top,black,transparent)] relative"></div>
        <div className="absolute h-[140px] py-4 px-6 bottom-0 w-full text-white flex text-base leading-[160%] bg-linear-to-t from-black/40 to-transparent">
          <div className="flex flex-col w-full justify-between">
            <div className="flex text-sm! gap-2">
              <IconProvider icon="UserSquare" color="white" size={20} />
              <span>{post.authorName}</span>
            </div>
            <h2 className="text-xl line-clamp-1">{post.title}</h2>
            <div className="flex text-sm! justify-between items-center gap-4">
              {createdAtLabel ? (
                <div className="flex gap-2 items-center">
                  <span>{createdAtLabel}</span>
                  <IconProvider icon="Calendar" color="white" size={20} />
                </div>
              ) : (
                <span />
              )}
              {post.categoryTitle ? (
                <div className="flex gap-2 items-center">
                  <span>{post.categoryTitle}</span>
                  <IconProvider icon="Layer" color="white" size={20} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogShowcaseCard;
