import { APIResponse, MainCategory } from '@gotroc/types';
import { APIService } from './api-service';

export class CategoryService {
  public static getAll(): Promise<APIResponse<(MainCategory & { subCategories: string[] })[]>> {
    return APIService.get('/category');
  }

  public static getIllustrationUrl(illustrationUUID: string): string {
    return `${APIService.API_URL}/category/image/${illustrationUUID}`;
  }
}
