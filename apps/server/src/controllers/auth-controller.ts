import UserService from '../services/user-service.js';
import { ControllerResponse } from '../types/controller-response.js';
import { EmailSchema, PasswordSchema, UsernameSchema } from '../validators/fields-validator.js';
import vine from '@vinejs/vine';
import bcrypt from 'bcrypt';
import { INVALID_CREDENTIALS, handleInternalError } from './utils.js';
import { uniqueEmailRule } from '../validators/rules/unique-email.js';
import { uniqueUsernameRule } from '../validators/rules/unique-username.js';
import jwt from 'jsonwebtoken';
import env from '../services/env-service.js';
import { User } from '@gotroc/types';

class AuthController {
  public static async register(data: {
    username: string;
    email: string;
    password: string;
  }): Promise<ControllerResponse> {
    try {
      const schema = vine.object({
        username: UsernameSchema.use(uniqueUsernameRule()),
        email: EmailSchema.use(uniqueEmailRule()),
        password: PasswordSchema,
      });

      const validator = vine.compile(schema);
      const fields = await validator.validate(data);

      const { password, ...user } = await UserService.add(
        fields.username,
        fields.email,
        this.hashPassword(fields.password),
      );
      return {
        success: true,
        message: 'User registered successfully',
        data: user,
      };
    } catch (error) {
      return handleInternalError(error);
    }
  }

  public static async login(data: {
    identifier: string;
    password: string;
  }): Promise<ControllerResponse> {
    try {
      const schema = vine.object({
        identifier: vine.string(),
        password: vine.string(),
      });

      const validator = vine.compile(schema);
      const fields = await validator.validate(data);

      const foundUser = await UserService.getByIdentifier(fields.identifier);
      if (!foundUser) return INVALID_CREDENTIALS;

      const { password, ...user } = foundUser;

      const isValidPassword = bcrypt.compareSync(fields.password, password);
      if (!isValidPassword) return INVALID_CREDENTIALS;

      const token = this.generateAuthToken(user.username);

      return {
        success: true,
        message: 'Loged in successfully',
        data: { user, token },
      };
    } catch (error) {
      return handleInternalError(error);
    }
  }

  public static authenticate(token: string): Promise<User | null> {
    return new Promise<User | null>((resolve) => {
      this.verify(token, async (err, data) => {
        if (err) return resolve(null);
        const fondUser = await UserService.getByUsername(data.username);
        if (!fondUser) return resolve(null);
        const { password, ...user } = fondUser;
        resolve(user);
      });
    });
  }

  private static verify(token: string, callback: (err: any, data: any) => void) {
    return jwt.verify(token, env.get.TOKEN_SECRET, callback);
  }

  private static hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  private static generateAuthToken(username: string) {
    return jwt.sign({ username }, env.get.TOKEN_SECRET, { expiresIn: '2h' });
  }
}

export default AuthController;
