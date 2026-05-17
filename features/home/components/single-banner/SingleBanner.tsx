// main
import { FC } from 'react';
import Link from 'next/link';
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';
// components

const SingleBanner: FC = () => {
  return (
    <section className="w-full container">
      <Link href="#">
        <OptimizedImage
          variant="banner-lg"
          alt="بنر"
          src="/images/winki/promo/banner.svg"
          fill={false}
          width={1200}
          height={400}
          className="w-full h-auto"
        />
      </Link>
    </section>
  );
};
export default SingleBanner;
