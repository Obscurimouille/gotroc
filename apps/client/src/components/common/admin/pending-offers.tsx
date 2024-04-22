import OfferResultCard from '../offer-result-card';
import { Separator } from '@components/ui/separator';
import coffeeIllustration from '@assets/illustration_coffee.svg';
import { useEffect, useState } from 'react';
import { OfferService } from 'src/services/offer-service';
import { Offer, User } from '@gotroc/types';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@components/ui/skeleton';

const AdminDashboardOffers = ({ user }: { user: User }) => {
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

  return (
    <div className="flex-1 flex flex-col gap-6 w-full px-8 py-7 lg:px-10 lg:py-9">
      <div className="flex items-center gap-3">
        <Separator className="flex-1 bg-neutral-300 md:hidden" />
        <h3 className="font-medium md:text-md">
          {t('page.admin-dashboard.pending-offers.title') + (userOffers.length ? ` (${userOffers.length})` : '')}
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
                disableBookmark
              />
            ))}
          </div>
        ) : (
          <div className="w-full mt-12 flex flex-col items-center">
            <img src={coffeeIllustration} className="bg-background rounded-full w-56 h-56 mb-16" alt=""></img>
            <p className="text-xl font-semibold">{t('page.admin-dashboard.pending-offers.empty')}</p>
          </div>
        )
      ) : (
        <div className='flex-1 flex flex-col overflow-hidden gap-8'>
          {
            Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-40 rounded-xl" />
            ))
          }
        </div>
      )}
    </div>
  );
};

export default AdminDashboardOffers;
