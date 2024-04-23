import { Offer } from '@gotroc/types';
import { Link } from 'react-router-dom';
import { OfferService } from 'src/services/offer-service';
import ButtonBookmark from './button-bookmark';
import { cn } from '@lib/utils';
import { useTranslation } from 'react-i18next';
import { Button } from '@components/ui/button';
import { CheckIcon, Cross2Icon, TrashIcon } from '@radix-ui/react-icons';

const OfferResultCard = ({
  validationMode,
  offer,
  hideSubCategory,
  disableBookmark,
  className,
  evaluation,
  showStatus,
  canDelete,
  onDelete,
}: {
  validationMode?: boolean;
  offer: Offer;
  className?: string;
  hideSubCategory?: boolean;
  disableBookmark?: boolean;
  showStatus?: boolean;
  canDelete?: boolean;
  onDelete?: () => void;
  evaluation?: (status: 'ACCEPT' | 'DECLINE') => void;
}) => {
  const { t } = useTranslation();
  const formattedPrice = OfferService.formatPrice(offer.price);
  const formattedDate = OfferService.formatDate(offer.createdAt, t);

  const evaluate = (event: any, status: 'ACCEPT' | 'DECLINE') => {
    event.preventDefault();
    if (evaluation) evaluation(status);
  };

  const deleteOffer = (e: any) => {
    e.preventDefault();
    if (onDelete) onDelete();
  }

  return (
    <Link
      to={`/offer/${offer.id}`}
      className={cn(
        'w-full h-36 lg:h-40 bg-background flex rounded-xl overflow-hidden shadow-md',
        showStatus ? (offer.status === 'REJECTED' ? 'bg-neutral-200' : 'group') : 'group',
        className,
      )}
    >
      <img
        src={OfferService.getImageUrl(offer.images[0].imageUUID)}
        alt="Offer"
        className={cn(
          'h-full aspect-[4/3] object-cover',
          offer.status === 'REJECTED' ? 'filter grayscale' : '',
        )}
      />
      <div className="flex-1 p-4 flex justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-xl leading-[1.2] mb-1 group-hover:text-primary transition-colors">
              {offer.title}
            </h2>
            {!!showStatus && offer.status === 'PENDING' && (
              <div className="text-xs font-medium bg-primary text-primary-foreground rounded-xl px-1.5 py-0.5">
                {t('component.offer-card.badge.pending')}
              </div>
            )}

            {!!showStatus && offer.status === 'REJECTED' && (
              <div className="text-xs font-medium bg-destructive text-destructive-foreground rounded-xl px-1.5 py-0.5">
                {t('component.offer-card.badge.rejected')}
              </div>
            )}
          </div>

          <p className="flex-1 text-sm font-semibold">{formattedPrice}</p>
          {!hideSubCategory && (
            <p className="text-xs">
              {t(
                `category.${offer.subCategory!.mainCategoryName}.subcategories.${offer.subCategoryName}`,
              )}
            </p>
          )}
          <p className="text-xs">{formattedDate}</p>
        </div>
        {validationMode ? (
          <div className="flex">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                evaluate(e, 'ACCEPT');
              }}
            >
              <CheckIcon />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                evaluate(e, 'DECLINE');
              }}
            >
              <Cross2Icon />
            </Button>
          </div>
        ) : !!canDelete ? (
          <div className="flex">
            <Button variant="ghost" size="icon" className="hover:bg-destructive/75 h-7 w-7" onClick={deleteOffer}>
              <TrashIcon />
            </Button>
          </div>
        ) : (
          !disableBookmark && (
            <div className="flex flex-col gap-2">
              <ButtonBookmark initState={!!offer.bookmarked} offerId={offer.id} />
            </div>
          )
        )}
      </div>
    </Link>
  );
};

export default OfferResultCard;
