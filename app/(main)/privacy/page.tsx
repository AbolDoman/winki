import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'حریم خصوصی | وینکی',
  description: 'سیاست حفاظت از حریم خصوصی کاربران فروشگاه آنلاین وینکی',
};

export default function PrivacyPage() {
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold text-(--color-primary-950) mb-8">قوانین حریم خصوصی</h1>
      <div className="prose prose-sm max-w-none text-neutral-700 leading-8 flex flex-col gap-6">
        <section>
          <h2 className="text-lg font-semibold text-(--color-primary-950) mb-3">
            اطلاعات جمع‌آوری‌شده
          </h2>
          <p>
            وینکی اطلاعاتی مانند نام، شماره تماس، آدرس و اطلاعات پرداخت را برای ارائه خدمات بهتر
            جمع‌آوری می‌کند. این اطلاعات صرفاً برای پردازش سفارشات و بهبود تجربه کاربری استفاده
            می‌شوند.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-(--color-primary-950) mb-3">
            نحوه استفاده از اطلاعات
          </h2>
          <p>
            اطلاعات شما برای پردازش سفارش، ارسال اطلاعیه‌های خرید، و بهبود خدمات ما استفاده
            می‌شود. اطلاعات شما هرگز به اشخاص ثالث فروخته نمی‌شود.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-(--color-primary-950) mb-3">امنیت اطلاعات</h2>
          <p>
            ما از روش‌های استاندارد صنعت برای حفاظت از اطلاعات شما استفاده می‌کنیم. تمامی
            تراکنش‌های مالی از طریق درگاه‌های پرداخت معتبر و امن انجام می‌شوند.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-(--color-primary-950) mb-3">کوکی‌ها</h2>
          <p>
            سایت وینکی از کوکی‌ها برای بهبود تجربه کاربری و حفظ تنظیمات شما استفاده می‌کند. با
            ادامه استفاده از سایت، استفاده از کوکی‌ها را می‌پذیرید.
          </p>
        </section>
      </div>
    </div>
  );
}
