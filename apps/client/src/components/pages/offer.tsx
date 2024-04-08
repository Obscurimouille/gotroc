import { useNavigate, useParams } from 'react-router-dom';
import { Page, PageContent } from '../common/layout';
import Header from '@components/common/header';
import { Offers } from '@data/offers';
import Offer from '@components/common/offer';
import OfferSection from '@components/common/offer-section';

const OfferPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  if (!params || !params.id || isNaN(Number(params.id))) navigate('/');
  const id = Number(params.id);
  const offer = Offers.find((offer) => offer.id === id)!;
  if (!offer) navigate('/');
  const recommendedOffers = Offers.filter(
    (o) => o.category === offer.category && o.id !== offer.id,
  );

  return (
    <Page>
      <Header />
      <PageContent className='py-8 pb-16 gap-8'>
        <Offer offer={offer!} />
        {!!recommendedOffers.length && (
          <OfferSection title={'Dans la même catégorie'} offers={recommendedOffers} />
        )}
      </PageContent>
    </Page>
  );
};

export default OfferPage;
