import { Offer } from '@gotroc/types';
import { Link } from 'react-router-dom';
import { StarIcon, StarFilledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { toast } from 'sonner';
import { OfferService } from 'src/services/offer-service';
import { useTranslation } from 'react-i18next';

const OfferCard = ({ offer, ...props }: { offer: Offer }) => {
  const { t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(false);
  const formattedDate = OfferService.formatDate(offer.createdAt, t, { displayTime: true });
  const mainImage = offer.images[0];
  const mainImageSrc = mainImage ? (OfferService.getImageUrl(mainImage.imageUUID)) : '/images/placeholder.png';

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (isFavorite) toast('Article supprimé des favoris');
    else toast.success('Article ajouté aux favoris');
  };

  return (
    <Link to={`/offer/${offer.id}`} className="group h-full flex flex-col overflow-hidden max-w-44">
      <img
        src={mainImageSrc}
        alt="Offer"
        className="aspect-[5/6] w-full object-cover rounded-lg"
      />

      <div className="flex gap-2 md:gap-8 mt-2 mb-1 items-start justify-between">
        <h3 className="font-normal leading-[1.2] line-clamp-2 group-hover:text-primary transition-colors">{offer.title}</h3>
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
      <p className="font-semibold flex-1">{OfferService.formatPrice(offer.price)}</p>
      <small className="mt-1 text-neutral-400 text-xs">{formattedDate}</small>
    </Link>
  );
};

export default OfferCard;
