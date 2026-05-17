'use client';

import EmblaCarousel from '@/components/ui/primitives/embla-carousel/EmblaCarousel';
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';

const banners = [
  { src: '/images/winki/promo/desktop/banner-desktop1.png', alt: 'بنر تبلیغاتی ۱' },
  { src: '/images/winki/promo/desktop/banner-desktop2.png', alt: 'بنر تبلیغاتی ۲' },
];

const Promo = () => {
  return (
    <>
      {/* Mobile: horizontal slider */}
      <div className="lg:hidden">
        <EmblaCarousel gap="gap-3" options={{ loop: true }}>
          {banners.map((banner) => (
            <div
              key={banner.src}
              className="relative flex-[0_0_85%] h-[160px] rounded-xl overflow-hidden"
            >
              <OptimizedImage
                variant="banner-lg"
                src={banner.src}
                alt={banner.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </EmblaCarousel>
      </div>

      {/* Desktop: side by side */}
      <div className="hidden lg:flex gap-6">
        <div className="relative flex-[2] h-[280px] rounded-xl overflow-hidden">
          <OptimizedImage
            variant="banner-lg"
            src={banners[0].src}
            alt={banners[0].alt}
            fill
            className="object-cover"
          />
        </div>
        <div className="relative flex-1 h-[280px] rounded-xl overflow-hidden">
          <OptimizedImage
            variant="banner-lg"
            src={banners[1].src}
            alt={banners[1].alt}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default Promo;
