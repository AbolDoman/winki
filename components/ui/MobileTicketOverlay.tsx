'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Ticket } from '@/types/chat/types/tickets';

interface MobileTicketOverlayProps {
  ticket: Ticket | null;
  onClose: () => void;
}

const STATUS_COLORS = {
  cancelled: 'bg-red-50 text-red-900',
  open: 'bg-novinlife-50 text-novinlife-900',
  in_progress: 'bg-blue-50 text-blue-900',
  waiting: 'bg-green-50 text-green-900',
  closed: 'bg-gray-50 text-gray-900',
} as const;

const MobileTicketOverlay = ({ ticket, onClose }: MobileTicketOverlayProps) => {
  const router = useRouter();

  if (!ticket) return null;

  const getStatusStyles = (status: string) => {
    return STATUS_COLORS[status as keyof typeof STATUS_COLORS] || 'bg-gray-500';
  };

  const getTicketRoute = (ticket: Ticket) => {
    const status = ticket.status === 'closed' ? 'close' : ticket.status;
    return `/profile/support/ticket/${status}/${ticket.id}`;
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50 p-0 md:hidden"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl shadow-2xl w-full h-[80vh] overflow-hidden animate-slide-in-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-novinlife-100">
          <div className="flex justify-between items-center">
            <div className="flex-1 pr-3">
              <h3 className="text-lg font-bold text-novinlife-900 truncate">{ticket.subject}</h3>
              <p className="text-sm text-gray-500 mt-1">شناسه #{ticket.id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/50 rounded-full transition-colors duration-200 flex-shrink-0"
            >
              <Image src="/icons/close-circle-01.svg" alt="close" width={20} height={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Department */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">دپارتمان</div>
            <div className="text-sm font-medium text-gray-900">
              {ticket.department?.name || ticket.department_name || 'نامشخص'}
            </div>
          </div>

          {/* Date */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">تاریخ ثبت</div>
            <div className="text-sm font-medium text-gray-900">
              {new Date(ticket.created_at).toLocaleDateString('fa-IR')}
            </div>
          </div>

          {/* Status */}
          <div className="flex justify-center">
            <div
              className={`px-4 py-2 rounded-lg w-full font-medium ${getStatusStyles(ticket.status)}`}
            >
              {ticket.status === 'open' && 'در انتظار بررسی'}
              {ticket.status === 'in_progress' && 'پیگیری'}
              {ticket.status === 'waiting' && 'پاسخ داده شد'}
              {ticket.status === 'closed' && 'بسته شد'}
              {ticket.status === 'cancelled' && 'لغو شد'}
            </div>
          </div>
          <div className="flex text-base gap-3">
            <button
              onClick={() => {
                router.push(getTicketRoute(ticket));
                onClose();
              }}
              className="flex justify-center items-center w-full h-[40px] border bg-novinlife-400 text-white rounded-lg"
            >
              نمایش تیکت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileTicketOverlay;
