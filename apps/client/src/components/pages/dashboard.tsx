import DashboardFavourites from '@components/common/dashboard/favourites';
import DashboardOffers from '@components/common/dashboard/offers';
import DashboardProfile from '@components/common/dashboard/profile';
import DashboardSettings from '@components/common/dashboard/settings';
import UserPagesSidebar from '@components/common/dashboard/sidebar';
import Header from '@components/common/header';
import { Page, PageContent } from '@components/common/layout';
import { useParams } from 'react-router-dom';

export enum EnumDashboardSection {
  PROFILE = 'profile',
  OFFERS = 'offers',
  FAVOURITES = 'favourites',
  SETTINGS = 'settings',
}

const DashboardPage = () => {
  const { section } = useParams<{ section: EnumDashboardSection }>();
  const userId = 1;

  return (
    <Page className="max-h-dvh">
      <Header />
      <PageContent className="flex-1 flex-row pt-4 pb-4 lg:pt-8 lg:pb-8 gap-4 lg:gap-6">
        <UserPagesSidebar activeSection={section} />
        {section === EnumDashboardSection.PROFILE && <DashboardProfile userId={userId} />}
        {section === EnumDashboardSection.OFFERS && <DashboardOffers userId={userId} />}
        {section === EnumDashboardSection.FAVOURITES && <DashboardFavourites userId={userId} />}
        {section === EnumDashboardSection.SETTINGS && <DashboardSettings userId={userId} />}
      </PageContent>
    </Page>
  );
};

export default DashboardPage;
