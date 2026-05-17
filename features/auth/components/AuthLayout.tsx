import Image from 'next/image';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-screen overflow-hidden flex">
      {/* Right: scrollable form area */}
      <div className="w-full lg:w-1/2 overflow-y-auto no-scrollbar">
        <div className="min-h-full flex items-center justify-center py-8 px-4">
          <div className="w-[480px] flex flex-col gap-6">
            <div className="flex justify-center lg:justify-start items-center text-2xl gap-2">
              <span className="text-[#656D75] hidden lg:block">آرامش به سبک</span>
              <Image
                src="/images/winki/logo/winki-logo.png"
                width={1681}
                height={491}
                alt="logo"
                className="h-auto w-[97px]"
              />
            </div>

            {children}

            <div className="text-xs">
              با ورود به{' '}
              <Link href="/terms" className="text-(--color-brand-600)">
                وینکی
              </Link>
              ، شما{' '}
              <Link href="/terms" className="text-(--color-brand-600)">
                شرایط استفاده
              </Link>{' '}
              و{' '}
              <Link href="/privacy" className="text-(--color-brand-600)">
                قوانین حریم خصوصی
              </Link>{' '}
              ما را می‌پذیرید.
            </div>
          </div>
        </div>
      </div>

      {/* Left: decorative panel */}
      <div className="hidden lg:flex flex-col bg-[#08C5D2] bg-[url(/images/login-bg.svg)] bg-no-repeat p-[100px] w-1/2 xl:w-[708px] absolute left-0 h-screen">
        <Link href="/" className="flex flex-col gap-[18px] items-center">
          <Image src="/images/winki/logo/white-logo.png" width={205} height={48} alt="Logo" />
          <Image src="/images/winki/button.png" width={205} height={56} alt="Button" />
        </Link>
        <Image
          src="/images/Left-Login.png"
          width={350}
          height={350}
          alt="Login"
          className="object-contain mx-auto"
        />
      </div>
    </div>
  );
}
