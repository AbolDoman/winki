'use client';

import { useState } from 'react';

function ExpandedSection({ description }: { description: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="sm:block hidden relative mt-3">
      <p
        className={`font-300 leading-7 overflow-hidden ${
          isExpanded ? 'max-h-none' : 'max-h-[140px]'
        }`}
        style={
          !isExpanded
            ? {
                background: 'linear-gradient(189.33deg, #172334 1.39%, #F2F2F2 101.15%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }
            : {}
        }
      >
        {description}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-(--color-brand-600) text-sm mt-2 underline-offset-4 hover:underline cursor-pointer"
      >
        {isExpanded ? 'مشاهده کمتر' : 'مشاهده بیشتر...'}
      </button>
    </div>
  );
}

export default ExpandedSection;
