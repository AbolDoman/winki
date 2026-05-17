import { ProductMainType } from '@/types/product/types/types';

export interface Blog {
  title: string;
  image: string;
  summary?: string;
  slug: string;
  created_at_jalali?: string;
  description?: string;
  registration_date?: string;
  author_name?: string;
}

export interface SliderType {
  image: string;
  url: string;
}

export interface MainPageType {
  output: {
    newest: ProductMainType[];
    slider: SliderType[];
    bestseller: ProductMainType[];
  };
  status: boolean;
}
