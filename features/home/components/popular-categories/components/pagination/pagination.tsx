// main
import { FC } from 'react';
// components
import Button from '@/components/ui/primitives/button/Button';

const Pagination: FC<{ scrollPrev: () => void; scrollNext: () => void }> = ({
  scrollPrev,
  scrollNext,
}) => {
  return (
    <div className="flex gap-3">
      <Button
        variant="icon"
        type="button"
        icon="ArrowRight"
        iconColor="var(--color-brand-600)"
        iconSize={20}
        size="md"
        iconPosition="right"
        onlyIcon
        onClick={scrollPrev}
      />
      <Button
        variant="icon"
        type="button"
        icon="ArrowLeft"
        iconColor="var(--color-brand-600)"
        iconSize={20}
        size="md"
        iconPosition="left"
        onlyIcon
        onClick={scrollNext}
      />
    </div>
  );
};
export default Pagination;
