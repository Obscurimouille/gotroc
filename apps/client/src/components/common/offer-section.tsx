import { Offer } from '@gotroc/types';
import OfferCard from './offer-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@components/ui/carousel';

const OfferSection = ({ title, offers, ...props }: { title: string; offers: Offer[] }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <Carousel className="w-full" opts={{
        align: "start",
        loop: true,
        slidesToScroll: 'auto'
      }}>
        <CarouselContent className='gap-4'>
          {offers.map((offer, index) => (
            <CarouselItem key={index} className='basis-1/2 xs:basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6'>
              <OfferCard offer={offer} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-2 top-1/3 shadow-lg' />
        <CarouselNext className='right-2 top-1/3 shadow-lg' />
      </Carousel>
    </div>
  );
};

export default OfferSection;
