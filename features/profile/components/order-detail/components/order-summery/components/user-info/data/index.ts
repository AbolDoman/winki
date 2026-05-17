import { UserInfoSection } from '@/types/profile/components/order-detail/components/order-summery/components/user-info/types/types';

export const userInfoSections: UserInfoSection[] = [
  {
    id: 0,
    items: [
      { id: 0, label: 'کد پیگیری', value: '۱۳۷۸۸۹۸۶۵۴۳' },
      { id: 1, label: 'تاریخ ثبت سفارش', value: '۱۶ آذر ۱۴۰۴' },
      { id: 2, label: 'استان / شهر', value: 'تهران / تهران' },
    ],
  },
  {
    id: 1,
    items: [
      { id: 3, label: 'تحویل گیرنده', value: 'فاطمه رحیمی' },
      { id: 4, label: 'شماره تماس', value: '۰۹۱۲۳۴۵۶۷۸۹' },
      {
        id: 5,
        label: 'آدرس',
        value: 'خیابان ولیعصر، منطقه ۱۲، بلوار کاوه، کوچه ابوذر، پلاک ۱۵',
      },
    ],
  },
  {
    id: 2,
    items: [
      { id: 6, label: 'مبلغ', value: '۱,۸۰۰,۰۰۰ تومان' },
      { id: 7, label: 'سود شما از خرید', value: '۱۲۰,۰۰۰ تومان' },
      { id: 8, label: 'هزینه ارسال', value: '۴۰,۰۰۰ تومان' },
    ],
  },
];
