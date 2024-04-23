import vine from '@vinejs/vine';
import { existingSubcategoryRule } from './rules/existing-subcategory.js';
import { existingOfferImageRule } from './rules/existing-offer-image.js';
import { existingUserAvatarRule } from './rules/existing-user-avatar.js';
import { existingOfferRule } from './rules/existing-offer.js';
import { existingFileRule } from './rules/existing-file.js';

export const UsernameSchema = vine.string().trim().toLowerCase().minLength(3).maxLength(20).alphaNumeric({
  allowDashes: true,
  allowSpaces: false,
  allowUnderscores: false,
});

export const FirstNameSchema = vine.string().trim().minLength(2).maxLength(32);

export const LastNameSchema = vine.string().trim().minLength(2).maxLength(32);

export const EmailSchema = vine.string().toLowerCase().trim().email();

export const PasswordSchema = vine.string().trim().minLength(8).maxLength(32);

export const UserIdSchema = vine.number().positive();

export const SubCategoryNameSchema = vine.string().trim().toLowerCase().use(existingSubcategoryRule());

export const OfferIdSchema = vine.number().positive().use(existingOfferRule());

export const OfferTitleSchema = vine.string().minLength(5).maxLength(32);

export const OfferDescriptionSchema = vine.string().minLength(5).maxLength(32);

export const OfferPriceSchema = vine.number().positive();

export const OfferImageUUIDSchema = vine.string().use(existingOfferImageRule());

export const userAvatarUUIDSchema = vine.string().use(existingUserAvatarRule());

export const FileUUIDSchema = vine.string().use(existingFileRule());