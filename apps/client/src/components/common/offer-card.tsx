import { Offer } from '@gotroc/types';
import { Link } from 'react-router-dom';
import { OfferService } from 'src/services/offer-service';
import { useTranslation } from 'react-i18next';
import ButtonBookmark from './button-bookmark';

const OfferCard = ({ offer, ...props }: { offer: Offer }) => {
  const { t } = useTranslation();
  const formattedDate = OfferService.formatDate(offer.createdAt, t, { displayTime: true });
  const mainImage = offer.images[0];
  const mainImageSrc = mainImage
    ? OfferService.getImageUrl(mainImage.imageUUID)
    : '/images/placeholder.png';

  return (
    <Link to={`/offer/${offer.id}`} className="group h-full flex flex-col overflow-hidden max-w-44">
      <img src={mainImageSrc} alt="Offer" className="aspect-[5/6] w-full object-cover rounded-lg" />

      <div className="flex gap-2 md:gap-8 mt-2 mb-1 items-start justify-between">
        <h3 className="font-normal leading-[1.2] line-clamp-2 group-hover:text-primary transition-colors">
          {offer.title}
        </h3>
        <ButtonBookmark className='p-0 m-0 h-auto w-auto mt-[.1rem] hover:bg-transparent hover:text-neutral-500' offerId={offer.id} initState={!!offer.bookmarked} />
      </div>
      <p className="font-semibold flex-1">{OfferService.formatPrice(offer.price)}</p>
      <small className="mt-1 text-neutral-400 text-xs">{formattedDate}</small>
    </Link>
  );
};

export default OfferCard;
