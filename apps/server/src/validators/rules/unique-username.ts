import { FieldContext } from '@vinejs/vine/types';
import UserService from '../../services/user-service.js';
import vine from '@vinejs/vine';

/**
 * Options accepted by the unique rule
 */
type Options = undefined;

/**
 * Implementation
 */
async function uniqueUsername(value: unknown, options: Options, field: FieldContext) {
  /**
   * We do not want to deal with non-string
   * values. The "string" rule will handle the
   * the validation.
   */
  if (typeof value !== 'string') return;

  const user = await UserService.getByUsername(value);

  if (user) {
    field.report('The {{ field }} is already used', 'uniqueUsername', field);
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const uniqueUsernameRule = vine.createRule(uniqueUsername)