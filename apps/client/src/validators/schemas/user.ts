import { TFunction } from 'i18next';
import { z } from 'zod';

/**
 * Schema for a new username
 * @param t - Translation function
 */
export const NewUsernameSchema = (t: TFunction<'translation', undefined>) => {
  return z
    .string({
      required_error: t('input.username.error.empty'),
    })
    .min(5, {
      message: t('input.username.error.too-short', {
        min: 5,
      }),
    })
    .max(20, {
      message: t('input.username.error.too-long', {
        min: 20,
      }),
    });
};

/**
 * Schema for a new email
 * @param t - Translation function
 */
export const NewEmailSchema = (t: TFunction<'translation', undefined>) => {
  return z
    .string({
      required_error: t('input.email.error.empty'),
    })
    .email({
      message: t('input.email.error.invalid'),
    });
};

/**
 * Schema for a new password
 * @param t - Translation function
 */
export const NewPasswordSchema = (t: TFunction<'translation', undefined>) => {
  return z
    .string({
      required_error: t('input.password.error.empty'),
    })
    .min(8, {
      message: t('input.password.error.too-short', {
        min: 8,
      }),
    })
    .max(32, {
      message: t('input.password.error.too-long', {
        min: 32,
      }),
    });
};

/**
 * Schema for a new first name
 * @param t - Translation function
 */
export const NewFirstnameSchema = (t: TFunction<'translation', undefined>) => {
  return z
    .string({
      required_error: t('input.firstname.error.empty'),
    })
    .min(2, {
      message: t('input.firstname.error.too-short', {
        min: 2,
      }),
    })
    .max(32, {
      message: t('input.firstname.error.too-long', {
        min: 32,
      }),
    });
};

/**
 * Schema for a new last name
 * @param t - Translation function
 */
export const NewLastnameSchema = (t: TFunction<'translation', undefined>) => {
  return z
    .string({
      required_error: t('input.lastname.error.empty'),
    })
    .min(2, {
      message: t('input.lastname.error.too-short', {
        min: 2,
      }),
    })
    .max(32, {
      message: t('input.lastname.error.too-long', {
        min: 32,
      }),
    });
};
