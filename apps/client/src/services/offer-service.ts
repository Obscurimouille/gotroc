import { isYesterday, isToday } from '@lib/utils';
import { APIService } from './api-service';
import i18next, { TFunction } from 'i18next';
import { APIResponse, EnumCondition, EnumOfferSortBy, OfferFilters, OfferSearchQueryParams } from '@gotroc/types';

export class OfferService {
  public static delete(offerId: number) {
    return APIService.delete('/offer/' + offerId);
  }

  public static create({
    title,
    price,
    description,
    subCategoryName,
    images,
  }: {
    title: string;
    price: number;
    description: string;
    subCategoryName: string;
    images: File[];
  }) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price.toString());
    formData.append('description', description);
    formData.append('subCategoryName', subCategoryName);

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    return APIService.formData('/offer', formData);
  }

  public static getAll() {
    return APIService.get('/offer');
  }

  public static accept(offerId: number) {
    return APIService.post('/offer/accept/' + offerId);
  }

  public static reject(offerId: number) {
    return APIService.post('/offer/reject/' + offerId);
  }

  public static getPending() {
    return APIService.get('/offer/pending');
  }

  public static get(id: number) {
    return APIService.get('/offer/' + id);
  }

  public static getRecent(limit: number) {
    return APIService.get('/offer/recent?limit=' + limit);
  }

  public static getRecommendations(limit: number) {
    return APIService.get('/offer/recommendations?limit=' + limit);
  }

  public static getRecommendationsForOffer(id: number) {
    return APIService.get('/offer/recommendations/' + id);
  }

  public static toggleBookmark(offerId: number): Promise<APIResponse<boolean>> {
    return APIService.post(`/offer/${offerId}/bookmark/toggle`);
  }

  public static getBookmarks() {
    return APIService.get('/offer/bookmarked');
  }

  public static createSearchUrlParams(
    query: OfferSearchQueryParams,
    filters?: Partial<OfferFilters>,
  ) {
    let params = '';
    if (query.subCategory) params += `subCategory=${query.subCategory}&`;
    if (query.rawText) params += `rawText=${query.rawText}&`;
    if (query.category) params += `category=${query.category}&`;
    params += this.createFilterUrlParams(filters || {});
    if (params.endsWith('&')) params = params.slice(0, -1);
    return params;
  }

  public static createFilterUrlParams(filters: Partial<OfferFilters>) {
    let params = '';
    if (filters.priceMin !== undefined) params += `priceMin=${filters.priceMin}&`;
    if (filters.priceMax !== undefined) params += `priceMax=${filters.priceMax}&`;
    if (filters.mileageMin !== undefined) params += `mileageMin=${filters.mileageMin}&`;
    if (filters.mileageMax !== undefined) params += `mileageMax=${filters.mileageMax}&`;
    if (filters.sortBy) params += `sortBy=${filters.sortBy}&`;
    if (filters.condition?.length)
      params += `condition=${filters.condition.join(',').toLowerCase()}&`;
    return params.slice(0, -1);
  }

  public static parseSearchParams(searchParams: URLSearchParams): {
    query: OfferSearchQueryParams;
    filters: OfferFilters;
  } {
    const category = searchParams.get('category');
    const subCategory = searchParams.get('subCategory');
    const rawText = searchParams.get('rawText');
    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');
    const condition = searchParams.get('condition');
    const mileageMin = searchParams.get('mileageMin');
    const mileageMax = searchParams.get('mileageMax');
    const sortBy = searchParams.get('sortBy');

    const query: OfferSearchQueryParams = {
      category: category ? category.trim() : undefined,
      subCategory: subCategory ? subCategory.trim() : undefined,
      rawText: rawText ? rawText.trim() : undefined,
    };
    const filters: OfferFilters = {
      priceMin: priceMin ? parseInt(priceMin) : undefined,
      priceMax: priceMax ? parseInt(priceMax) : undefined,
      mileageMin: mileageMin ? parseInt(mileageMin) : undefined,
      mileageMax: mileageMax ? parseInt(mileageMax) : undefined,
      condition: condition ? (condition.toUpperCase().split(',') as EnumCondition[]) : [],
      sortBy: (sortBy as EnumOfferSortBy | undefined) || EnumOfferSortBy.DATE_DESC,
    };
    return { query, filters };
  }

  public static search(query: OfferSearchQueryParams, filters?: Partial<OfferFilters>) {
    if (
      query.subCategory === undefined &&
      query.rawText === undefined &&
      query.category === undefined
    )
      return Promise.resolve([] as any);
    const endpoint = '/offer/search?' + this.createSearchUrlParams(query, filters || {});
    return APIService.get(endpoint);
  }

  public static getUserOffers(userId: number) {
    return APIService.get('/offer/user/' + userId);
  }

  public static getImageUrl(imageUUID: string): string {
    return `${APIService.API_URL}/offer/image/${imageUUID}`;
  }

  /**
   * Format an offer date
   * @param date The date to format
   * @param t The translation function
   * @param options Options
   * @returns The formatted date
   * @example OfferService.formatDate(new Date(), t, { displayTime: true }) // "Aujourd'hui à 14:30"
   */
  public static formatDate(
    date: Date,
    t: TFunction<'translation', undefined>,
    options?: { displayTime?: boolean },
  ): string {
    const currentLocale = i18next.language;
    date = new Date(date);
    const formattedHours = date.toLocaleTimeString(currentLocale, {
      hour: '2-digit',
      minute: '2-digit',
    });
    if (isYesterday(date)) {
      return t('function.format.date.' + (options?.displayTime ? 'yesterday-at' : 'yesterday'), {
        time: formattedHours,
      });
    }
    if (isToday(date)) {
      return t('function.format.date.' + (options?.displayTime ? 'today-at' : 'today'), {
        time: formattedHours,
      });
    }
    return (
      date.toLocaleDateString(currentLocale) + (options?.displayTime ? ' à ' + formattedHours : '')
    );
  }

  public static formatPrice(price: number, options?: Intl.NumberFormatOptions): string {
    return price.toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: price % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
      ...options,
    });
  }
}
