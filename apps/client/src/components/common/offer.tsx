import { Button } from '@components/ui/button';
import { Offer as OfferType } from '@gotroc/types';
import { cn } from '@lib/utils';
import { OfferService } from 'src/services/offer.service';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { CopyIcon, Share1Icon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'sonner';
import ButtonFavorite from './button-favorite';

const Offer = ({ offer, className, ...props }: { offer: OfferType; className?: string }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const formattedDate = OfferService.formatDate(offer.date);

  const mainCategory = OfferService.getMainCategory(offer.category);
  if (!mainCategory) throw new Error('Main category not found for offer ' + offer.id);
  const category = OfferService.getSubCategory(offer.category);
  if (!category) throw new Error('Category not found for offer ' + offer.id);

  const url = window.location.href;

  const onCopy = () => {
    toast.success('Lien copié dans le presse-papier');
  };

  const shareDialog = (
    <Dialog open={isShareDialogOpen} onOpenChange={() => setIsShareDialogOpen(false)}>
      <DialogContent>
        <DialogHeader className="mb-1">
          <DialogTitle>Partager l'annonce</DialogTitle>
        </DialogHeader>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="url">Lien</Label>
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

  return (
    <div className={cn(className, 'flex flex-col gap-8')}>
      {shareDialog}
      <div className="flex justify-between items-center h-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="underline">
                Accueil
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={'/query?category=' + mainCategory.value} className="underline">
                {mainCategory.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={'/query?subcategory=' + category.value} className="underline">
                {category.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="font-semibold">{offer.title}</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsShareDialogOpen(true)}>
            <Share1Icon />
          </Button>
          <ButtonFavorite isFavorite={isFavorite} onClick={() => setIsFavorite(!isFavorite)} />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 rounded-xl overflow-hidden shadow">
          <img src={offer.images[0]} alt="Offer" className="w-full aspect-[4/3] object-cover" />
        </div>
        <div className="basis-1/3 shrink-0 grow-0 flex flex-col gap-2 bg-background rounded-xl p-6 shadow">
          <h1 className="text-2xl font-semibold line-clamp-3">{offer.title}</h1>
          <p className="font-semibold text-lg">{OfferService.formatPrice(offer.price)}</p>
          <small className="flex-1">{formattedDate}</small>
          <Button className="w-full">Faire une offre</Button>
          <Button variant="outline" className="w-full">
            Envoyer un message
          </Button>
        </div>
      </div>
      <div className="bg-background rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold">Description</h2>
        <p className="mt-3">{offer.description}</p>
      </div>
    </div>
  );
};

export default Offer;
