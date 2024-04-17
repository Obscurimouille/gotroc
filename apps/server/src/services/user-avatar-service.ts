import { File } from '@prisma/client';
import FileService from './file-service.js';
import { FileRef } from '../providers/file-reference.js';
import fs from 'fs';

class UserAvatarService {

  public static IMAGES_DIR = 'public/images/avatars';

  public static async get(uuid: string): Promise<File | null> {
    return await FileService.get(uuid);
  }

  public static async add(imageRef: FileRef): Promise<{ uuid: string; extension: string }> {
    const uuid = crypto.randomUUID();
    const extension = imageRef.extension;

    fs.copyFileSync(imageRef.absolutePath, this.createPath(uuid, extension));
    await FileService.add(uuid, extension);

    return { uuid, extension };
  }

  public static createPath(uuid: string, extension: string) {
    return `${this.IMAGES_DIR}/${uuid}.${extension}`;
  }

}

export default UserAvatarService;
