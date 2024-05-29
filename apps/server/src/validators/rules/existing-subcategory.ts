import { FieldContext } from '@vinejs/vine/types';
import vine from '@vinejs/vine';
import { SubCategoryService } from '../../services/category-service.js';

/**
 * Options accepted by the unique rule
 */
type Options = undefined;

/**
 * Implementation
 */
async function existingSubcategory(value: unknown, _: Options, field: FieldContext) {
  /**
   * We do not want to deal with non-string
   * values. The "string" rule will handle the
   * the validation.
   */
  if (typeof value !== 'string') return;

  const subCategory = await SubCategoryService.getByName(value);
  if (!subCategory) {
    field.report(`No subcategory found for ${value}`, 'existingSubcategory', field);
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const existingSubcategoryRule = vine.createRule(existingSubcategory);
