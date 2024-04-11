import { useNavigate, useParams } from 'react-router-dom';
import { Page, PageContent } from '../common/layout';
import Header from '@components/common/header';
import OfferComponent from '@components/common/offer';
import OfferSection from '@components/common/offer-section';
import { useEffect, useState } from 'react';
import { OfferService } from 'src/services/offer.service';
import { Offer } from '@gotroc/types';

const OfferPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [offer, setOffer] = useState<Offer | null>(null);
  const [recommendedOffers, setRecommendedOffers] = useState<Offer[]>([]);

  if (!params || !params.id || isNaN(Number(params.id))) navigate('/');
  const id = Number(params.id);

  useEffect(() => {
    OfferService.get(id).then((response) => {
      if (!response.success) return;
      setTimeout(() => {
        setOffer(response.data);
        setRecommendedOffers(response.data.recommendations);
        setLoading(false);
      }, 1000);
    });
  }, [id]);

  return (
    <Page loading={loading}>
      <Header />
      <PageContent className="py-8 pb-16 gap-8">
        {!!offer && <OfferComponent offer={offer!} />}
        {!!offer && !!recommendedOffers.length && (
          <OfferSection title={'Dans la même catégorie'} offers={recommendedOffers} />
        )}
      </PageContent>
    </Page>
  );
};

export default OfferPage;
