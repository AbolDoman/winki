import { FC } from 'react';
import ProductAttributeItem from './components/ProductAttributeItem';
import Divider from '@/components/ui/Divider';
import type { ProductAttributeItemProps } from '@/types/product/components/product-detail/components/product-detail-card/components/product-info-card/components/ProductAttributes/types/types';

type ProductAttributesProps = {
  items?: ProductAttributeItemProps[];
};

const ProductAttributes: FC<ProductAttributesProps> = ({ items }) => {
  const list = items ?? [];

  if (list.length === 0) {
    return null;
  }

  return (
    <>
      {list.map((data, index) => (
        <div key={data.id ?? index} className="flex flex-col gap-3">
          <ProductAttributeItem {...data} />
          {index < list.length - 1 && <Divider color="neutral" orientation="horizontal" />}
        </div>
      ))}
    </>
  );
};
export default ProductAttributes;
