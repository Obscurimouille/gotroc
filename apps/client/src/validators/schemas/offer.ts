import { EnumCondition } from '@gotroc/types';
import { TFunction } from 'i18next';
import { z } from 'zod';

/**
 * Schema for a new offer title
 * @param t - Translation function
 */
export const NewOfferTitleSchema = (t: TFunction<'translation', undefined>) => {
  return z
    .string({
      required_error: t('input.offer.title.error.empty'),
    })
    .trim()
    .min(5, {
      message: t('input.offer.title.error.too-short', {
        min: 5,
      }),
    })
    .max(32, {
      message: t('input.offer.title.error.too-long', {
        min: 32,
      }),
    });
};

/**
 * Schema for a new offer description
 * @param t - Translation function
 */
export const NewOfferDescriptionSchema = (t: TFunction<'translation', undefined>) => {
  return z
    .string({
      required_error: t('input.offer.description.error.empty'),
    })
    .trim()
    .min(10, {
      message: t('input.offer.description.error.too-short', {
        min: 10,
      }),
    })
    .max(1000, {
      message: t('input.offer.description.error.too-long', {
        min: 1000,
      }),
    });
};

/**
 * Schema for a new offer price
 * @param t - Translation function
 */
export const NewOfferPriceSchema = (t: TFunction<'translation', undefined>) => {
  return z.coerce
    .number({
      invalid_type_error: t('input.offer.price.error.empty'),
      required_error: t('input.offer.price.error.empty'),
    })
    .positive({
      message: t('input.offer.price.error.invalid'),
    });
};

/**
 * Schema for an offer category
 * @param t - Translation function
 */
export const OfferCategorySchema = (t: TFunction<'translation', undefined>) => {
  return z.string().min(1, {
    message: t('input.offer.category.error.empty'),
  });
};

/**
 * Schema for an offer condition
 * @param t - Translation function
 */
export const OfferConditionSchema = (t: TFunction<'translation', undefined>) => {
  return z.nativeEnum(EnumCondition, {
    required_error: t('input.offer.condition.error.empty'),
    invalid_type_error: t('input.offer.condition.error.invalid'),
  });
};
