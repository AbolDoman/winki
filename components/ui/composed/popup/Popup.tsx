// components
import MobileSubHeader from '@/features/products/components/product-detail/components/mobile/ui/mobile-subheader/SubHeader';

interface PopupProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
}

const Popup = ({ title, children, onClose }: PopupProps) => {
  return (
    <div className="w-full lg:w-145.75 rounded-(--radius-base) border border-[#CCD0D5] bg-(--brightens-800) shadow-lg">
      <div className="w-full bg-(--brightens-800) rounded-tl-(--radius-base) rounded-tr-(--radius-base) flex items-center justify-between px-[var(--padding-base)] py-(--padding-sm) border-b border-b-[#CCD0D5]">
        <MobileSubHeader
          start={
            <span className="text-title-s font-medium text-(--color-primary-950)">{title}</span>
          }
          end={
            <button
              type="button"
              aria-label="close popup"
              className="text-[12px] text-neutral-400 cursor-pointer"
              onClick={onClose}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.75 0.75L0.75 10.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M0.75 0.75L10.75 10.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          }
        />
      </div>
      <div className="p-(--padding-base)">{children}</div>
    </div>
  );
};

export default Popup;
