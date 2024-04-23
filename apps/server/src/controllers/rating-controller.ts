import { ControllerResponse } from '../types/controller-response.js';
import { handleInternalError, success } from './utils.js';
import RatingService from '../services/rating-service.js';

class RatingController {
  public static async getAll(): Promise<ControllerResponse> {
    try {
      const ratings = await RatingService.getAll();

      return success(ratings);
    } catch (error) {
      return handleInternalError(error);
    }
  }
}

export default RatingController;
