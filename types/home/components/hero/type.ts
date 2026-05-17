export interface OffersData {
  id?: number;
  title: string;
  slug: string;
  image: string;
  score?: number;
  price: number;
  discount?: number;
  discounted_price?: number;
  sold_count?: number;
}

export interface BannerOfferData {
  image: string;
  title?: string;
  link?: string;
}

export interface OffersProps {
  offersData?: OffersData[];
  type?: 'instant' | 'special' | 'banner';
  bannerData?: BannerOfferData;
}

type ThemeType = 'classic' | 'modern';

export interface SliderType {
  id: number;
  image: string;
  url: string;
  title?: string;
  subtitle?: string;
}

export interface SliderProps {
  theme: ThemeType;
  slides: SliderType[];
}
