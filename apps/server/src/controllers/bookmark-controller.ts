import { User } from '@gotroc/types';
import { ControllerResponse } from '../types/controller-response.js';
import { handleInternalError } from './utils.js';
import vine from '@vinejs/vine';
import { OfferIdSchema } from '../validators/fields-validator.js';
import BookmarkService from '../services/bookmark-service.js';

class BookmarkController {
  public static async toggle(offerId: number, user: User): Promise<ControllerResponse> {
    try {
      const schema = vine.object({
        offerId: OfferIdSchema,
      });

      const validator = vine.compile(schema);
      const field = await validator.validate({ offerId });

      const newStatus = await BookmarkService.toggle(user.id, field.offerId);
      return {
        success: true,
        data: newStatus,
      };
    } catch (error) {
      return handleInternalError(error);
    }
  }
}

export default BookmarkController;
