import Header from '@components/common/header';
import { Page, PageContent } from '@components/common/layout';
import OfferResultCard from '@components/common/offer/offer-result-card';
import { useSearchParams } from 'react-router-dom';
import { OfferService } from 'src/services/offer-service';
import noResultIllustration from '@assets/illustrations/notify.svg';
import { useEffect, useState } from 'react';
import { Offer } from '@gotroc/types';
import { useTranslation } from 'react-i18next';

const SearchResultsPage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const [results, setResults] = useState<Offer[]>([]);
  const [searchParams] = useSearchParams();
  let category = searchParams.get('category');
  let subcategory = searchParams.get('subcategory');
  let text = searchParams.get('text');

  useEffect(() => {
    OfferService.search({
      mainCategoryName: category ? category.trim() : undefined,
      subCategoryName: subcategory ? subcategory.trim() : undefined,
      rawText: text ? text.trim() : undefined,
    }).then((response) => {
      if (!response.success) return;
      setResults(response.data);
      setLoading(false);
    });
  }, [category, subcategory, text]);

  return (
    <Page loading={loading}>
      <Header />
      <PageContent className="py-8 pb-16">
        {!!loading ? (
          <></>
        ) : !!results.length ? (
          <div className="">
            <h2 className="mb-4">{t('page.results.nb-results', {
              count: results.length
            })}</h2>
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
          <div className="w-full mt-16 flex flex-col items-center">
            <img src={noResultIllustration} className="w-64 mb-8" alt=""></img>
            <p className="text-xl font-semibold">{t('page.results.empty.title')}</p>
            <p className="mt-2">{t('page.results.empty.description')}</p>
          </div>
        )}
      </PageContent>
    </Page>
  );
};

export default SearchResultsPage;
