import Header from '@components/commom/header';
import { useLocation } from 'react-router-dom';
import OfferSection from '@components/commom/offer-section';
import { Offers } from '@data/offers';
import OfferCreatedCard from '@components/commom/offer-created-card';

const HomePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const offerCreated = !!Number(queryParams.get('offer_created'));

  return (
    <div className="flex flex-col items-center min-h-dvh bg-neutral-50">
      <Header />
      <div className="w-full flex justify-center px-4">
        <div className="w-full lg:w-[1000px] h-full">
          {offerCreated && <OfferCreatedCard />}
          <OfferSection title={"À la une aujourd'hui"} offers={Offers} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
