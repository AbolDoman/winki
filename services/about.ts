import Api from '@/lib/axios';

export const getCompanyInfo = async () => {
  const result = await Api.get('/company-info').then((response) => response.data);
  return result;
};

// acordion
export interface AccordionAboutUsProps {
  item: {
    question: string;
    answer: string;
  };
}
