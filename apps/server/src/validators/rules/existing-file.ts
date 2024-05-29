import { FieldContext } from '@vinejs/vine/types';
import vine from '@vinejs/vine';
import FileService from '../../services/file-service.js';

/**
 * Options accepted by the unique rule
 */
type Options = undefined;

/**
 * Implementation
 */
async function existingFile(value: unknown, _: Options, field: FieldContext) {
  /**
   * We do not want to deal with non-string
   * values. The "string" rule will handle the
   * the validation.
   */
  if (typeof value !== 'string') return;

  const image = await FileService.get(value);
  if (!image) {
    field.report(`No file found for uuid ${value}`, 'existingFile', field);
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const existingFileRule = vine.createRule(existingFile);
