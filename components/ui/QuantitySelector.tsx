import { FC } from 'react';
import IconProvider from '@/providers/Iconprovider';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
}

const QuantitySelector: FC<QuantitySelectorProps> = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center justify-between px-2 lg:px-3 w-full h-[22px] lg:h-[36px] border border-neutral-100 rounded lg:rounded-(--radius-m)">
      <button onClick={onIncrease} type="button" aria-label="افزایش تعداد">
        <IconProvider icon="Add" size={14} color="var(--color-brand-600)" />
      </button>
      <div className="text-body-s lg:text-body-m text-(--color-primary-950)">{quantity}</div>
      <button onClick={onDecrease} type="button" aria-label="کاهش تعداد">
        <IconProvider icon="Minus" size={14} color="var(--color-brand-600)" />
      </button>
    </div>
  );
};

export default QuantitySelector;
