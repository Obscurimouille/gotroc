import Header from '@components/common/header';
import { useNavigate, useParams } from 'react-router-dom';
import { Page, PageContent } from '../common/layout';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookmarkIcon } from '@radix-ui/react-icons';
import { UserContext } from 'src/providers/user-context';
import { UserService } from 'src/services/user.service';
import { Offer, User } from '@gotroc/types';
import { OfferService } from 'src/services/offer-service';
import OfferResultCard from '@components/common/offer/offer-result-card';
import RatingSet from '@components/common/offer/rating-set';
import { RatingService } from 'src/services/rating-service';
import ProfileAvatar from '@components/common/profile-avatar';
import { Carousel, CarouselContent, CarouselItem } from '@components/ui/carousel';
import RatingCard from '@components/common/offer/rating-card';
import Footer from '@components/common/footer';

const ProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const userContext = useContext(UserContext);

  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<User | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [offers, setOffers] = useState<Offer[]>([]);

  if (!params || !params.id || isNaN(Number(params.id))) navigate('/');
  const userId = Number(params.id);

  useEffect(() => {
    // Fetch the user profile
    UserService.getById(userId).then(async (response) => {
      // If the user does not exist, redirect to the not found page
      if (!response.success) return navigate('/not-found');

      const profile = response.data;
      const isOwner = !!userContext.user && userContext.user.id === profile.id;
      setIsOwner(isOwner);
      const result = await OfferService.getUserOffers(profile.id);
      if (result.success) {
        setOffers(result.data.filter((offer: Offer) => offer.status === 'ACCEPTED'));
      }
      setProfile(profile);
      setLoading(false);
    });
  }, [userId, userContext.user, navigate]);

  return (
    <Page className="bg-neutral-100" loading={loading}>
      <Header />
      <PageContent className="py-8 gap-8">
        {!!profile && (
          <>
            <div className="bg-background shadow p-10 rounded-xl flex gap-12">
              <ProfileAvatar avatarUUID={profile.avatarUUID || undefined} />
              <div className="w-full flex-1 flex flex-col gap-4">
                <h2 className="text-2xl font-semibold">{profile.username}</h2>
                {!!profile.ratings?.length && (
                  <button className="hover:opacity-70 hover:underline">
                    <RatingSet
                      value={RatingService.getAverage(profile.ratings)}
                      nbRating={profile.ratings.length}
                      iconSize={5}
                    />
                  </button>
                )}
                <div className="flex-1"></div>
                <div className="flex items-center gap-x-0.5">
                  <BookmarkIcon className="text-foreground/50" />
                  <p className="ml-1 text-sm text-foreground/50">
                    {UserService.formatRegisterDate(profile.registerDate, t)}
                  </p>
                </div>
              </div>
            </div>

            {!!offers.length && (
              <div className="">
                <h2 className="mb-4">
                  {t('page.profile.nb-results', {
                    count: offers.length,
                  })}
                </h2>
                <div className="flex flex-col gap-6">
                  {offers.map((offer, index) => (
                    <OfferResultCard
                      key={index}
                      className="shadow"
                      offer={offer}
                      disableBookmark={isOwner}
                    />
                  ))}
                </div>
              </div>
            )}

            {!!profile.ratings?.length && (
              <div className="bg-background shadow p-6 rounded-xl flex flex-col gap-2">
                <h2 className="mb-4">
                  {t('page.profile.nb-ratings', {
                    count: profile.ratings.length,
                  })}
                </h2>
                <Carousel
                  className="w-full"
                  opts={{
                    align: 'start',
                    slidesToScroll: 'auto',
                  }}
                >
                  <CarouselContent className="">
                    {profile.ratings.map(
                      (rating, index) => (
                        <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
                          <RatingCard rating={rating} className="mx-1 mb-1 max-w-none min-w-0" />
                        </CarouselItem>
                      ),
                    )}
                  </CarouselContent>
                </Carousel>
              </div>
            )}
          </>
        )}
      </PageContent>
      <Footer />
    </Page>
  );
};

export default ProfilePage;
