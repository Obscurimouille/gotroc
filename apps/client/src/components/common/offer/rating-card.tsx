import { Rating } from '@gotroc/types';
import { cn } from '@lib/utils';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { OfferService } from 'src/services/offer-service';

const RatingCard = ({ rating, className }: { rating: Rating; className?: string }) => {
  const { t } = useTranslation();
  if (!rating.author) return null;

  return (
    <div
      className={cn(
        'min-w-[240px] max-w-[360px] p-3 shadow bg-neutral-50 rounded-lg flex-col gap-2',
        className,
      )}
    >
      <div className="flex items-center gap-1">
        <Link
          to={`/user/${rating.author.id}`}
          className="min-w-0 truncate hover:underline font-medium"
        >
          {rating.author.username}
        </Link>
        <StarFilledIcon className="shrink-0 w-4 h-4 text-primary" />
        <span className="font-medium">{rating.value.toFixed(1)}</span>
        <div className="flex-1"></div>
        <span className="ml-4 text-sm text-neutral-600">
          {OfferService.formatDate(rating.datetime, t)}
        </span>
      </div>
      {rating.note && <p className="line-clamp-3">{rating.note}</p>}
    </div>
  );
};

export default RatingCard;
