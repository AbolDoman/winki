import IconProvider from '@/providers/Iconprovider';
import { OptimizedImage } from '../../optimized-image/OptimizedImage';
import Link from 'next/link';
import Divider from '../../ui/Divider';

import ScrollToTop from './ScrollToTop';
import ExpandedSection from './ExpandedSection';
import { serverFetch } from '@/lib/server/serverFetch';
import { STOREFRONT_REVALIDATE } from '@/lib/server/storefrontCache';
import { ApiResponse } from '@/types/api';
import { Feature, Settings } from '@/types/ui/footer/types/footer.types';

export const features: Feature[] = [
  {
    id: 1,
    icon: 'TruckTick',
    title: 'ارسال سریع',
    description: 'در کمترین زمان ممکن',
  },
  {
    id: 2,
    icon: 'CardTick1',
    title: 'درگاه پرداخت آنلاین',
    description: 'پرداخت مطمئن و معتبر',
  },
  {
    id: 3,
    icon: 'BackSquare',
    title: 'ضمانت بازگشت کالا',
    description: 'حداکثر تا ۱۰ روز کاری',
  },
  {
    id: 4,
    icon: 'Global',
    title: 'جدیدترین تکنولوژی',
    description: 'مجهز به جدیدترین تکنولوژی روز',
  },
];

const SEO_LINKS = [
  { href: '/', label: 'خانه' },
  { href: '/products', label: 'همه محصولات' },
  { href: '/categories', label: 'دسته‌بندی‌ها' },
  { href: '/blogs', label: 'بلاگ' },
  { href: '/faqs', label: 'سوالات متداول' },
  { href: '/contact', label: 'تماس با ما' },
  { href: '/tutorial', label: 'راهنمای کاربران' },
];

const FALLBACK_SETTINGS: Settings = {
  address: '',
  badges: [],
  description: '',
  email: '',
  favicon: '',
  instagram: '',
  logo: '',
  phone: '',
  telegram: '',
  whatsapp: '',
};

