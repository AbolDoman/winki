import { formatPersianNumber } from '@/utils/numberFormatter';

const RatingDisplay = ({ rating }: { rating: number }) => {
  return (
    <div className="w-fit lg:w-full text-title-s lg:text-right">
      <b className="font-medium text-title-m lg:text-title-l">{formatPersianNumber(rating)}</b> از{' '}
      {formatPersianNumber(5)}
    </div>
  );
};
export default RatingDisplay;
