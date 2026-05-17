import React from 'react';

export interface MobileSubheaderProps {
  /**
   * Accepts icon tokens, text, or components. Arrays allow combinations like icon+text or two icons.
   */
  start?: React.ReactNode | React.ReactNode[];
  /**
   * Center slot (kept for future use). Usually blank for current designs.
   */
  center?: React.ReactNode;
  /**
   * Accepts icon tokens or components; arrays allow multiple trailing icons.
   */
  end?: React.ReactNode | React.ReactNode[];
  className?: string;
  sticky?: boolean;
}
