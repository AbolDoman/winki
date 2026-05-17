import { ReactNode } from 'react';
import { ProfilePage, PROFILE_PAGES } from './types';

import ProfileDashboard from '../components/ProfileDashboard';
import AddresSection from '../components/AddresSection';
import OrderHistory from '../components/order-detail/components/order-history/OrderHistory';
import Favorites from '../components/Favorites';
import AccountProfile from '../components/AccountProfile';

type PageComponent = () => ReactNode;

export const PAGE_COMPONENT_REGISTRY: Record<ProfilePage, PageComponent> = {
  [PROFILE_PAGES.DASHBOARD]: () => <ProfileDashboard />,

  [PROFILE_PAGES.ORDERS]: () => <OrderHistory />,

  [PROFILE_PAGES.WALLET]: () => <div>Wallet Content</div>,

  [PROFILE_PAGES.FAVORITES]: () => <Favorites />,

  [PROFILE_PAGES.NOTIFICATIONS]: () => <div>Notifications Content</div>,

  [PROFILE_PAGES.COMMENTS]: () => <div>Comments Content</div>,

  [PROFILE_PAGES.ACCOUNT]: () => <AccountProfile />,

  [PROFILE_PAGES.MESSAGES]: () => <div>Messages Content</div>,

  [PROFILE_PAGES.ADDRESSES]: () => <AddresSection />,
};

/**
 * Get the component for a given profile page
 * This function is safe and always returns a valid component
 *
 * @param page - ProfilePage to render
 * @returns React component
 */
export function getPageComponent(page: ProfilePage): ReactNode {
  const componentFn = PAGE_COMPONENT_REGISTRY[page];

  if (!componentFn) {
    console.error(`[PageRegistry] No component registered for page: ${page}`);
    // Fallback to dashboard
    return PAGE_COMPONENT_REGISTRY[PROFILE_PAGES.DASHBOARD]();
  }

  return componentFn();
}
