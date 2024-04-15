import vine, { SimpleMessagesProvider, errors } from '@vinejs/vine';
import dotenv from 'dotenv';

type RequiredEnv = {
  PORT: number;
  CLIENT_URL: string;
  DATABASE_URL: string;
  TOKEN_SECRET: string;
  NODE_ENV: 'development' | 'production';
};

const DEFAULT_ENV: Partial<RequiredEnv> = {
  PORT: 3000,
  NODE_ENV: 'development',
};

export default class EnvService {
  private static variables: RequiredEnv & NodeJS.ProcessEnv;

  private static validationSchema = vine.object({
    PORT: vine.number().positive(),
    CLIENT_URL: vine.string(),
    DATABASE_URL: vine.string(),
    TOKEN_SECRET: vine.string(),
    NODE_ENV: vine.string().in(['development', 'production']),
  });

  private static messagesProvider = new SimpleMessagesProvider({
    required: '{{ field }} is required',
  });

  public static async init(): Promise<void> {
    dotenv.config();

    try {
      this.variables = process.env as RequiredEnv & NodeJS.ProcessEnv;

      const validator = vine.compile(this.validationSchema);
      const validVariables = (await validator.validate(
        { ...DEFAULT_ENV, ...process.env },
        {
          messagesProvider: this.messagesProvider,
        },
      )) as RequiredEnv & NodeJS.ProcessEnv;

      this.variables = { ...this.variables, ...validVariables };
    }
    catch (error) {
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
    return this.variables;
  }
}
