import { FieldContext } from '@vinejs/vine/types';
import vine from '@vinejs/vine';
import OfferService from '../../services/offer-service.js';

/**
 * Options accepted by the unique rule
 */
type Options = undefined;

/**
 * Implementation
 */
async function existingOffer(value: unknown, _: Options, field: FieldContext) {
  /**
   * We do not want to deal with non-number
   * values. The "number" rule will handle the
   * the validation.
   */
  if (typeof value !== 'number') return;

  const offer = await OfferService.getById(value);
  if (!offer) {
    field.report(`No offer found for id ${value}`, 'existingOffer', field);
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const existingOfferRule = vine.createRule(existingOffer);
