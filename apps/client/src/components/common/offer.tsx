import { Button } from '@components/ui/button';
import { Offer as OfferType } from '@gotroc/types';
import { cn } from '@lib/utils';
import { OfferService } from 'src/services/offer-service';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { CopyIcon, Share1Icon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'sonner';
import ButtonBookmark from './button-bookmark';
import { useTranslation } from 'react-i18next';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@components/ui/carousel';

const Offer = ({ offer, className, ...props }: { offer: OfferType; className?: string }) => {
  const { t } = useTranslation();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [, setCurrentImage] = useState(0);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isImagesDialogOpen, setIsImagesDialogOpen] = useState(false);
  const formattedDate = OfferService.formatDate(offer.createdAt, t);
  const url = window.location.href;

  useEffect(() => {
    if (!carouselApi) return;

    setCurrentImage(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on('select', () => {
      setCurrentImage(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  const onCopy = () => {
    toast.success(t('message.clipboard.link'));
  };

  const openImagesDialog = (index?: number) => {
    setIsImagesDialogOpen(true);
  };

  const shareDialog = (
    <Dialog open={isShareDialogOpen} onOpenChange={() => setIsShareDialogOpen(false)}>
      <DialogContent>
        <DialogHeader className="mb-1">
          <DialogTitle>{t('modal.share-offer.title')}</DialogTitle>
        </DialogHeader>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="url">{t('modal.share-offer.link')}</Label>
          <div className="w-full items-center flex gap-2">
            <Input id="url" type="text" className="flex-1" value={url} readOnly />
            <CopyToClipboard text={url} onCopy={() => onCopy()}>
              <Button type="submit" variant="outline" size="icon">
                <CopyIcon />
              </Button>
            </CopyToClipboard>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const imagesDialog = (
    <Dialog open={isImagesDialogOpen} onOpenChange={() => setIsImagesDialogOpen(false)}>
      <DialogContent className="min-w-[80dvw] m-0 px-16">
        <Carousel
          setApi={setCarouselApi}
          className="w-full h-full"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent className="h-[75dvh] w-full ml-0">
            {offer.images.map((image, index) => (
              <CarouselItem key={index} className="w-full h-full px-0 flex flex-col">
                <img
                  src={OfferService.getImageUrl(image.imageUUID)}
                  alt="Offer"
                  className="h-full w-full object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="" />
          <CarouselNext className="" />
        </Carousel>
      </DialogContent>
    </Dialog>
  );

  const breadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="underline">
            {t('common.home')}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href={'/search?category=' + offer.subCategory!.mainCategoryName}
            className="underline"
          >
            {t(`category.${offer.subCategory!.mainCategoryName}.title`)}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href={'/search?subcategory=' + offer.subCategoryName}
            className="underline"
          >
            {t(
              `category.${offer.subCategory!.mainCategoryName}.subcategories.${offer.subCategoryName}`,
            )}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="font-semibold">{offer.title}</BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  return (
    <div className={cn(className, 'flex flex-col gap-8')}>
      {shareDialog}
      {imagesDialog}

      <div className="flex justify-between items-center h-4">
        {breadcrumb}
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsShareDialogOpen(true)}>
            <Share1Icon />
          </Button>
          <ButtonBookmark initState={!!offer.bookmarked} offerId={offer.id} />
        </div>
      </div>

      <div className="flex gap-6">
        <div
          className={cn(
            'flex-1 relative rounded-xl overflow flex gap-2',
            offer.images.length === 1 ? 'aspect-[3/2]' : 'aspect-[2/1]',
          )}
        >
          <button
            className="absolute bg-background top-4 right-4 text-sm h-6 px-3 flex items-center rounded-xl hover:bg-slate-100 shadow-md cursor-pointer"
            onClick={() => openImagesDialog()}
          >
            {t('page.offer.see-images')}
          </button>
          <InteractiveImage
            image={OfferService.getImageUrl(offer.images[0].imageUUID)}
            onClick={() => openImagesDialog()}
          />
          {offer.images.length > 1 && (
            <div className="flex-1 flex flex-col gap-2">
              {
                <InteractiveImage
                  image={OfferService.getImageUrl(offer.images[1].imageUUID)}
                  onClick={() => openImagesDialog()}
                />
              }
              {offer.images.length > 2 && (
                <InteractiveImage
                  image={OfferService.getImageUrl(offer.images[2].imageUUID)}
                  onClick={() => openImagesDialog()}
                />
              )}
            </div>
          )}
        </div>
        <div className="basis-[32%] shrink-0 grow-0 flex flex-col gap-2 bg-background rounded-xl p-6 shadow">
          <h1 className="text-2xl font-semibold line-clamp-3">{offer.title}</h1>
          <p className="font-semibold text-lg">{OfferService.formatPrice(offer.price)}</p>
          <small className="flex-1">{formattedDate}</small>
          <Button className="w-full">{t('page.offer.send-offer')}</Button>
          <Button variant="outline" className="w-full">
            {t('page.offer.send-message')}
          </Button>
        </div>
      </div>
      <div className="bg-background rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold">{t('page.offer.description')}</h2>
        <p className="mt-3">{offer.description}</p>
      </div>
    </div>
  );
};

const InteractiveImage = ({
  image,
  onClick,
  className,
}: {
  image: string;
  className?: string;
  onClick: () => void;
}) => {
  return (
    <button
      className={cn(className, 'flex-1 rounded-xl overflow-hidden shadow')}
      onClick={() => onClick()}
    >
      <img src={image} alt="Offer" className="object-cover w-full h-full" />
    </button>
  );
};

export default Offer;
