import IconProvider from '@/providers/Iconprovider';
import { Address } from '@/types/profile/types';
import AddressActions from './AddressActions';
import Divider from '@/components/ui/Divider';

interface AddresCardProps {
  address: Address;
  onEdit?: (address: Address) => void;
  onDelete?: (addressId: number) => void;
}

const AddresCard = ({ address, onEdit, onDelete }: AddresCardProps) => {
  return (
    <div
      className={`bg-white border border-neutral-100 lg:border-neutral-50 rounded-lg p-4 flex lg:flex-row flex-col justify-between ${address.isDefault === true && ''}`}
    >
      <div className="flex flex-col gap-2">
        <div className="text-(--colorprimary-950) lg:text-lg">{address.address}</div>
        <div className="grid grid-cols-2 gap-y-2 text-neutral-400">
          <div className="flex gap-2 items-center min-w-[112px] lg:text-sm text-xs">
            <IconProvider
              icon="Location"
              size={16}
              className="lg:size-[20px] size-[16px]"
              color="var(--color-neutral-400)"
            />
            <span>{address.city}</span>
          </div>
          <div className="flex gap-2 items-center min-w-[112px] lg:text-sm text-xs">
            <IconProvider
              icon="Location"
              size={16}
              className="lg:size-[20px] size-[16px]"
              color="var(--color-neutral-400)"
            />
            <span>{address.postalCode}</span>
          </div>
          <div className="flex gap-2 items-center min-w-[112px] lg:text-sm text-xs">
            <IconProvider
              icon="Location"
              size={16}
              className="lg:size-[20px] size-[16px]"
              color="var(--color-neutral-400)"
            />
            <span>{address.phone}</span>
          </div>
          <div className="flex gap-2 items-center min-w-[112px] lg:text-sm text-xs">
            <IconProvider
              icon="Location"
              size={16}
              className="lg:size-[20px] size-[16px]"
              color="var(--color-neutral-400)"
            />
            <span>{address.recipientName}</span>
          </div>
        </div>
      </div>
      <Divider
        orientation="horizontal"
        variant="solid"
        color="neutral"
        className="lg:hidden block my-2"
      />
      <AddressActions onEdit={() => onEdit?.(address)} onDelete={() => onDelete?.(address.id)} />
    </div>
  );
};

export default AddresCard;
