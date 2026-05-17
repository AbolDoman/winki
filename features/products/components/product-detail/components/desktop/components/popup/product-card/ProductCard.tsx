// main
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const ProductCard: FC<{
  id?: number;
  image: string;
  describtion: string;
  alt: string;
  noShadow?: boolean;
  slug?: string;
}> = ({ image, describtion, slug, alt, noShadow }) => {
  return (
    <Link
      href={`/product/${slug}`}
      className={`w-full rounded-(--radius-m) p-(--padding-ml) ${!noShadow ? 'shadow-[-2px_2px_55px_-1px_rgba(113,113,113,0.12)]' : ''}`}
    >
      <div className="w-full flex items-center gap-4">
        <Image
          src={image}
          alt={alt}
          width={48}
          height={48}
          className="lg:w-[80px] lg:h-[64px] rounded-(--radius-m)"
        />
        <span className="text-body-s lg:text-body-m font-normal text-(--color-primary-950)">
          {describtion}
        </span>
      </div>
    </Link>
  );
};
export default ProductCard;
