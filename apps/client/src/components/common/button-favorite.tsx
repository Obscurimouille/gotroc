import { Button } from '@components/ui/button';
import { cn } from '@lib/utils';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

const ButtonFavorite = ({
  isFavorite,
  onClick,
  className,
  iconClassName,
}: {
  isFavorite: boolean;
  className?: string;
  iconClassName?: string;
  onClick: () => void;
}) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(className)}
      onClick={(e) => {
        e.preventDefault();
        onClick();
        if (isFavorite) toast('Article retiré des favoris');
        else toast.success('Article ajouté aux favoris');
      }}
    >
      {isFavorite ? (
        <StarFilledIcon className={cn(iconClassName)} />
      ) : (
        <StarIcon className={cn(iconClassName)} />
      )}
    </Button>
  );
};

export default ButtonFavorite;
