import { FieldContext } from '@vinejs/vine/types';
import vine from '@vinejs/vine';
import UserAvatarService from '../../services/user-avatar-service.js';

/**
 * Options accepted by the unique rule
 */
type Options = undefined;

/**
 * Implementation
 */
async function existingUserAvatar(value: unknown, options: Options, field: FieldContext) {
  /**
   * We do not want to deal with non-string
   * values. The "string" rule will handle the
   * the validation.
   */
  if (typeof value !== 'string') return;

  const image = await UserAvatarService.get(value);
  if (!image) {
    field.report(`No avatar image found for uuid ${value}`, 'existingUserAvatar', field);
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const existingUserAvatarRule = vine.createRule(existingUserAvatar);
