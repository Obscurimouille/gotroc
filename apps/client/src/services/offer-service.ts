import { isYesterday, isToday } from '@lib/utils';
import { APIService } from './api-service';
import i18next, { TFunction } from 'i18next';
import { APIResponse } from '@gotroc/types';

export class OfferService {
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

  public static get(id: number) {
    return APIService.get('/offer/' + id);
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

  public static search({
    subCategoryName,
    rawText,
    mainCategoryName,
  }: {
    subCategoryName?: string;
    rawText?: string;
    mainCategoryName?: string;
  }) {
    if (subCategoryName === undefined && rawText === undefined && mainCategoryName === undefined)
      return Promise.resolve([] as any);
    let endpoint = '/offer/search?';
    if (subCategoryName) endpoint += `subCategoryName=${subCategoryName}&`;
    if (rawText) endpoint += `rawText=${rawText}&`;
    if (mainCategoryName) endpoint += `mainCategoryName=${mainCategoryName}&`;
    endpoint = endpoint.slice(0, -1);
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
