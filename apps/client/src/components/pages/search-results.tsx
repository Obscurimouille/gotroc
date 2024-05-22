import Header from '@components/common/header';
import { Page, PageContent } from '@components/common/layout';
import OfferResultCard from '@components/common/offer/offer-result-card';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { OfferService } from 'src/services/offer-service';
import noResultIllustration from '@assets/illustrations/notify.svg';
import { useEffect, useState } from 'react';
import { Offer, OfferFilters, OfferSearchQueryParams } from '@gotroc/types';
import { useTranslation } from 'react-i18next';
import Footer from '@components/common/footer';
import SearchFilterBar from '@components/common/offer/filter-bar';
import { Button } from '@components/ui/button';
import { CheckIcon } from '@radix-ui/react-icons';
import { CategoryService } from 'src/services/category-service';

const SearchResultsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [results, setResults] = useState<Offer[]>([]);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<OfferFilters>();
  const [query, setQuery] = useState<OfferSearchQueryParams>();

  // Optional filters
  const [enableConditionFilter, setEnableConditionFilter] = useState<boolean>(false);
  const [enableMileageFilter, setEnableMileageFilter] = useState<boolean>(false);

  useEffect(() => {
    if (!searchParams.toString()) return navigate('/');
    setLoading(true);
    const { query, filters } = OfferService.parseSearchParams(searchParams);
    setQuery(query);
    setFilters(filters);

    // Disable condition filter if sub category uses it
    if (query.subCategory) {
      CategoryService.getSub(query.subCategory).then((response) => {
        if (!response.success) return;
        setEnableConditionFilter(!!response.data!.requiresCondition);
        setEnableMileageFilter(!!response.data!.requiresMileage);
      });
    }

    OfferService.search(query, filters).then((response) => {
      if (!response.success) return;
      setResults(response.data);
      setLoading(false);
    });
  }, [searchParams, navigate]);

  // Apply search filters
  const applyFilters = () => {
    if (!filters) return;
    navigate(`/search?${OfferService.createSearchUrlParams(query!, filters)}`, { replace: true });
  };

  return (
    <Page loading={loading}>
      <Header />
      <PageContent className="py-8 pb-16">
        <div className="flex items-center justify-between">
          {!!filters && (
            <SearchFilterBar
              defaultFilters={filters}
              getFilters={setFilters}
              enableCondition={enableConditionFilter}
              enableMileage={enableMileageFilter}
            />
          )}
          <Button className="gap-1.5" onClick={applyFilters}>
            <CheckIcon className="h-4 w-4"></CheckIcon>
            {t('page.results.apply-filters')}
          </Button>
        </div>
        {!!loading ? (
          <></>
        ) : !!results.length ? (
          <div className="mt-6">
            <h2 className="mb-4">
              {t('page.results.nb-results', {
                count: results.length,
              })}
            </h2>
            <div className="flex flex-col gap-6">
              {results.map((offer, index) => (
                <OfferResultCard
                  key={index}
                  offer={offer}
                  hideSubCategory={searchParams.has('subCategory')}
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
      <Footer />
    </Page>
  );
};

export default SearchResultsPage;
