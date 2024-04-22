import { useNavigate, useParams } from 'react-router-dom';
import { Page, PageContent } from '../common/layout';
import Header from '@components/common/header';
import OfferComponent from '@components/common/offer';
import OfferSection from '@components/common/offer-section';
import { useContext, useEffect, useState } from 'react';
import { OfferService } from 'src/services/offer-service';
import { Offer } from '@gotroc/types';
import { useTranslation } from 'react-i18next';
import { UserContext } from 'src/providers/user-context';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';

const OfferPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const userContext = useContext(UserContext);

  const [loading, setLoading] = useState<boolean>(true);
  const [offer, setOffer] = useState<Offer | null>(null);
  const [recommendedOffers, setRecommendedOffers] = useState<Offer[]>([]);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isAccepted, setIsAccepted] = useState<boolean>(true);
  const [isRejected, setIsRejected] = useState<boolean>(false);

  if (!params || !params.id || isNaN(Number(params.id))) navigate('/');
  const id = Number(params.id);

  useEffect(() => {
    OfferService.get(id).then((response) => {
      if (!response.success) return navigate('/not-found');
      const offer = response.data;
      const isOwner = !!userContext.user && userContext.user.id === offer.authorId;
      setIsOwner(isOwner);
      if (offer.status !== 'ACCEPTED') {
        if (!userContext.user || (!isOwner && !userContext.user.isAdmin)) {
          return navigate('/not-found');
        }
        if (offer.status === 'REJECTED') setIsRejected(true);
        setIsAccepted(false);
      }
      setOffer(offer);
      setRecommendedOffers(offer.recommendations);
      setLoading(false);
    });
  }, [id, userContext.user, navigate]);

  return (
    <Page loading={loading}>
      <Header />
      <PageContent className="py-8 pb-16 gap-8">
        {!isAccepted &&
          (isOwner ? (
            isRejected ? (
              <Alert>
                <AlertTitle>{t('page.offer.rejected-owner.title')}</AlertTitle>
                <AlertDescription>{t('page.offer.rejected-owner.description')}</AlertDescription>
              </Alert>
            ) : (
              <Alert>
                <AlertTitle>{t('page.offer.pending-owner.title')}</AlertTitle>
                <AlertDescription>{t('page.offer.pending-owner.description')}</AlertDescription>
              </Alert>
            )
          ) : isRejected ? (
            <Alert>
              <AlertTitle>{t('page.offer.rejected-admin.title')}</AlertTitle>
              <AlertDescription>{t('page.offer.rejected-admin.description')}</AlertDescription>
            </Alert>
          ) : (
            <Alert>
              <AlertTitle>{t('page.offer.pending-admin.title')}</AlertTitle>
              <AlertDescription>{t('page.offer.pending-admin.description')}</AlertDescription>
            </Alert>
          ))}
        {!!offer && <OfferComponent offer={offer!} />}
        {!!offer && !!recommendedOffers.length && (
          <OfferSection title={t('offer-section.same-category')} offers={recommendedOffers} />
        )}
      </PageContent>
    </Page>
  );
};

export default OfferPage;
