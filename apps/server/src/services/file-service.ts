import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class FileService {

  public static add(uuid: string, extension: string) {
    return prisma.file.create({
      data: {
        uuid,
        extension,
      },
    });
  }

  public static async exists(uuid: string): Promise<boolean> {
    return (await prisma.file.findUnique({
      where: {
        uuid,
      },
    })) !== null;
  }

  public static async get(uuid: string) {
    return prisma.file.findUnique({
      where: {
        uuid,
      },
    });
  }

  public static delete(uuid: string) {
    return prisma.file.delete({
      where: {
        uuid,
      },
    });
  }

}

export default FileService;