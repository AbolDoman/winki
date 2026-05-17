import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'شرایط استفاده | وینکی',
  description: 'شرایط و قوانین استفاده از خدمات فروشگاه آنلاین وینکی',
};

export default function TermsPage() {
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold text-(--color-primary-950) mb-8">شرایط استفاده</h1>
      <div className="prose prose-sm max-w-none text-neutral-700 leading-8 flex flex-col gap-6">
        <section>
          <h2 className="text-lg font-semibold text-(--color-primary-950) mb-3">پذیرش شرایط</h2>
          <p>
            با استفاده از خدمات فروشگاه آنلاین وینکی، شما این شرایط و ضوابط را می‌پذیرید. لطفاً
            پیش از استفاده از سایت، این شرایط را به دقت مطالعه کنید.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-(--color-primary-950) mb-3">حساب کاربری</h2>
          <p>
            برای دسترسی به برخی امکانات، نیاز به ایجاد حساب کاربری دارید. مسئولیت حفظ امنیت
            اطلاعات حساب کاربری شما بر عهده خودتان است.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-(--color-primary-950) mb-3">خرید و پرداخت</h2>
          <p>
            تمامی قیمت‌ها به تومان بوده و شامل مالیات بر ارزش افزوده می‌باشند. وینکی حق تغییر
            قیمت‌ها را بدون اطلاع قبلی برای خود محفوظ می‌دارد.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-(--color-primary-950) mb-3">
            بازگشت و مرجوعی
          </h2>
          <p>
            کالاهای خریداری‌شده تا ۱۰ روز کاری پس از دریافت، در صورت داشتن شرایط بازگشت، قابل
            مرجوعی می‌باشند.
          </p>
        </section>
      </div>
    </div>
  );
}
