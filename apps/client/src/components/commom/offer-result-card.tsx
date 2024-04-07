import { Offer } from '@gotroc/types';
import { Link } from 'react-router-dom';

const OfferResultCard = ({ offer, ...props }: { offer: Offer }) => {
  return (
    <Link
      to={`/offers/${offer.id}`}
      className="w-full bg-background mt-8 py-10 px-12 flex justify-between rounded-xl gap-12"
    >
      <div className="flex gap-8">
        <img src={offer.images[0]} alt="Offer" className="w-48 h-48 object-cover rounded-lg" />
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-3xl leading-[1.2]">{offer.title}</h1>
          <p className="text-lg">{offer.description}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-semibold">{offer.price} €</p>
        <p className="text-lg">{offer.category}</p>
      </div>
    </Link>
  );
};

export default OfferResultCard;
