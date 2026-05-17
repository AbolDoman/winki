'use client';

import { useState, ReactNode } from 'react';
import IconProvider from '@/providers/Iconprovider';

interface AccordionProps {
  title: string | ReactNode;
  children?: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  onToggle?: (isOpen: boolean) => void;
}

const Accordion = ({
  title,
  children,
  defaultOpen = false,
  className = '',
  onToggle,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.(newState);
  };

  return (
    <div className={`border-b border-gray-200 pb-4 ${className}`}>
      <button
        onClick={handleToggle}
        className="w-full flex items-center cursor-pointer justify-between text-right"
      >
        <span>{title}</span>
        <IconProvider
          icon="ArrowDown2"
          size={20}
          color="#000"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[600px] mt-4' : 'max-h-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
