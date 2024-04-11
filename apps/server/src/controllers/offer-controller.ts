import OfferService from '../services/offer-service';
import { ControllerResponse } from '../types/controller-response';
import { INVALID_PARAMS, NOT_FOUND, handleInternalError } from './utils';

class OfferController {
  public static async getAll(): Promise<ControllerResponse> {
    try {
      return {
        success: true,
        data: await OfferService.getAll(),
      };
    } catch (error) {
      return handleInternalError(error);
    }
  }

  public static async getById(id: number): Promise<ControllerResponse> {
    if (id === undefined || typeof id != 'number' || isNaN(id)) return INVALID_PARAMS;
    if (id < 0) return INVALID_PARAMS;

    try {
      const offer = await OfferService.getById(id);
      if (offer === null) return NOT_FOUND;
      const recommendations = await OfferService.getRecommendationsForOffer({ ...offer });

      return {
        success: true,
        data: { ...offer, recommendations },
      };
    } catch (error) {
      return handleInternalError(error);
    }
  }

  public static async getRecommendationsForOffer(id: number): Promise<ControllerResponse> {
    if (id === undefined || typeof id != 'number' || isNaN(id)) return INVALID_PARAMS;
    if (id < 0) return INVALID_PARAMS;

    try {
      const offer = await OfferService.getById(id);
      if (offer === null) return NOT_FOUND;

      return {
        success: true,
        data: await OfferService.getRecommendationsForOffer({ ...offer }),
      };
    } catch (error) {
      return handleInternalError(error);
    }
  }

  public static async getByAuthorId(authorId: number): Promise<ControllerResponse> {
    if (authorId === undefined || typeof authorId != 'number' || isNaN(authorId)) return INVALID_PARAMS;
    if (authorId < 0) return INVALID_PARAMS;

    try {
      return {
        success: true,
        data: await OfferService.getByAuthorId(authorId),
      };
    } catch (error) {
      return handleInternalError(error);
    }
  }

  public static async search({
    subCategoryName,
    rawText,
    mainCategoryName,
  }: {
    subCategoryName?: string;
    rawText?: string;
    mainCategoryName?: string;
  }): Promise<ControllerResponse> {
    if (subCategoryName !== undefined && typeof subCategoryName != 'string') return INVALID_PARAMS;
    if (rawText !== undefined && typeof rawText != 'string') return INVALID_PARAMS;
    if (mainCategoryName !== undefined && typeof mainCategoryName != 'string')
      return INVALID_PARAMS;
    if (subCategoryName === undefined && rawText === undefined && mainCategoryName === undefined)
      return INVALID_PARAMS;

    try {
      return {
        success: true,
        data: await OfferService.search({ subCategoryName, rawText, mainCategoryName }),
      };
    } catch (error) {
      return handleInternalError(error);
    }
  }
}

export default OfferController;
