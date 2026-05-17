// main
import { Input } from '@/components/ui/primitives/input/Input';
import { ChangeEvent, FC } from 'react';

interface ReviewFormProps {
  comment: string;
  hideUserName: boolean;
  isSubmitting?: boolean;
  onCommentChange: (value: string) => void;
  onHideUserNameChange: (value: boolean) => void;
}

const ReviewForm: FC<ReviewFormProps> = ({
  comment,
  hideUserName,
  isSubmitting = false,
  onCommentChange,
  onHideUserNameChange,
}) => {
  const handleCommentChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onCommentChange(event.target.value);
  };

  const handleHideUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    onHideUserNameChange(event.target.checked);
  };

  return (
    <div>
      <form className="w-full flex flex-col gap-3">
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="review-comment">متن دیدگاه</label>
          <Input
            id="review-comment"
            value={comment}
            hasIcon={false}
            type="textfield"
            size="md"
            state="default"
            disabled={isSubmitting}
            onChange={handleCommentChange}
            placeholder="دیدگاه خود را در مورد این کالا  به اشتراک بگذارید."
            className="w-full placeholder:text-body-m lg:placeholder:text-body-l"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="review-anonymous"
            checked={hideUserName}
            disabled={isSubmitting}
            onChange={handleHideUserNameChange}
            className="cursor-pointer"
          />
          <label
            htmlFor="review-anonymous"
            className="text-body-m lg:text-body-l font-normal text-(--color-primary-950)"
          >
            عدم نمایش نام شما در دیدگاه
          </label>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
