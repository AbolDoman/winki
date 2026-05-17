// main
import Image from 'next/image';

const TutorialHero = () => {
  return (
    <>
      <div className="bg-[#E9F3FB] py-12 rounded-xl mt-6 desktop:block hidden">
        <div className="flex flex-col gap-[28px] relative right-[177px]">
          <h1 className="text-[28px] font-bold title-font-bold">
            بستهٔ حرفه‌ای توصیه‌های فروش تلفنی
          </h1>
          <p className="text-[24px]">تاثیرگذاری سریع، کنترل مکالمه و ثبت سفارش فوری</p>
        </div>

        <div>
          <div className="hidden desktop:flex justify-center 2xl:hidden">
            <Image
              className="absolute object-contain top-[300px]"
              src="/tutorial-landing/Vector.svg"
              width={1133}
              height={251}
              alt="line"
            />
          </div>
        </div>

        <div className="relative z-10 left-20 bottom-25">
          <div className="absolute">
            <div className="w-[247px] h-[209px] relative">
              <Image
                className="object-contain absolute size-full"
                src="/tutorial-landing/hero-1.png"
                height={209}
                width={247}
                alt="hero image 1"
                priority={true}
              />
            </div>
          </div>
        </div>
        <div className="relative bottom-42 -right-10 z-10">
          <div className="absolute left-5">
            <div className="w-[356px] h-[289px] relative ">
              <Image
                className="object-contain absolute z-10"
                src="/tutorial-landing/hero-2.png"
                alt="hero image 2"
                width={357}
                height={290}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="block desktop:hidden bg-[#E9F3FB] rounded-2xl pt-[37px] pr-[20px] mt-6 h-[144px]">
        <div className="flex-col flex gap-3 ">
          <h1 className="text-[16px] font-bold title-font-bold">
            بستهٔ حرفه‌ای توصیه‌های فروش تلفنی
          </h1>
          <p className="text-xs">تاثیرگذاری سریع، کنترل مکالمه و ثبت سفارش فوری</p>
        </div>
        <div>
          <Image
            className="absolute object-contain right-7 z-10 top-[105px]"
            src="/tutorial-landing/contact-line-mobile.png"
            width={337}
            height={149}
            alt="line"
          />
        </div>
        <div className="relative z-20 -right-11 -top-31">
          <div className="absolute">
            <div className="w-[96px] h-[81px] relative">
              <Image
                className="object-contain absolute size-full"
                src="/tutorial-landing/hero-1.png"
                height={81}
                width={96}
                alt="hero image 1"
                priority={true}
              />
            </div>
          </div>
        </div>

        <div className="relative right-10">
          <div className="absolute left-8">
            <div className="w-[136px] h-[115px] relative">
              <Image
                className="object-contain absolute"
                src="/tutorial-landing/hero-2.png"
                alt="hero image 2"
                width={357}
                height={290}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorialHero;
