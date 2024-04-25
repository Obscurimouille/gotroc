import { APIResponse, MainCategory, SubCategory } from '@gotroc/types';
import { APIService } from './api-service';

export class CategoryService {
  public static getSub(name: string): Promise<APIResponse<SubCategory>> {
    return APIService.get('/category/sub?name=' + name);
  }

  public static getAll(): Promise<APIResponse<(MainCategory & { subCategories: SubCategory[] })[]>> {
    return APIService.get('/category');
  }

  public static getIllustrationUrl(illustrationUUID: string): string {
    return `${APIService.API_URL}/category/image/${illustrationUUID}`;
  }
}
