import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';
import IconProvider from '@/providers/Iconprovider';
import type { BlogCardProps } from '@/types/home/components/blogs/types/types';
import { BASE_URL } from '@/utils/baseConfig';
import Link from 'next/link';

const PLACEHOLDER_IMAGE = '/placeholder.png';

function resolveBlogImageSrc(image?: string | null) {
  if (!image) return PLACEHOLDER_IMAGE;
  if (image.startsWith('http')) return image;

  return `${BASE_URL}/storage/${image}`;
}

function resolveCategoryTitle(category: BlogCardProps['post']['category']) {
  return typeof category === 'string' ? category : category?.title;
}

type MetaRowProps = {
  icon: 'Calendar' | 'Layer' | 'UserSquare';
  text: string | undefined;
};

const MetaRow = ({ icon, text }: MetaRowProps) => (
  <div className="flex items-center gap-2">
    <IconProvider icon={icon} color="var(--color-neutral-400)" size={20} />
    <span className="text-body-m text-(--color-neutral-400) font-normal">{text}</span>
  </div>
);

const BlogCard = ({ post, model }: BlogCardProps) => {
  const imageUrl = resolveBlogImageSrc(post.image);
  const categoryTitle = resolveCategoryTitle(post.category);

  const isHorizontal = model === 'horizontal';
  const isMain = Boolean(post.isMain);

  const containerClassName = [
    'h-full group overflow-hidden shadow-[0px_2px_55px_rgba(113,113,113,0.12)] rounded-(--radius-m) lg:rounded-(--radius-ml)',
    isMain ? 'h-[424px]' : 'h-auto',
    isHorizontal ? 'lg:flex lg:items-center' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const imageClassName = [
    'w-full min-h-48 max-h-64 lg:h-[-webkit-fill-available] object-cover transition-transform duration-300 ease-out group-hover:scale-105',
    isHorizontal
      ? 'rounded-tl-[8px] rounded-tr-[8px] lg:w-60 lg:rounded-tr-xl lg:rounded-tl-none lg:rounded-br-xl'
      : 'rounded-t-[8px] lg:rounded-t-(--radius-base) lg:w-[420px]',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Link href={`/blogs/${post?.slug}`} className={containerClassName}>
      <OptimizedImage
        variant="blog-card"
        src={imageUrl}
        alt={post.title}
        className={imageClassName}
      />

      {/* Content */}
      <div className="py-(--padding-ml) px-[var(--padding-base)] flex flex-col gap-3">
        {/* Header: Date+Category on mobile, Author on desktop */}
        <div className="flex items-center justify-between lg:hidden">
          <MetaRow icon="Calendar" text={post.date} />
          <MetaRow icon="Layer" text={categoryTitle} />
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-2">
          <MetaRow icon="UserSquare" text={post.author} />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-body-m lg:text-body-l text-(--color-primary-950)">
            {post.title}
          </h3>
          <p className="hidden lg:block lg:text-body-s lg:text-(--color-primary-800) lg:font-normal lg:text-justify">
            {post.description}
          </p>
        </div>

        <div className="lg:hidden">
          <MetaRow icon="UserSquare" text={post.author} />
        </div>

        <div className="hidden lg:flex lg:items-center lg:justify-between">
          <MetaRow icon="Calendar" text={post.date} />
          <MetaRow icon="Layer" text={categoryTitle} />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
