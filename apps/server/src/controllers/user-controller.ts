import { User } from '@gotroc/types';
import UserService from '../services/user-service.js';
import { ControllerResponse } from '../types/controller-response.js';
import { INVALID_PARAMS, NOT_FOUND, handleInternalError } from './utils.js';
import {
  EmailSchema,
  FirstNameSchema,
  LastNameSchema,
  UserIdSchema,
} from '../validators/fields-validator.js';
import vine, { errors } from '@vinejs/vine';
import { uniqueEmailRule } from '../validators/rules/unique-email.js';

class UserController {
  public static async modifyProfile(
    user: User,
    data: {
      firstname: string;
      lastname: string;
      email: string;
    },
  ) {
    try {
      if (!user) return NOT_FOUND;
      console.log('user', user);

      const schema = vine.object({
        firstname: FirstNameSchema,
        lastname: LastNameSchema,
        email: EmailSchema.use(uniqueEmailRule({ exclude: [user.email] })),
      });

      const validator = vine.compile(schema);
      const fields = await validator.validate(data);

      const updatedUser = await UserService.update(user.id, fields);
      if (!updatedUser) return NOT_FOUND;

      const { password, ...rest } = updatedUser;
      return {
        success: true,
        message: 'Profile updated successfully',
        data: rest,
      };
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return { ...INVALID_PARAMS, errors: error.messages };
      }
      return handleInternalError(error);
    }
  }

  public static async getAll(): Promise<ControllerResponse> {
    try {
      const users: User[] = (await UserService.getAll()).map((user) => {
        const { password, ...rest } = user;
        return rest;
      });

      return {
        success: true,
        data: users,
      };
    } catch (error) {
      return handleInternalError(error);
    }
  }

  public static async getById(id: number): Promise<ControllerResponse> {
    try {
      const schema = vine.object({
        id: UserIdSchema,
      });

      const validator = vine.compile(schema);
      const field = await validator.validate({ id });

      const user = await UserService.getById(field.id);
      if (!user) return NOT_FOUND;

      const { password, ...rest } = user;
      return {
        success: true,
        data: rest,
      };
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return { ...INVALID_PARAMS, errors: error.messages };
      }
      return handleInternalError(error);
    }
  }
}

export default UserController;
