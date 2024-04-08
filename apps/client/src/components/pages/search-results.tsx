import Header from '@components/common/header';
import { Page, PageContent } from '@components/common/layout';
import OfferResultCard from '@components/common/offer-result-card';
import { Offers } from '@data/offers';
import { Offer } from '@gotroc/types';
import { useSearchParams } from 'react-router-dom';
import { OfferService } from 'src/services/offer.service';
import notResultIllustration from '@assets/illustration_notify.svg';

type OfferFilter = (offer: Offer) => boolean;

const getFilter = (searchParams: URLSearchParams): OfferFilter => {
  let category = searchParams.get('category');
  let subcategory = searchParams.get('subcategory');
  let text = searchParams.get('text');

  if (category != null) category = category.trim() || null;
  if (subcategory != null) subcategory = subcategory.trim() || null;
  if (text != null) text = text.trim() || null;

  if (!text && !category && !subcategory) return () => true;

  if (subcategory)
    return (offer: Offer) =>
      offer.category === subcategory &&
      (text ? offer.title.toLowerCase().includes(text.toLowerCase()) : true);

  if (category)
    return (offer: Offer) =>
      OfferService.getMainCategory(offer.category)?.value === category &&
      (text ? textFilter(offer, text) : true);

  if (text) return (offer: Offer) => textFilter(offer, text!);
  return () => true;
};

const textFilter = (offer: Offer, text: string): boolean => {
  const subcategory = OfferService.getSubCategory(offer.category);
  if (!subcategory) return false;
  return (
    offer.title.toLowerCase().includes(text.toLowerCase()) ||
    subcategory.name.toLowerCase().includes(text.toLowerCase())
  )
}

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const filter: OfferFilter = getFilter(searchParams);
  const results = Offers.filter(filter).sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <Page>
      <Header />
      <PageContent className="pt-8">
        {!!results.length ? (
          <div className="">
            <h2 className="mb-4">{results.length} annonces</h2>
            <div className="flex flex-col gap-6">
              {results.map((offer, index) => (
                <OfferResultCard
                  key={index}
                  offer={offer}
                  hideSubCategory={searchParams.has('subcategory')}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full mt-8 flex flex-col items-center">
            <img src={notResultIllustration} className="w-64 mb-8" alt=""></img>
            <p className="text-xl font-semibold">Désolé, nous n'avons rien trouvé</p>
            <p className="mt-2">Nous vous invitons à modifier vos critères de recherche</p>
          </div>
        )}
      </PageContent>
    </Page>
  );
};

export default SearchResultsPage;
