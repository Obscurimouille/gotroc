import { Button } from '@components/ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import offerSubmittedIllustration from '@assets/illustration_offer_submitted.svg';
import { useState } from 'react';

const OfferCreatedCard = () => {
  const [submitSectionOpen, setSubmitSectionOpen] = useState(true);

  return (
    !submitSectionOpen ? <></> : <section className="relative w-full bg-background py-10 flex justify-center rounded-xl gap-12">
      <div className="flex flex-col gap-8">
        <h1 className="font-semibold text-5xl leading-[1.2]">Annonce publiée</h1>
        <p className="text-justify">
          Elle sera visible sur la plateforme dès qu'elle aura été validée par notre équipe. Vous
          pouvez consulter l'état de votre annonce dans la section "
          <Link
            to="/dashboard/offers"
            className="font-medium underline hover:text-primary transition-colors duration-150"
          >
            Mes annonces
          </Link>
          ".
        </p>
      </div>
      <img src={offerSubmittedIllustration} alt="Offer submitted" className="max-h-[360px]" />
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2"
        onClick={() => {
          setSubmitSectionOpen(false);
        }}
      >
        <Cross2Icon />
      </Button>
    </section>
  );
};

export default OfferCreatedCard;
