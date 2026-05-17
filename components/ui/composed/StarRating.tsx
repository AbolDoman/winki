import { FC } from 'react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  color?: string;
  /** Stable prefix to avoid SVG gradient ID collisions between instances */
  id?: string;
}

const STAR_PATH =
  'M11.4416 2.92495L12.9083 5.85828C13.1083 6.26662 13.6416 6.65828 14.0916 6.73328L16.7499 7.17495C18.4499 7.45828 18.8499 8.69162 17.6249 9.90828L15.5583 11.975C15.2083 12.325 15.0166 13 15.1249 13.4833L15.7166 16.0416C16.1833 18.0666 15.1083 18.85 13.3166 17.7916L10.8249 16.3166C10.3749 16.05 9.63326 16.05 9.17492 16.3166L6.68326 17.7916C4.89992 18.85 3.81659 18.0583 4.28326 16.0416L4.87492 13.4833C4.98326 13 4.79159 12.325 4.44159 11.975L2.37492 9.90828C1.15826 8.69162 1.54992 7.45828 3.24992 7.17495L5.90826 6.73328C6.34992 6.65828 6.88326 6.26662 7.08326 5.85828L8.54992 2.92495C9.34992 1.33328 10.6499 1.33328 11.4416 2.92495Z';

const StarIcon: FC<{ size: number; fillPercent: number; color: string; gradientId: string }> = ({
  size,
  fillPercent,
  color,
  gradientId,
}) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id={gradientId}>
        <stop offset={`${fillPercent}%`} stopColor={color} />
        <stop offset={`${fillPercent}%`} stopColor="#E0E0E0" />
      </linearGradient>
    </defs>
    <path
      d={STAR_PATH}
      fill={`url(#${gradientId})`}
      stroke={fillPercent > 0 ? color : '#E0E0E0'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StarRating: FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 20,
  color = '#F98B07',
  id = 'star',
}) => {
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    const diff = rating - i + 1;
    const fillPercent = diff >= 1 ? 100 : diff > 0 ? Math.round(diff * 100) : 0;

    stars.push(
      <StarIcon
        key={i}
        size={size}
        fillPercent={fillPercent}
        color={color}
        gradientId={`${id}-${i}-${fillPercent}`}
      />,
    );
  }

  return <div className="flex items-center gap-1">{stars}</div>;
};

export default StarRating;
