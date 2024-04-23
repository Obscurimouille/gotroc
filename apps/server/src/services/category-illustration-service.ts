import fs from 'fs';
import FileService from './file-service.js';
import { File } from '@prisma/client';

class CategoryIllustrationService {
  public static IMAGES_DIR = 'public/images/categories';

  public static async get(uuid: string): Promise<File | null> {
    return await FileService.get(uuid);
  }

  public static async exists(uuid: string): Promise<boolean> {
    const file = await FileService.get(uuid);
    if (!file) return false;
    return fs.existsSync(this.createPath(uuid, file.extension));
  }

  public static createPath(uuid: string, extension: string) {
    return `${this.IMAGES_DIR}/${uuid}.${extension}`;
  }
}

export default CategoryIllustrationService;