export default async function Footer() {
  let data: Settings = FALLBACK_SETTINGS;

  try {
    const response = await serverFetch<ApiResponse<Settings>>('/home/settings', {
      tags: ['settings'],
      revalidate: STOREFRONT_REVALIDATE.FOOTER_SETTINGS,
    });

    if (response?.data) {
      data = {
        ...FALLBACK_SETTINGS,
        ...response.data,
      };
    }
  } catch {}

  return (
    <footer className="relative w-full bg-neutral-50 mt-8 lg:mt-16 overflow-hidden pb-20 lg:pb-0">
      <div className="absolute top-0 left-0 lg:left-60 h-auto w-60">
        <OptimizedImage
          className="absolute top-0 z-10 w-60"
          variant="logo"
          src="/images/shape.svg"
          alt="shape"
          sizes="240px"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
        <ScrollToTop />
      </div>
      <div className="relative z-10 container pb-6 pt-17.5 lg:pb-8">
        <OptimizedImage
          variant="logo"
          src="/images/winki/logo/winki-logo.png"
          alt="logo"
          width={168}
          height={49}
          sizes="124px"
          className="h-auto w-31"
        />

        <div className="mt-6 flex flex-col lg:flex-row justify-between gap-8">
          <div className="lg:max-w-125">
            <div className="flex flex-col">
              <h2 className="sm:block hidden text-(--color-primary-950) text-lg">درباره وینکی</h2>
              <ExpandedSection description={data?.description} />
              <ul className="mt-6 hidden flex-col gap-2 lg:flex">
                <li className="text-lg">پست الکترونیک: {data.email}</li>
                <li className="text-lg">شماره تماس: {data.phone}</li>
                <li className="flex justify-between gap-5 items-center">
                  <span className="shrink-0 text-lg text-(--color-primary-950)">
                    نشانی: {data.address}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <div className="flex gap-3">
                    {data.instagram && (
                      <Link
                        href={data.instagram}
                        className="px-2 py-1.5 rounded-full bg-(--color-brand-600)"
                      >
                        <IconProvider icon={'Instagram'} size={24} />
                      </Link>
                    )}
                    {data.whatsapp && (
                      <Link
                        href={data.whatsapp}
                        className="px-2 py-1.5 rounded-full bg-(--color-brand-600)"
                      >
                        <IconProvider icon={'Whatsapp'} size={24} />
                      </Link>
                    )}
                  </div>
                </li>
              </ul>
              <div className="mt-6 lg:hidden">
                <div className="mb-3">ارتباط با ما</div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-8 gap-3 flex flex-col">
                  <div className="flex gap-1.5">
                    <IconProvider
                      className="shrink-0"
                      icon="Call"
                      size={24}
                      color="var(--color-neutral-400)"
                    />
                    <span className="text-neutral-400">{data.phone}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <IconProvider
                      className="shrink-0"
                      icon="Sms"
                      size={24}
                      color="var(--color-neutral-400)"
                    />
                    <span className="text-neutral-400">{data.email}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <IconProvider
                      className="shrink-0"
                      icon="Location"
                      size={24}
                      color="var(--color-neutral-400)"
                    />
                    <span className="text-neutral-400">{data.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-3">
            <h3 className="text-(--color-primary-950) text-lg font-medium">دسترسی سریع</h3>
            <ul className="flex flex-col gap-2">
              {SEO_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-500 hover:text-(--color-brand-600) transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:max-w-150 flex flex-col-reverse sm:flex-col gap-8">
            <div className="flex w-full justify-center lg:justify-end gap-4">
              <Link
                className="size-[100px] bg-white rounded-xl flex items-center justify-center shrink-0"
                target="_blank"
                href="https://trustseal.enamad.ir/?id=666918&Code=GqvD1pH1A5nhz5azOGde2TPDLKZLNoy3"
              >
                <img
                  src={'/images/namads/enamad-01.png'}
                  alt="نماد اعتماد الکترونیکی"
                  style={{ cursor: 'pointer' }}
                />
              </Link>
            </div>
            <Divider
              orientation="horizontal"
              variant="solid"
              color="neutral"
              className="sm:hidden"
            />
            <div className="lg:hidden flex items-center flex-col">
              <span>برای دریافت تخفیف های بیشتر ما را دنبال کنید!</span>
              <div className="flex mt-3 gap-3">
                {data.instagram && (
                  <Link
                    href={data.instagram}
                    className="px-2 py-1.5 rounded-full bg-(--color-brand-600)"
                  >
                    <IconProvider icon={'Instagram'} size={24} variant="Bold" color="white" />
                  </Link>
                )}
                {data.whatsapp && (
                  <Link
                    href={data.whatsapp}
                    className="px-2 py-1.5 rounded-full bg-(--color-brand-600)"
                  >
                    <IconProvider icon={'Whatsapp'} size={24} variant="Bold" color="white" />
                  </Link>
                )}
              </div>
            </div>
            <Divider
              orientation="horizontal"
              variant="solid"
              color="neutral"
              className="sm:hidden"
            />
          </div>
        </div>

        <div className="mt-8 bg-white w-full max-w-174 lg:max-w-none py-6 px-4 hidden sm:grid grid-cols-2 sm:rounded-2xl lg:flex lg:justify-center gap-8">
          {features.map((feature) => (
            <div className="flex" key={feature.id}>
              <IconProvider
                size={48}
                variant="Bold"
                icon={feature.icon}
                color="var(--color-brand-600)"
                className="ml-2 lg:size-12 size-8"
              />
              <div className="flex justify-between flex-col gap-1 text-sm">
                <span className="text-(--color-primary-950)">{feature.title}</span>
                <span className="text-neutral-400 lg:inline-block hidden">
                  {feature.description}
                </span>
              </div>
              {feature.id !== 4 ? (
                <div
                  className="w-24 h-0.5 relative top-1/2 bottom-1/2 lg:block hidden"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(to right, #E5E5E5 0, #E5E5E5 8px, transparent 8px, transparent 16px)',
                  }}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-(--color-primary-950) h-10">
        <div className="container flex h-full justify-between items-center text-white">
          <p className="max-w-87 lg:max-w-none sm:text-sm text-[10px]">
            تمامی حقوق مادی و معنوی این وبسایت متعلق به فروشگاه آنلاین وینکی می باشد.
          </p>
          <p className="sm:block hidden">winki.ir {new Date().getFullYear()} copyright</p>
        </div>
      </div>
    </footer>
  );
}
