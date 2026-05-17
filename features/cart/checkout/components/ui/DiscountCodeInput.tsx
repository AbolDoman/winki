import IconProvider from '@/providers/Iconprovider';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/primitives/button/Button';

const DiscountCodeInput = () => {
  return (
    <div className="px-3 py-4 rounded-xl flex flex-col border border-neutral-100 gap-3 text-sm">
      <div className="text-neutral-600 flex items-center gap-2">
        <IconProvider icon="DiscountCircle" size={20} color="var(--color-neutral-600)" />
        <span>کد تخفیف دارید؟</span>
      </div>

      <div className="flex gap-2 h-full">
        <Input
          placeholder="کد تخفیف"
          className="w-[200px] h-[36px] border border-gray-300 rounded-lg"
        />
        <Button
          size="sm"
          variant="primary"
          className="w-full h-[44px] py-0! px-2! rounded-lg! text-nowrap text-sm!"
        >
          بررسی کد
        </Button>
      </div>
    </div>
  );
};

export default DiscountCodeInput;
