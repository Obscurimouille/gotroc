import Header from '@components/common/header';
import { useLocation } from 'react-router-dom';
import OfferSection from '@components/common/offer-section';
import OfferCreatedCard from '@components/common/offer-created-card';
import { Page, PageContent } from '../common/layout';
import { useState } from 'react';
import { OfferService } from 'src/services/offer-service';

const HomePage = () => {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const queryParams = new URLSearchParams(location.search);
  const offerCreated = !!Number(queryParams.get('offer_created'));

  const [recommendedOffers, setRecommendedOffers] = useState([]);

  useState(() => {
    OfferService.getAll().then((response) => {
      if (!response.success) return;
      setRecommendedOffers(response.data);
      setLoading(false);
    });
  });

  return (
    <Page className='bg-background' loading={loading}>
      <Header />
      <PageContent className="pt-8 gap-8">
        {offerCreated && <OfferCreatedCard />}
        <OfferSection title={"À la une aujourd'hui"} offers={recommendedOffers} />
      </PageContent>
    </Page>
  );
};

export default HomePage;
