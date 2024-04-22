import AdminDashboardOffers from '@components/common/admin/pending-offers';
import AdminSidebar from '@components/common/admin/sidebar';
import Header from '@components/common/header';
import { Page, PageContent } from '@components/common/layout';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from 'src/providers/user-context';

export enum EnumAdminDashboardSection {
  PENDING_OFFERS = 'pending-offers',
}

const AdminPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  let { section } = useParams<{ section: EnumAdminDashboardSection }>();
  if (!section) section = EnumAdminDashboardSection.PENDING_OFFERS;

  useEffect(() => {
    // Redirect to home if user is not an admin
    if (!userContext.user || !userContext.user.isAdmin) return navigate('/');
  }, [userContext.user, navigate]);

  return (
    <Page>
      <Header />
      <PageContent paddingX={0} className='max-w-full flex-1 flex-row'>
        <AdminSidebar activeSection={section} />
        {section === EnumAdminDashboardSection.PENDING_OFFERS && !!userContext.user && (
          <AdminDashboardOffers user={userContext.user} />
        )}
      </PageContent>
    </Page>
  );
};

export default AdminPage;
