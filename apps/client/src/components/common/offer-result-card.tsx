import { Offer } from '@gotroc/types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { OfferService } from 'src/services/offer-service';
import ButtonFavorite from './button-favorite';
import { cn } from '@lib/utils';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(false);
  const formattedPrice = OfferService.formatPrice(offer.price);
  const formattedDate = OfferService.formatDate(offer.createdAt, t);
  console.log('OfferResultCard', offer);
  return (
    <Link
      to={`/offer/${offer.id}`}
      className={cn("group w-full h-40 bg-background flex rounded-xl overflow-hidden shadow-md", className)}
    >
      <img src={OfferService.getImageUrl(offer.images[0].imageUUID)} alt="Offer" className="h-full aspect-[4/3] object-cover" />
      <div className="flex-1 p-4 flex justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-xl leading-[1.2] mb-1 group-hover:text-primary transition-colors">
            {offer.title}
          </h2>
          <p className="flex-1 text-sm font-semibold">{formattedPrice}</p>
          {!hideSubCategory && <p className="text-xs">{t(`category.${offer.subCategory!.mainCategoryName}.subcategories.${offer.subCategoryName}`)}</p>}
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
