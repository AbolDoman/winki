import IconProvider from '@/providers/Iconprovider';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBox = ({
  value,
  onChange,
  placeholder = 'جستجو',
  className = '',
}: SearchBoxProps) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 pr-10 pl-10 rounded-lg bg-gray-50 border-gray-50 text-sm outline-none focus:outline-none border focus:border-gray-400"
      />
      <IconProvider
        icon="SearchNormal1"
        size={20}
        color="#9CA3AF"
        className="absolute right-3 top-1/2 -translate-y-1/2"
      />
    </div>
  );
};
