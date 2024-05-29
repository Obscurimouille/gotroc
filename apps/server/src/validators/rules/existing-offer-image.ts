import { FieldContext } from '@vinejs/vine/types';
import vine from '@vinejs/vine';
import OfferImagesService from '../../services/offer-images-service.js';

/**
 * Options accepted by the unique rule
 */
type Options = undefined;

/**
 * Implementation
 */
async function existingOfferImage(value: unknown, _: Options, field: FieldContext) {
  /**
   * We do not want to deal with non-string
   * values. The "string" rule will handle the
   * the validation.
   */
  if (typeof value !== 'string') return;

  const image = await OfferImagesService.get(value);
  if (!image) {
    field.report(`No offer image found for uuid ${value}`, 'existingOfferImage', field);
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const existingOfferImageRule = vine.createRule(existingOfferImage);
