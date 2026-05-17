'use client';

import { useMemo, useState } from 'react';
import { extractHeadings } from '../lib/headingUtils';

export default function TableOfContents({ html }: { html: string }) {
  const headings = useMemo(() => extractHeadings(html), [html]);
  const [isOpen, setIsOpen] = useState(true);

  if (headings.length < 2) return null;

  return (
    <nav className="rounded-xl border border-neutral-100 bg-neutral-50 p-4 mb-6">
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex w-full items-center justify-between text-sm font-semibold text-(--color-primary-950)"
      >
        <span>فهرست مطالب</span>
        <span className="text-neutral-400 text-xs">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <ol className="mt-3 flex flex-col gap-1.5">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 3 ? 'mr-4' : ''}>
              <a
                href={`#${h.id}`}
                className="text-sm text-neutral-600 hover:text-(--color-brand-600) transition-colors leading-relaxed"
              >
                {h.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
