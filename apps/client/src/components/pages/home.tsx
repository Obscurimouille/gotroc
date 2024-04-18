import Header from '@components/common/header';
import { Link, useLocation } from 'react-router-dom';
import OfferSection from '@components/common/offer-section';
import { Page, PageContent } from '../common/layout';
import { useState } from 'react';
import { OfferService } from 'src/services/offer-service';
import { useTranslation } from 'react-i18next';
import { Button } from '@components/ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';
import offerSubmittedIllustration from '@assets/illustration_offer_submitted.svg';

const HomePage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const queryParams = new URLSearchParams(location.search);
  const offerCreated = !!Number(queryParams.get('offer_created'));

  const [recommendedOffers, setRecommendedOffers] = useState([]);

  useState(() => {
    OfferService.getAll().then((response) => {
      if (!response.success) return;
      setRecommendedOffers(response.data);
      setLoading(false);
    });
  });

  return (
    <Page className="bg-background" loading={loading}>
      <Header />
      <PageContent className="pt-8 gap-8">
        {offerCreated && <OfferCreatedCard />}
        <OfferSection title={t('offer-section.best-of-today')} offers={recommendedOffers} />
      </PageContent>
    </Page>
  );
};

const OfferCreatedCard = () => {
  const { t } = useTranslation();
  const [submitSectionOpen, setSubmitSectionOpen] = useState(true);

  return !submitSectionOpen ? (
    <></>
  ) : (
    <section className="relative w-full bg-background py-10 flex justify-center rounded-xl gap-12">
      <div className="flex flex-col gap-8">
        <h1 className="font-semibold text-5xl leading-[1.2]">
          {t('page.home.offer-submitted.title')}
        </h1>
        <p className="text-justify">
          {t('page.home.offer-submitted.description.before')}
          <Link
            to="/dashboard/offers"
            className="font-medium underline hover:text-primary transition-colors duration-150"
          >
            {t('page.home.offer-submitted.description.action')}
          </Link>
          {t('page.home.offer-submitted.description.after')}
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

export default HomePage;
