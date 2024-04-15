import { FieldContext } from '@vinejs/vine/types';
import UserService from '../../services/user-service.js';
import vine from '@vinejs/vine';

/**
 * Options accepted by the unique rule
 */
type Options = {
  // Exclude some emails from the validation
  exclude?: string[]
} | undefined;

/**
 * Implementation
 */
async function uniqueEmail(value: unknown, options: Options, field: FieldContext) {
  /**
   * We do not want to deal with non-string
   * values. The "string" rule will handle the
   * the validation.
   */
  if (typeof value !== 'string') return;

  const user = await UserService.getByEmail(value, options?.exclude);
  if (user) {
    field.report('The {{ field }} is already used', 'uniqueEmail', field);
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const uniqueEmailRule = vine.createRule(uniqueEmail);
