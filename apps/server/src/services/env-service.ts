import vine, { SimpleMessagesProvider, errors } from '@vinejs/vine';
import dotenv from 'dotenv';

type RequiredEnv = {
  PORT: number;
  DATABASE_URL: string;
  TOKEN_SECRET: string;
};

export default class EnvService {
  private static validationSchema = vine.object({
    PORT: vine.number().positive().optional(),
    CLIENT_URL: vine.string(),
    DATABASE_URL: vine.string(),
    TOKEN_SECRET: vine.string(),
  });

  private static messagesProvider = new SimpleMessagesProvider({
    required: '{{ field }} is required',
  });

  public static async init(): Promise<void> {
    dotenv.config();

    try {
      const validator = vine.compile(this.validationSchema);
      await validator.validate(process.env, {
        messagesProvider: this.messagesProvider,
      });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        console.error(
          'Invalid environment variables:',
          error.messages.map((m: any) => m.message),
        );
      } else console.error('Error while validating environment variables:', error);
      process.exit(1);
    }
  }

  public static get get(): RequiredEnv & NodeJS.ProcessEnv {
    return process.env as RequiredEnv & NodeJS.ProcessEnv;
  }
}
