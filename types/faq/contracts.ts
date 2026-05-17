import type { ApiEnvelope } from '@/types/api/contracts';

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export interface FaqListData {
  faqs: FaqItem[];
}

export type FaqListResponse = ApiEnvelope<FaqListData>;
