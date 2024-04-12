import { Categories } from '@data/categories';
import { Category, EnumCondition, MainCategory } from '@gotroc/types';
import { isYesterday, isToday } from '@lib/utils';
import { APIService } from './api-service';
import { OfferImage } from '@gotroc/types/dist/types/offer';

export class OfferService {
  public static getAll() {
    return APIService.get('/offer');
  }

  public static get(id: number) {
    return APIService.get('/offer/' + id);
  }

  public static getRecommendationsForOffer(id: number) {
    return APIService.get('/offer/recommendations/' + id);
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

  public static getImageUrl(image: OfferImage): string {
    return `${APIService.API_URL}/images/offers/${image.uuid}.${image.extension}`;
  }

  private static conditionTranslations = {
    [EnumCondition.NEW]: 'Neuf',
    [EnumCondition.EXCELLENT]: 'Excellent',
    [EnumCondition.GOOD]: 'Bon',
    [EnumCondition.FAIR]: 'Moyen',
    [EnumCondition.DAMAGED]: 'Endommagé',
  };

  public static formatDate(date: Date, options?: { displayTime?: boolean }): string {
    date = new Date(date);
    const formattedHours = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    if (isYesterday(date)) return 'Hier' + (options?.displayTime ? ' à ' + formattedHours : '');
    if (isToday(date)) return "Aujourd'hui" + (options?.displayTime ? ' à ' + formattedHours : '');
    return date.toLocaleDateString('fr-FR') + (options?.displayTime ? ' à ' + formattedHours : '');
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

  public static getMainCategory(categoryValue: string): MainCategory | undefined {
    return Categories.find((c) => {
      return c.subCategories.some((subCategorie) => subCategorie.value === categoryValue);
    });
  }

  public static getSubCategory(categoryValue: string): Category | undefined {
    return Categories.flatMap((c) => c.subCategories).find((c) => c.value === categoryValue);
  }

  public static formatCondition(condition: EnumCondition): string {
    return this.conditionTranslations[condition] || '';
  }
}
