import OfferResultCard from '../offer-result-card';
import { Separator } from '@components/ui/separator';
import noResultIllustration from '@assets/illustration_notify.svg';
import { Link } from 'react-router-dom';
import { Offer, User } from '@gotroc/types';

const DashboardFavourites = ({ user }: { user: User }) => {
  const favouriteOffers: Offer[] = [];

  return (
    <div className="flex-1 flex flex-col gap-6 bg-background w-full rounded-xl px-8 py-7 lg:px-10 lg:py-9 shadow">
      <div className="flex items-center gap-3">
        <Separator className="flex-1 bg-neutral-300 md:hidden" />
        <h3 className="font-medium md:text-md">
          {'Vos favoris' + (favouriteOffers.length ? ` (${favouriteOffers.length})` : '')}
        </h3>
        <Separator className="flex-1 bg-neutral-300" />
      </div>
      {favouriteOffers.length ? (
        <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar gap-8">
          {favouriteOffers.map((offer, index) => (
            <OfferResultCard
              key={index}
              offer={offer}
              className="shrink-0 shadow-none border-1 border-neutral-300"
            />
          ))}
        </div>
      ) : (
        <div className="w-full mt-12 flex flex-col items-center">
          <img src={noResultIllustration} className="w-56 mb-10" alt=""></img>
          <p className="text-xl font-semibold">Aucune annonce trouvée</p>
          <p className="mt-4">
            <Link to="/create" className="underline hover:text-primary transition-colors">
              Créez votre première annonce
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardFavourites;
