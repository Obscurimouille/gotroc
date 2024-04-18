import { User } from '@gotroc/types';
import UserService from '../services/user-service.js';
import { ControllerResponse } from '../types/controller-response.js';
import { NOT_FOUND, UNAUTHORIZED, handleInternalError } from './utils.js';
import {
  EmailSchema,
  FirstNameSchema,
  LastNameSchema,
  UserIdSchema,
  userAvatarUUIDSchema,
} from '../validators/fields-validator.js';
import vine from '@vinejs/vine';
import { uniqueEmailRule } from '../validators/rules/unique-email.js';
import UserAvatarService from '../services/user-avatar-service.js';
import path from 'path';
import { FileRef } from '../providers/file-reference.js';

const __appRoot = process.cwd();

class UserController {
  public static async getImage(uuid: string) {
    try {
      const schema = vine.object({
        uuid: userAvatarUUIDSchema,
      });

      const validator = vine.compile(schema);
      const field = await validator.validate({ uuid });

      const image = await UserAvatarService.get(field.uuid);
      if (!image) return NOT_FOUND;

      const filepath = path.join(
        __appRoot,
        UserAvatarService.createPath(image.uuid, image.extension),
      );

      return {
        success: true,
        data: { ...image, path: filepath },
      };
    } catch (error) {
      return handleInternalError(error);
    }
  }

  public static async modifyProfile(
    user: User,
    data: {
      avatarRef: FileRef | null;
      firstname: string;
      lastname: string;
      email: string;
    },
  ) {
    try {
      if (!user) return UNAUTHORIZED;

      const schema = vine.object({
        firstname: FirstNameSchema,
        lastname: LastNameSchema,
        email: EmailSchema.use(uniqueEmailRule({ exclude: [user.email] })),
      });

      const validator = vine.compile(schema);
      const fields = await validator.validate(data);

      // Check if the user exists
      if (!(await UserService.getById(user.id))) return UNAUTHORIZED;

      let avatarUUID;
      if (data.avatarRef) {
        const { uuid } = await UserAvatarService.add(data.avatarRef);
        avatarUUID = uuid;
      }

      const updatedUser = await UserService.update(user.id, { ...fields, avatarUUID });
      if (!updatedUser) return NOT_FOUND;

      const { password, ...rest } = updatedUser;
      return {
        success: true,
        message: 'Profile updated successfully',
        data: rest,
      };
    } catch (error) {
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
      return handleInternalError(error);
    }
  }
}

export default UserController;
