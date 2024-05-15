import { Separator } from '@components/ui/separator';
import { useState } from 'react';
import { Offer, User } from '@gotroc/types';
import { useTranslation } from 'react-i18next';
import Chart from 'react-apexcharts';
import { OfferService } from 'src/services/offer-service';
import { ApexOptions } from 'apexcharts';
import { UserService } from 'src/services/user.service';

const AdminDashboardStats = ({ user }: { user: User }) => {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [offerChart, setOfferChart] = useState<{
    options: ApexOptions;
    series: ApexOptions['series'];
  }>();
  const [userChart, setUserChart] = useState<{
    options: ApexOptions;
    series: ApexOptions['series'];
  }>();

  useState(() => {
    OfferService.getAll().then((response) => {
      if (!response.success) return;
      const offers = response.data as Offer[];
      setOffers(offers);
      const categoryUsage = getCategoryUsage(offers);
      setOfferChart({
        options: {
          labels: Object.keys(categoryUsage).map((key) => t(`category.${key}.title`)),
        },
        series: Object.values(categoryUsage),
      });
      UserService.getAll().then((response) => {
        if (!response.success) return;
        const users = response.data as User[];
        setUsers(users);
        setUserChart({
          options: {
            xaxis: {
              categories: Object.keys(getRegistrationsPerYear(users)),
            },
            yaxis: {
              forceNiceScale: true,
            },
          },
          series: [
            {
              data: Object.values(getRegistrationsPerYear(users)),
            },
          ],
        });
        setLoaded(true);
      });
    });
  });

  const getCategoryUsage = (offers: Offer[]): { [key: string]: number } => {
    const categoryUsage: { [key: string]: number } = {};
    for (const offer of offers) {
      if (!categoryUsage[offer.subCategory!.mainCategoryName]) {
        categoryUsage[offer.subCategory!.mainCategoryName] = 0;
      }
      categoryUsage[offer.subCategory!.mainCategoryName]++;
    }
    return categoryUsage;
  };

  const getRegistrationsPerYear = (users: User[]): { [key: number]: number } => {
    const registrationsPerYear: { [key: number]: number } = {};
    for (const user of users) {
      const year = getUserRegistrationYear(user);
      if (!registrationsPerYear[year]) {
        registrationsPerYear[year] = 0;
      }
      registrationsPerYear[year]++;
    }
    return registrationsPerYear;
  };

  const getUserRegistrationYear = (user: User): number => {
    return new Date(user.registerDate).getFullYear();
  };

  const getAvarageRating = (users: User[]): number => {
    const ratedUsers = users.filter((user) => user.ratings && user.ratings.length > 0);
    let rating = 0;
    for (const user of ratedUsers) {
      if (!user.ratings || user.ratings.length === 0) continue;
      console.log(rating);
      rating += user.ratings.reduce((acc, rating) => acc + rating.value, 0) / user.ratings.length;
    }
    return rating / ratedUsers.length;
  };

  const getAverageOfferCount = (users: User[]): number => {
    return offers.length / users.length;
  };

  return (
    <div className="flex-1 flex flex-col gap-6 w-full px-8 py-7 lg:px-10 lg:py-9">
      {!loaded || (
        <>
          <div className="flex flex-col gap-8 bg-background p-6 rounded-xl">
            <h1 className="text-xl font-semibold">
              {t('page.admin-dashboard.stats.offers.title')}
            </h1>
            <div className="flex">
              <Chart
                options={offerChart!.options}
                series={offerChart!.series}
                type="donut"
                width="500"
              />
              <div className="flex flex-1 flex-col gap-2 items-center">
                <h2 className="text-4xl font-semibold">
                  {t('page.admin-dashboard.stats.offers.total')}
                </h2>
                <p className="text-3xl">{offers.length}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 bg-background p-6 pb-10 rounded-xl">
            <h1 className="text-xl font-semibold">{t('page.admin-dashboard.stats.users.title')}</h1>
            <div className="flex mt-4">
              <div className="flex basis-1/3 flex-col gap-2 items-center">
                <h2 className="text-4xl font-semibold">
                  {t('page.admin-dashboard.stats.users.total')}
                </h2>
                <p className="text-3xl">{users.length}</p>
              </div>
              <ul className="flex flex-1 flex-col gap-2">
                <li>
                  {t('page.admin-dashboard.stats.users.averageRating') + ' '}
                  <span className="font-semibold">{getAvarageRating(users).toFixed(2)}/5</span>
                </li>
                <li>
                  {t('page.admin-dashboard.stats.users.avarageActiveOffers') + ' '}
                  <span className="font-semibold">{getAverageOfferCount(users).toFixed(2)}</span>
                </li>
                <li>Inscriptions par an :</li>
                <li>
                  <Chart
                    options={userChart!.options}
                    series={userChart!.series}
                    type="bar"
                    width="500"
                  />
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboardStats;
