import Header from '@components/commom/header';
import { Link, useLocation } from 'react-router-dom';
import offerSubmittedIllustration from '@assets/illustration_offer_submitted.svg';
import { useState } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '@components/ui/button';

const HomePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const offerCreated = !!Number(queryParams.get('offer_created'));

  const [submitSectionOpen, setSubmitSectionOpen] = useState(offerCreated);

  return (
    <div className="flex flex-col items-center min-h-dvh bg-neutral-50">
      <Header />
      <div className="w-full lg:w-[1000px] h-full">
        {offerCreated && submitSectionOpen && (
          <section className="relative w-full bg-background mt-8 py-10 px-12 flex justify-center rounded-xl gap-12">
            <div className="flex flex-col gap-8">
              <h1 className="font-semibold text-5xl leading-[1.2]">Annonce publiée</h1>
              <p className='text-justify'>
                Elle sera visible sur la plateforme dès qu'elle aura été validée par notre équipe.
                Vous pouvez consulter l'état de votre annonce dans la section "
                <Link to="/offers" className="font-medium underline hover:text-primary transition-colors duration-150">
                  Mes annonces
                </Link>
                ".
              </p>
            </div>
            <img src={offerSubmittedIllustration} alt="Offer submitted" className="max-h-[360px]" />
            <Button variant="ghost" size="icon" className='absolute top-2 right-2' onClick={() => {
              setSubmitSectionOpen(false);
            }}>
              <Cross2Icon />
            </Button>
          </section>
        )}
      </div>
    </div>
  );
};

export default HomePage;
