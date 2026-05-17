import Accordion from '@/components/ui/Accordion';
import type { FaqItem } from '@/types/faq/contracts';

export async function Faqs({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="container min-h-screen">
      {faqs.length > 0 && (
        <div className="flex flex-col gap-3 mt-8 desktop:mb-24 mb-28">
          <h2 className="text-[#3D3D3D] font-bold text-[18px] lg:text-[24px] title-font-bold mb-4">
            سوالات متداول
          </h2>

          {faqs.map((item, index) => (
            // <Accordion title={item.question} sign={false} key={index}>
            <Accordion title={item.question} key={index}>
              <div
                className="leading-[180%] text-xs desktop:text-2xl"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </Accordion>
          ))}
        </div>
      )}
    </div>
  );
}

export default Faqs;

// 'use client';

// import { useEffect, useState } from 'react';
// import clsx from 'clsx';

// // api
// import { getCompanyInfo } from '@/services/about';
// import { getBasicInformation } from '@/services/basicInformation';
// import Accordion from '@/components/ui/Accordion';

// // components

// type BasicInfoResponse = {
//   output?: {
//     theme?: 'classic' | 'modern' | string;
//   };
// };

// type CompanyInfoResponse = {
//   data?: {
//     about_us?: {
//       about_text?: string;
//       company?: {
//         title?: string;
//       };
//     };
//     faqs?: Array<{ question: string; answer: string }>;
//   };
// };

// const Faqs = () => {
//   const [basicInfoData, setBasicInfoData] = useState<BasicInfoResponse | null>(null);
//   const [companyData, setCompanyData] = useState<CompanyInfoResponse | null>(null);

//   useEffect(() => {
//     let cancelled = false;

//     const fetchData = async () => {
//       try {
//         const [basicInfoRes, companyInfoRes] = await Promise.all([
//           getBasicInformation(),
//           getCompanyInfo(),
//         ]);

//         if (!cancelled) {
//           setBasicInfoData(basicInfoRes as BasicInfoResponse);
//           setCompanyData(companyInfoRes as CompanyInfoResponse);
//         }
//       } catch (error) {
//         console.error('[Faqs Fetch Error]', error);
//       }
//     };

//     fetchData();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const theme = basicInfoData?.output?.theme || 'classic';

//   const aboutText = companyData?.data?.about_us?.about_text || '';
//   const aboutTitle = companyData?.data?.about_us?.company?.title || '';
//   const faqs: Array<{ question: string; answer: string }> = companyData?.data?.faqs || [];

//   return (
//     <div className="container min-h-screen">
//       <h1
//         className={clsx(
//           theme === 'classic' && 'classic-about-title',
//           theme === 'modern' && 'modern-about-title',
//         )}
//       >
//         درباره {aboutTitle}
//       </h1>

//       <div className="desktop:mt-4 mt-2">
//         <p className="leading-[180%] text-xs desktop:text-2xl">{aboutText}</p>
//       </div>

//       {faqs.length > 0 && (
//         <div className="flex flex-col gap-3 mt-8 desktop:mb-24 mb-28">
//           <h2 className="text-[#3D3D3D] font-bold text-[18px] lg:text-[24px] title-font-bold mb-4">
//             سوالات متداول
//           </h2>

//           {faqs.map((item, index) => (
//             // <Accordion title={item.question} sign={false} key={index}>
//             <Accordion title={item.question} key={index}>
//               <p className="leading-[180%] text-xs desktop:text-2xl">{item.answer}</p>
//             </Accordion>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Faqs;
