import UserService from '../services/user-service.js';
import { ControllerResponse } from '../types/controller-response.js';
import { handleInternalError } from './utils.js';

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
