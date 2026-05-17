export interface FeaturesProps {
  features: Feature[];
  sign: boolean;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  underText?: string;
}

export interface IFraimVideoProps {
  link: string;
}

export interface VideoProps {
  url: string;
}

export interface MessageCardProps {
  blueText: string;
  orangeText: string;
}
export interface TextSectionProps {
  title: string;
  children: React.ReactNode | React.ReactElement;
}

// accordion
export interface AccordionProps {
  title: string;
  children: React.ReactElement;
  sign: boolean;
  underText?: string;
  ifraim_video_url?: string;
  video_url?: string;
}
