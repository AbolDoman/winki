export const getStatusColor = (slug: string) => {
  switch (slug) {
    case 'delivered':
      return { bg: 'bg-[#D2F9E0]', iconColor: '#079455' };
    case 'processing':
      return { bg: 'bg-[#FFEFC6]', iconColor: '#DD6502' };
    case 'returned':
      return { bg: 'bg-[#E5E7E8]', iconColor: '#656D75' };
    case 'cancelled':
      return { bg: 'bg-[#FFE3E8]', iconColor: '#E71759' };
    default:
      return { bg: 'bg-[#E5E7E8]', iconColor: '#656D75' };
  }
};
