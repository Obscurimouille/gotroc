import vine from '@vinejs/vine';

const UsernameSchema = vine.string().trim().toLowerCase().minLength(3).maxLength(20).alphaNumeric({
  allowDashes: true,
  allowSpaces: false,
  allowUnderscores: false,
});

const EmailSchema = vine.string().toLowerCase().trim().email();

const PasswordSchema = vine.string().trim().minLength(8).maxLength(32);

const UserIdSchema = vine.number().positive();

export { UsernameSchema, EmailSchema, PasswordSchema, UserIdSchema };
