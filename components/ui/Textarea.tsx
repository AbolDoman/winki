'use client';

interface TextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  rows?: number;
  error?: boolean;
}

export const Textarea = ({
  placeholder = '',
  value,
  onChange,
  disabled = false,
  rows = 4,
  error = false,
}: TextareaProps) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      className={`w-full bg-white border text-sm desktop:text-[16px] leading-7 rounded-[10px] px-[15px] py-3 text-right text-novinlife-900 focus:outline-none transition-colors placeholder:text-sm desktop:placeholder:text-[16px] placeholder:text-gray-400 focus:border-novinlife-400 focus:placeholder:text-novinlife-900 data-[filled=true]:border-novinlife-400 data-[filled=true]:placeholder:text-novinlife-900 resize-none ${error ? 'border-red-500' : 'border-gray-300'}`}
      data-filled={value ? 'true' : 'false'}
    />
  );
};
