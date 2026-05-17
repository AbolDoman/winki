export interface SchemaImage {
  '@type': 'ImageObject';
  url: string;
  width?: number;
  height?: number;
}

export interface SchemaAuthor {
  '@type': 'Person' | 'Organization';
  name: string;
  url?: string;
}

export interface SchemaPublisher {
  '@type': 'Organization';
  name: string;
  logo: SchemaImage;
  url?: string;
}

export interface BlogPostingSchema {
  '@context': 'https://schema.org';
  '@type': 'BlogPosting';
  headline: string;
  description?: string;
  image?: string | SchemaImage | SchemaImage[];
  datePublished: string;
  dateModified?: string;
  author: SchemaAuthor;
  publisher: SchemaPublisher;
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
  keywords?: string;
  articleBody?: string;
}

export interface BreadcrumbItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
}

export interface BreadcrumbListSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: BreadcrumbItem[];
}

export interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description?: string;
  contactPoint?: {
    '@type': 'ContactPoint';
    telephone?: string;
    contactType: string;
    email?: string;
  };
  sameAs?: string[];
}

export interface WebSiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  potentialAction?: {
    '@type': 'SearchAction';
    target: {
      '@type': 'EntryPoint';
      urlTemplate: string;
    };
    'query-input': string;
  };
}

export interface CollectionPageSchema {
  '@context': 'https://schema.org';
  '@type': 'CollectionPage';
  name: string;
  description?: string;
  url: string;
  isPartOf?: {
    '@type': 'WebSite';
    name: string;
    url: string;
  };
  mainEntity?: {
    '@type': 'ItemList';
    itemListElement: Array<{
      '@type': 'ListItem';
      position: number;
      url: string;
    }>;
  };
}

export interface ProductSchema {
  '@context': 'https://schema.org';
  '@type': 'Product';
  name: string;
  description?: string;
  image?: string | string[];
  sku?: string;
  brand?: {
    '@type': 'Brand' | 'Organization';
    name: string;
  };
  offers: {
    '@type': 'Offer';
    url: string;
    priceCurrency: string;
    price: string;
    priceValidUntil: string;
    availability: string;
    seller?: {
      '@type': 'Organization';
      name: string;
    };
    hasMerchantReturnPolicy?: {
      '@type': 'MerchantReturnPolicy';
      returnPolicyCategory: string;
      merchantReturnDays?: number;
      returnMethod?: string;
      returnFees?: string;
    };
    shippingDetails?: {
      '@type': 'OfferShippingDetails';
      shippingRate: {
        '@type': 'MonetaryAmount';
        value: string;
        currency: string;
      };
      shippingDestination: {
        '@type': 'DefinedRegion';
        addressCountry: string;
      };
      deliveryTime: {
        '@type': 'ShippingDeliveryTime';
        minValue: number;
        maxValue: number;
        unitCode: string;
      };
    };
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
  review?: Array<{
    '@type': 'Review';
    reviewRating: {
      '@type': 'Rating';
      ratingValue: number;
      bestRating?: number;
      worstRating?: number;
    };
    author: {
      '@type': 'Person';
      name: string;
    };
    reviewBody: string;
    datePublished: string;
  }>;
  additionalProperty?: Array<{
    '@type': 'PropertyValue';
    name: string;
    value: string;
  }>;
}
