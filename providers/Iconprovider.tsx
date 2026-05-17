import { memo, type ComponentType } from 'react';
import {
  Add,
  ArrowDown2,
  ArrowLeft,
  ArrowLeft2,
  ArrowRight,
  ArrowRight2,
  ArrowUp,
  BackSquare,
  BagCross,
  Bill,
  Book1,
  Box,
  BoxTick,
  Calendar,
  Call,
  CardPos,
  Cards,
  CardTick1,
  Category,
  Chart2,
  CloseCircle,
  Colorfilter,
  Convert3DCube,
  Cup,
  DiscountCircle,
  DiscountShape,
  Dislike,
  Edit2,
  EyeSlash,
  Eye,
  Filter,
  Gallery,
  Game,
  Global,
  HamburgerMenu,
  Heart,
  Home,
  Home2,
  InfoCircle,
  Instagram,
  Layer,
  Like1,
  Location,
  Login,
  LogoutCurve,
  MessageQuestion,
  Messages3,
  Minus,
  Moneys,
  More,
  Notepad2,
  Notification,
  NotificationBing,
  NotificationStatus,
  ReceiptDiscount,
  SearchNormal1,
  ShoppingCart,
  Sms,
  Sort,
  Star,
  Star1,
  SunFog,
  TagUser,
  TickCircle,
  TickSquare,
  Timer,
  Trash,
  TrendUp,
  TruckFast,
  TruckTick,
  User,
  UserSquare,
  Wallet2,
  CallOutgoing,
  Whatsapp,
  type IconProps,
} from 'iconsax-reactjs';

type IconVariant = 'Linear' | 'Outline' | 'TwoTone' | 'Bulk' | 'Broken' | 'Bold';

const ICON_COMPONENTS = {
  Add,

  ArrowDown2,
  ArrowLeft,
  ArrowLeft2,
  ArrowRight,
  ArrowRight2,
  ArrowUp,
  BackSquare,
  BagCross,
  Bill,
  Book1,
  Box,
  BoxTick,
  Calendar,
  Call,
  CardPos,
  Cards,
  CardTick1,
  Category,
  Chart2,
  CloseCircle,
  Colorfilter,
  Convert3DCube,
  Cup,
  DiscountCircle,
  DiscountShape,
  Dislike,
  Edit2,
  Filter,
  EyeSlash,
  Eye,
  Gallery,
  Game,
  Global,
  HamburgerMenu,
  Heart,
  Home,
  Home2,
  InfoCircle,
  Instagram,
  Layer,
  Like1,
  Location,
  Login,
  LogoutCurve,
  MessageQuestion,
  Messages3,
  Minus,
  Moneys,
  More,
  Notepad2,
  Notification,
  NotificationBing,
  NotificationStatus,
  ReceiptDiscount,
  SearchNormal1,
  ShoppingCart,
  Sms,
  Sort,
  Star,
  Star1,
  SunFog,
  TagUser,
  TickCircle,
  TickSquare,
  Timer,
  Trash,
  TrendUp,
  TruckFast,
  TruckTick,
  User,
  UserSquare,
  Wallet2,
  CallOutgoing,
  Whatsapp,
} as const;

export type IconsaxIconName = keyof typeof ICON_COMPONENTS;

type CustomIconProps = Omit<IconProps, 'size' | 'color' | 'variant'> & {
  icon: IconsaxIconName | string;
  size?: number | string;
  color?: string;
  variant?: IconVariant;
};

const FALLBACK_ICON: IconsaxIconName = 'CloseCircle';

const IconProvider = memo(function IconProvider({
  icon,
  size = 16,
  color,
  variant,
  className,
  ...props
}: CustomIconProps) {
  const IconComponent = ICON_COMPONENTS[icon as IconsaxIconName] as
    | ComponentType<IconProps>
    | undefined;

  if (!IconComponent) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`Icon "${String(icon)}" not found in iconsax-reactjs`);
    }

    const Fallback = ICON_COMPONENTS[FALLBACK_ICON] as ComponentType<IconProps>;
    return <Fallback size={size} color="red" />;
  }

  return (
    <IconComponent
      {...props}
      size={size}
      color={color ?? 'white'}
      variant={variant}
      className={className ?? 'cursor-pointer'}
    />
  );
});

export default IconProvider;
