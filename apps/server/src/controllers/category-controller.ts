import { CategoryService } from '../services/category-service.js';
import { ControllerResponse } from '../types/controller-response.js';
import { handleInternalError } from './utils.js';

class CategoryController {
  public static async getAll(): Promise<ControllerResponse> {
    try {
      const mainCategories = await CategoryService.getAll();
      return {
        success: true,
        data: mainCategories.map((mainCategory) => ({
          ...mainCategory,
          subCategories: mainCategory.subCategories.map((subCategory) => subCategory.name),
        })),
      };
    } catch (error) {
      return handleInternalError(error);
    }
  }
}

export default CategoryController;
