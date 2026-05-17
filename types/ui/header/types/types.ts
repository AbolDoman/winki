export type CategoryHeader = {
  type: 'category';
  items: {
    id: number;
    name: string;
    slug: string;
    children_minimal: {
      name: string;
      slug: string;
      parent_id: number;
    }[];
  };
};

export type TextHeader = {
  type: 'text';
  link: string;
  title: string;
};

export type HeaderType = CategoryHeader | TextHeader;

export type CompanyType =
  | undefined
  | {
      status: boolean;
      output: {
        header: HeaderType[];
        footer?: unknown;
        theme: string;
      };
    };
