type Props = {
  color?: string;
  width?: number | string;
  height?: number | string;
};

const ArrowLeft: React.FC<Props> = ({ color = '#3D3D3D', width = 24, height = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ stroke: `var(--fillg, ${color})` }}
      />
    </svg>
  );
};

export default ArrowLeft;
