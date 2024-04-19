import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class BookmarkService {

  public static async toggle(userId: number, offerId: number): Promise<boolean> {
    const exists = await this.get(userId, offerId);

    if (exists) await this.delete(userId, offerId);
    else await this.add(userId, offerId);
    return !exists;
  }

  private static async get(userId: number, offerId: number) {
    return prisma.bookmark.findFirst({
      where: {
        userId,
        offerId,
      },
    });
  }

  private static async add(userId: number, offerId: number) {
    return prisma.bookmark.create({
      data: {
        userId,
        offerId,
      },
    });
  }

  private static async delete(userId: number, offerId: number) {
    return prisma.bookmark.delete({
      where: {
        offerId_userId: {
          offerId,
          userId,
        },
      },
    });
  }

}

export default BookmarkService;