import { Offer } from '@gotroc/types';
import { Link } from 'react-router-dom';
import { StarIcon, StarFilledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { toast } from 'sonner';
import { isToday, isYesterday } from '@lib/utils';

const OfferCard = ({ offer, ...props }: { offer: Offer }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (isFavorite) toast.error('Article supprimé des favoris');
    else toast.success('Article ajouté aux favoris');
  };

  const formatDate = (): string => {
    const date = offer.date;
    // return new Intl.DateTimeFormat('fr-FR', {
    //   year: 'numeric',
    //   month: 'long',
    //   day: '2-digit',
    // }).format(date);
    // DD/MM/YYYY
    const formattedHours = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    if (isYesterday(date)) return 'Hier à ' + formattedHours;
    if (isToday(date)) return 'Aujourd\'hui à ' + formattedHours;
    return date.toLocaleDateString('fr-FR') + ' à ' + formattedHours;
  }

  return (
    <Link to={`/offers/${offer.id}`} className="h-full flex flex-col overflow-hidden max-w-40">
      <img src={offer.images[0]} alt="Offer" className="aspect-[3/4] w-full object-cover rounded-lg" />

      <div className="flex gap-2 md:gap-8 mt-2 mb-1 items-start justify-between">
        <p className="font-normal leading-[1.2] line-clamp-2">{offer.title}</p>
        <button
          className="mt-[.1rem]"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite();
          }}
        >
          {isFavorite ? <StarFilledIcon /> : <StarIcon />}
        </button>
      </div>
      <p className="font-semibold flex-1">{offer.price} €</p>
      <small className="mt-1 text-neutral-400 text-xs">{formatDate()}</small>
    </Link>
  );
};

export default OfferCard;
