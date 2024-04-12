import DashboardFavourites from '@components/common/dashboard/favourites';
import DashboardOffers from '@components/common/dashboard/offers';
import DashboardProfile from '@components/common/dashboard/profile';
import DashboardSettings from '@components/common/dashboard/settings';
import UserPagesSidebar from '@components/common/dashboard/sidebar';
import Header from '@components/common/header';
import { Page, PageContent } from '@components/common/layout';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from 'src/providers/user-context';

export enum EnumDashboardSection {
  PROFILE = 'profile',
  OFFERS = 'offers',
  FAVOURITES = 'favourites',
  SETTINGS = 'settings',
}

const DashboardPage = () => {
  const userContext = useContext(UserContext);
  const { section } = useParams<{ section: EnumDashboardSection }>();

  return (
    <Page className="max-h-dvh">
      <Header />
      <PageContent className="flex-1 flex-row pt-4 pb-4 lg:pt-8 lg:pb-8 gap-4 lg:gap-6">
        <UserPagesSidebar activeSection={section} />
        {section === EnumDashboardSection.PROFILE && !!userContext.user && (
          <DashboardProfile user={userContext.user} />
        )}
        {section === EnumDashboardSection.OFFERS && !!userContext.user && (
          <DashboardOffers user={userContext.user} />
        )}
        {section === EnumDashboardSection.FAVOURITES && !!userContext.user && (
          <DashboardFavourites user={userContext.user} />
        )}
        {section === EnumDashboardSection.SETTINGS && !!userContext.user && (
          <DashboardSettings user={userContext.user} />
        )}
      </PageContent>
    </Page>
  );
};

export default DashboardPage;
