import UserService from '../services/user-service';
import { ControllerResponse } from '../types/controller-response';
import { INTERNAL_ERROR } from './utils';

class UserController {
  public static async getAll(): Promise<ControllerResponse> {
    try {
      return {
        success: true,
        data: await UserService.getAll(),
      };
    } catch (error) {
      console.error(error);
      return INTERNAL_ERROR;
    }
  }
}

export default UserController;