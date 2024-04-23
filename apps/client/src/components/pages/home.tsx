import Header from '@components/common/header';
import { Link, useLocation } from 'react-router-dom';
import OfferSection from '@components/common/offer/offer-section';
import { Page, PageContent } from '../common/layout';
import { ReactNode, useState } from 'react';
import { OfferService } from 'src/services/offer-service';
import { useTranslation } from 'react-i18next';
import { Button } from '@components/ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';
import offerSubmittedIllustration from '@assets/illustration_offer_submitted.svg';
import welcomeIllustration from '@assets/illustration_welcome.svg';

const HomePage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const queryParams = new URLSearchParams(location.search);
  const offerCreated = !!Number(queryParams.get('offer_created'));
  const justRegistered = !!Number(queryParams.get('register'));

  const [recommendedOffers, setRecommendedOffers] = useState([]);

  useState(() => {
    OfferService.getRecommendations(12).then((response) => {
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
        {justRegistered && <RegistrationCard />}
        <OfferSection title={t('offer-section.best-of-today')} offers={recommendedOffers} />
      </PageContent>
    </Page>
  );
};

const HeadingCard = ({
  title,
  description,
  image,
}: {
  title: ReactNode;
  description: ReactNode;
  image: string;
}) => {
  const [submitSectionOpen, setSubmitSectionOpen] = useState(true);

  const close = () => {
    setSubmitSectionOpen(false);
  };

  return !submitSectionOpen ? (
    <></>
  ) : (
    <section className="relative w-full bg-background py-10 flex justify-between rounded-xl gap-12">
      <div className="flex-1 shrink-0 flex flex-col gap-8">
        <h1 className="font-semibold text-5xl leading-[1.2]">{title}</h1>
        <p className="text-justify">{description}</p>
      </div>
      <div className='flex-1 flex justify-center'>
        <img src={image} alt="" className="max-h-[360px]" />
      </div>
      <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={close}>
        <Cross2Icon />
      </Button>
    </section>
  );
};

const RegistrationCard = () => {
  const { t } = useTranslation();
  return (
    <HeadingCard
      title={t('page.home.registered.title')}
      description={
        <>
          {t('page.home.registered.description.before')}
          <Link
            to="/dashboard/profile"
            className="font-medium underline hover:text-primary transition-colors duration-150"
          >
            {t('page.home.registered.description.action')}
          </Link>
          {t('page.home.registered.description.after')}
        </>
      }
      image={welcomeIllustration}
    />
  );
};

const OfferCreatedCard = () => {
  const { t } = useTranslation();
  return (
    <HeadingCard
      title={t('page.home.offer-submitted.title')}
      description={
        <>
          {t('page.home.offer-submitted.description.before')}
          <Link
            to="/dashboard/offers"
            className="font-medium underline hover:text-primary transition-colors duration-150"
          >
            {t('page.home.offer-submitted.description.action')}
          </Link>
          {t('page.home.offer-submitted.description.after')}
        </>
      }
      image={offerSubmittedIllustration}
    />
  );
};

export default HomePage;
