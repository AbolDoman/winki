import IconProvider from '@/providers/Iconprovider';
import Divider from '@/components/ui/Divider';

interface AddressActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

const AddressActions = ({ onEdit, onDelete }: AddressActionsProps) => {
  return (
    <div className="gap-2 flex justify-end lg:justify-start">
      <button type="button" onClick={onEdit} className="flex gap-1.5 lg:gap-1 items-center">
        <IconProvider
          className="lg:size-[20px] size-[16px]"
          icon="Edit2"
          size={16}
          color="var(--color-primary-950)"
        />
        <span className="text-(--color-primary-950)">ویرایش</span>
      </button>
      <div className="flex gap-2 items-center">
        <div className="h-[20px]">
          <Divider variant="solid" color="neutral" orientation="vertical" />
        </div>
        <button type="button" onClick={onDelete}>
          <IconProvider
            className="lg:size-[20px] size-[16px]"
            icon="Trash"
            size={16}
            color="var(--color-primary-950)"
          />
        </button>
      </div>
    </div>
  );
};

export default AddressActions;
