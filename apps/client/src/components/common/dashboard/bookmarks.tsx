import OfferResultCard from '../offer/offer-result-card';
import { Separator } from '@components/ui/separator';
import bookmarkIllustration from '@assets/illustrations/love.svg';
import { Offer, User } from '@gotroc/types';
import { useEffect, useState } from 'react';
import { OfferService } from 'src/services/offer-service';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@components/ui/skeleton';

const DashboardBookmarks = ({ user }: { user: User }) => {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const [bookmarks, setBookmarks] = useState<Offer[]>([]);

  useEffect(() => {
    OfferService.getBookmarks().then((response) => {
      setLoaded(true);
      if (!response.success) return;
      setBookmarks(response.data);
    });
  }, [user]);

  return (
    <div className="flex-1 flex flex-col gap-6 bg-background w-full rounded-xl px-8 py-7 lg:px-10 lg:py-9 shadow">
      <div className="flex items-center gap-3">
        <Separator className="flex-1 bg-neutral-300 md:hidden" />
        <h3 className="font-medium md:text-md">
          {t('page.dashboard.bookmarks.title') + (bookmarks.length ? ` (${bookmarks.length})` : '')}
        </h3>
        <Separator className="flex-1 bg-neutral-300" />
      </div>
      {loaded ? (
        bookmarks.length ? (
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar gap-8">
            {bookmarks.map((offer, index) => (
              <OfferResultCard
                key={index}
                offer={{ ...offer, bookmarked: true }}
                className="shrink-0 shadow-none border-1 border-neutral-300"
              />
            ))}
          </div>
        ) : (
          <div className="w-full mt-12 flex flex-col items-center">
            <img src={bookmarkIllustration} className="w-56 max-h-48 mb-10" alt=""></img>
            <p className="text-xl font-semibold">{t('page.dashboard.bookmarks.empty.title')}</p>
            <p className="mt-4">{t('page.dashboard.bookmarks.empty.description')}</p>
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

export default DashboardBookmarks;
