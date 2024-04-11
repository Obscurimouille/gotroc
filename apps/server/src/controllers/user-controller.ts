import UserService from '../services/user-service';
import { ControllerResponse } from '../types/controller-response';
import { handleInternalError } from './utils';

class UserController {
  public static async getAll(): Promise<ControllerResponse> {
    try {
      return {
        success: true,
        data: await UserService.getAll(),
      };
    } catch (error) {
      return handleInternalError(error);
    }
  }
}

export default UserController;
