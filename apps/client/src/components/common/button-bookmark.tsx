import { Button } from '@components/ui/button';
import { cn } from '@lib/utils';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { UserContext } from 'src/providers/user-context';
import { OfferService } from 'src/services/offer-service';

const ButtonBookmark = ({
  offerId,
  initState,
  className,
  variant,
  iconClassName,
}: {
  offerId: number;
  initState: boolean;
  className?: string;
  variant?: 'outline' | 'ghost';
  iconClassName?: string;
}) => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(initState);
  const [isLoading, setIsLoading] = useState(false);

  const toggleBookmark = () => {
    if (isLoading) return;
    // Redirect to login page if the user is not connected
    if (!userContext.user) return navigate('/login?from=add-favourite');
    setIsLoading(true);
    OfferService.toggleBookmark(offerId).then((response) => {
      setIsLoading(false);
      if (!response.success) throw new Error(response.message);
      const newStatus = response.data!;
      setIsBookmarked(newStatus);
      if (newStatus) toast.success('Article ajouté aux favoris');
      else toast('Article supprimé des favoris');
    });
  };

  return (
    <Button
      variant={variant || 'ghost'}
      size="icon"
      className={cn(isLoading ? 'hover:bg-neutral-100' : '', className)}
      onClick={(e) => {
        e.preventDefault();
        toggleBookmark();
      }}
    >
      {isBookmarked ? (
        <StarFilledIcon className={cn(isLoading ? 'text-neutral-400' : '', iconClassName)} />
      ) : (
        <StarIcon className={cn(isLoading ? 'text-neutral-400' : '', iconClassName)} />
      )}
    </Button>
  );
};

export default ButtonBookmark;
