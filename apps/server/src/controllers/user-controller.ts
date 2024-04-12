import { User } from '@gotroc/types';
import UserService from '../services/user-service.js';
import { ControllerResponse } from '../types/controller-response.js';
import { INVALID_PARAMS, NOT_FOUND, handleInternalError } from './utils.js';
import { UserIdSchema } from '../validators/fields-validator.js';
import vine, { errors } from '@vinejs/vine';

class UserController {
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
