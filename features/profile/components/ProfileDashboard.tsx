import DashboardStatus from '../ui/DashboardStatus';
import ProfileProductSection from './ProfileProductSection';
import { useHomeData } from '@/store/home-data.store';

const hasItems = <T,>(items: T[] | null | undefined): items is T[] =>
  Array.isArray(items) && items.length > 0;

const ProfileDashboard = () => {
  const homeData = useHomeData();

  return (
    <div>
      <DashboardStatus />
      <div className="flex flex-col lg:gap-6 mt-6">
        {hasItems(homeData?.newest_products) && (
          <ProfileProductSection type="alert" products={homeData.newest_products} />
        )}
        {hasItems(homeData?.most_liked_products) && (
          <ProfileProductSection type="favorite" products={homeData.most_liked_products} />
        )}
        {hasItems(homeData?.bestseller_products) && (
          <ProfileProductSection
            type="repetitive-shopping"
            products={homeData.bestseller_products}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileDashboard;
