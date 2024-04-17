import fs from 'fs';
import FileService from './file-service.js';
import { File } from '@prisma/client';
import { FileRef } from '../providers/file-reference.js';

class OfferImagesService {
  public static IMAGES_DIR = 'public/images/offers';

  public static async add(imageRef: FileRef): Promise<{ uuid: string; extension: string }> {
    const uuid = crypto.randomUUID();
    const extension = imageRef.extension;

    fs.copyFileSync(imageRef.absolutePath, this.createPath(uuid, extension));
    await FileService.add(uuid, extension);

    return { uuid, extension };
  }

  public static async get(uuid: string): Promise<File | null> {
    return await FileService.get(uuid);
  }

  public static async exists(uuid: string): Promise<boolean> {
    const file = await FileService.get(uuid);
    if (!file) return false;
    return fs.existsSync(this.createPath(uuid, file.extension));
  }

  public static async delete(uuid: string) {
    const file = await FileService.get(uuid);
    if (!file) return;
    fs.unlinkSync(this.createPath(uuid, file.extension));
  }

  public static createPath(uuid: string, extension: string) {
    return `${this.IMAGES_DIR}/${uuid}.${extension}`;
  }
}

export default OfferImagesService;
