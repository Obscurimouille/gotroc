import Header from '@components/common/header';
import { useLocation } from 'react-router-dom';
import OfferSection from '@components/common/offer-section';
import { Offers } from '@data/offers';
import OfferCreatedCard from '@components/common/offer-created-card';
import { Page, PageContent } from '../common/layout';

const HomePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const offerCreated = !!Number(queryParams.get('offer_created'));

  return (
    <Page className='bg-background'>
      <Header />
      <PageContent className="pt-8 gap-8">
        {offerCreated && <OfferCreatedCard />}
        <OfferSection title={"À la une aujourd'hui"} offers={Offers} />
      </PageContent>
    </Page>
  );
};

export default HomePage;
