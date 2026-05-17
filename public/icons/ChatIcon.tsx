'use client';
import { FC, useEffect, useState } from 'react';

interface ChatIconProps {
  className?: string;
}

const ChatIcon: FC<ChatIconProps> = ({ className = '' }) => {
  const [isChatLoaded, setIsChatLoaded] = useState(false);

  useEffect(() => {
    // Check if Leado chat is already loaded
    const checkChatLoaded = () => {
      if (window.leadochat) {
        setIsChatLoaded(true);
      } else {
        // Retry after a short delay
        setTimeout(checkChatLoaded, 500);
      }
    };

    // Start checking after a short delay to allow script to load
    const timer = setTimeout(checkChatLoaded, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleChatClick = () => {
    if (window.leadochat && window.leadochat.open) {
      window.leadochat.open();
    } else {
      // Fallback: try to trigger the chat widget
      const chatWidget = document.querySelector('#leado-chat-widget');
      if (chatWidget) {
        (chatWidget as HTMLElement).click();
      }
    }
  };

  return (
    <button
      onClick={handleChatClick}
      className={`
        fixed bottom-6 left-6 z-50
        w-14 h-14 bg-blue-600 hover:bg-blue-700
        rounded-full shadow-lg hover:shadow-xl
        flex items-center justify-center
        transition-all duration-300 ease-in-out
        hover:scale-110 active:scale-95
        ${isChatLoaded ? 'opacity-100' : 'opacity-70'}
        ${className}
      `}
      title="چت آنلاین"
      aria-label="چت آنلاین"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
      >
        <path
          d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z"
          fill="currentColor"
        />
        <path d="M7 9H17V11H7V9ZM7 12H15V14H7V12Z" fill="currentColor" />
      </svg>

      {/* Online indicator */}
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
    </button>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    leadochat?: {
      open: () => void;
      close: () => void;
    };
  }
}

export default ChatIcon;
