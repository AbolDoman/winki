// components/ui/LoadingSpinner.tsx
'use client';

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
  backdrop?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingOverlay: React.FC<LoadingSpinnerProps> = ({
  message = 'درحال دریافت داده',
  fullScreen = true,
  backdrop = true,
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const dotSize = sizeClasses[size];

  const spinnerContent = (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="flex space-x-2">
          <div
            className={`${dotSize} animate-bounce rounded-full bg-[var(--color-brand-600)] [animation-delay:-0.3s]`}
          />
          <div
            className={`${dotSize} animate-bounce rounded-full bg-[var(--color-brand-600)] [animation-delay:-0.15s]`}
          />
          <div className={`${dotSize} animate-bounce rounded-full bg-[var(--color-brand-600)]`} />
        </div>
        {message && <p className="text-sm text-muted-foreground text-center">{message}</p>}
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${backdrop ? 'bg-background/80 backdrop-blur-sm' : 'bg-background'} ${className}`}
      >
        {spinnerContent}
      </div>
    );
  }

  return <div className={`flex items-center justify-center ${className}`}>{spinnerContent}</div>;
};
