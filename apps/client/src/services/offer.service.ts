import { Categories } from '@data/categories';
import { Category, EnumCondition, MainCategory } from '@gotroc/types';
import { isYesterday, isToday } from '@lib/utils';

export class OfferService {
  private static conditionTranslations = {
    [EnumCondition.NEW]: 'Neuf',
    [EnumCondition.EXCELLENT]: 'Excellent',
    [EnumCondition.GOOD]: 'Bon',
    [EnumCondition.FAIR]: 'Moyen',
    [EnumCondition.DAMAGED]: 'Endommagé',
  };

  public static formatDate(date: Date, options?: { displayTime?: boolean }): string {
    // return new Intl.DateTimeFormat('fr-FR', {
    //   year: 'numeric',
    //   month: 'long',
    //   day: '2-digit',
    // }).format(date);
    // DD/MM/YYYY
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
