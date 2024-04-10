import { Categories } from '@data/categories';
import { Offer } from '@gotroc/types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { OfferService } from 'src/services/offer.service';
import ButtonFavorite from './button-favorite';
import { cn } from '@lib/utils';

const OfferResultCard = ({
  offer,
  hideSubCategory,
  disableFavourite,
  className,
  ...props
}: {
  offer: Offer;
  className?: string;
  hideSubCategory?: boolean;
  disableFavourite?: boolean;
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const categoryName = Categories.flatMap((c) => c.subCategories).find(
    (c) => c.value === offer.category,
  )?.name;
  if (!categoryName) throw new Error(`Category ${offer.category} not found`);
  const formattedPrice = OfferService.formatPrice(offer.price);
  const formattedDate = OfferService.formatDate(offer.date);

  return (
    <Link
      to={`/offer/${offer.id}`}
      className={cn("group w-full h-40 bg-background flex rounded-xl overflow-hidden shadow-md", className)}
    >
      <img src={offer.images[0]} alt="Offer" className="h-full aspect-[4/3] object-cover" />
      <div className="flex-1 p-4 flex justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-xl leading-[1.2] mb-1 group-hover:text-primary transition-colors">
            {offer.title}
          </h2>
          <p className="flex-1 text-sm font-semibold">{formattedPrice}</p>
          {!hideSubCategory && <p className="text-xs">{categoryName}</p>}
          <p className="text-xs">{formattedDate}</p>
        </div>
        {!disableFavourite && (
          <div className="flex flex-col gap-2">
            <ButtonFavorite isFavorite={isFavorite} onClick={() => setIsFavorite(!isFavorite)} />
          </div>
        )}
      </div>
    </Link>
  );
};

export default OfferResultCard;
