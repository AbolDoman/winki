import { FC } from 'react';

interface Props {
  color?: string;
}

const MinusIcon: FC<Props> = ({ color = '#0A3C63' }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6.91406 11H18.9141V13H6.91406V11Z" fill={color} />
    </svg>
  );
};
export default MinusIcon;
