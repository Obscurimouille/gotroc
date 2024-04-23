import { cn } from '@lib/utils';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';

type Props = {
  value: number;
  nbRating?: number;
  className?: string;
  iconSize?: number;
};

const RatingSet = ({ value, nbRating, className, iconSize }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={cn('flex gap-0.5 items-center', className)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <GetStar
          key={index}
          value={value - index}
          className={cn('text-primary', `w-${iconSize || 4} h-${iconSize || 4}`)}
        />
      ))}

      {!!nbRating && (
        <span className="ml-1 text-sm font-medium">
          {t('component.rating.nb-ratings', {
            count: nbRating,
          })}
        </span>
      )}
    </div>
  );
};

const GetStar = ({ value, ...props }: { value: number; className?: string }) => {
  if (value <= 0.25) return <StarIcon {...props} />;
  if (value >= 0.75) return <StarFilledIcon {...props} />;
  return <StarSemiFilled percent={50} {...props} />;
};

const StarSemiFilled = ({ percent, className }: { percent: number; className?: string }) => {
  return (
    <div className="relative flex">
      <div className="absolute overflow-hidden" style={{ width: `${percent}%` }}>
        <StarFilledIcon className={cn('', className)} />
      </div>
      <StarIcon className={cn(className)} />
    </div>
  );
};

export default RatingSet;
