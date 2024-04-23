import OfferResultCard from '../offer/offer-result-card';
import { Separator } from '@components/ui/separator';
import noResultIllustration from '@assets/illustrations/notify.svg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { OfferService } from 'src/services/offer-service';
import { Offer, User } from '@gotroc/types';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@components/ui/skeleton';
import { toast } from 'sonner';

const DashboardOffers = ({ user }: { user: User }) => {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const [userOffers, setUserOffers] = useState<Offer[]>([]);

  useEffect(() => {
    OfferService.getUserOffers(user.id).then((response) => {
      setLoaded(true);
      if (!response.success) return;
      setUserOffers(response.data);
    });
  }, [user]);

  const deleteOffer = (offerId: number) => {
    OfferService.delete(offerId).then((response) => {
      if (!response.success) return toast.error(t('message.offer.delete.error'));
      setUserOffers((offers) => offers.filter((offer) => offer.id !== offerId));
      toast.success(t('message.offer.delete.success'));
    });
  };

  return (
    <div className="flex-1 flex flex-col gap-6 bg-background w-full rounded-xl px-8 py-7 lg:px-10 lg:py-9 shadow">
      <div className="flex items-center gap-3">
        <Separator className="flex-1 bg-neutral-300 md:hidden" />
        <h3 className="font-medium md:text-md">
          {t('page.dashboard.offers.title') + (userOffers.length ? ` (${userOffers.length})` : '')}
        </h3>
        <Separator className="flex-1 bg-neutral-300" />
      </div>
      {loaded ? (
        userOffers.length ? (
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar gap-8">
            {userOffers.map((offer, index) => (
              <OfferResultCard
                key={index}
                offer={offer}
                className="shrink-0 shadow-none border-1 border-neutral-300"
                showStatus
                disableBookmark
                canDelete
                onDelete={() => deleteOffer(offer.id)}
              />
            ))}
          </div>
        ) : (
          <div className="w-full mt-12 flex flex-col items-center">
            <img src={noResultIllustration} className="w-56 max-h-48 mb-10" alt=""></img>
            <p className="text-xl font-semibold">{t('page.dashboard.offers.empty.title')}</p>
            <p className="mt-4">
              <Link to="/create" className="underline hover:text-primary transition-colors">
                {t('page.dashboard.offers.empty.action')}
              </Link>
            </p>
          </div>
        )
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-40 rounded-xl" />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardOffers;
