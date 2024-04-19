import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class OfferService {
  private static constantInclude: any = {
    subCategory: true,
    images: {
      orderBy: {
        position: 'asc',
      },
      select: {
        position: true,
        imageUUID: true,
      },
    },
  };

  public static async add({
    title,
    price,
    description,
    subCategoryName,
    images,
    authorId,
  }: {
    title: string;
    price: number;
    description: string;
    subCategoryName: string;
    images: string[];
    authorId: number;
  }) {
    return prisma.offer.create({
      data: {
        title,
        price,
        description,
        subCategoryName,
        images: {
          create: images.map((uuid, index) => ({
            imageUUID: uuid,
            position: index,
          })),
        },
        authorId,
      },
    });
  }

  public static async getAll(options?: {
    limit?: number;
    excludeUserId?: number;
    userId?: number;
  }) {
    const optionalInclude: any = {};
    if (options?.userId) {
      optionalInclude['bookmarks'] = {
        where: {
          userId: options.userId,
        },
        select: {
          userId: true,
        },
      };
    }
    return prisma.offer.findMany({
      where: {
        authorId: {
          notIn: options?.excludeUserId ? [options.excludeUserId] : [],
        },
      },
      include: {
        ...this.constantInclude,
        ...optionalInclude,
      },

      take: options?.limit,
    });
  }

  public static async getRecommendationsForOffer(
    offer: { id: number; subCategoryName: string },
    options?: { userId?: number },
  ) {
    const optionalInclude: any = {};
    if (options?.userId) {
      optionalInclude['bookmarks'] = {
        where: {
          userId: options.userId,
        },
        select: {
          userId: true,
        },
      };
    }
    return prisma.offer.findMany({
      take: 8,
      where: {
        AND: [
          {
            id: {
              not: offer.id,
            },
          },
          {
            subCategoryName: offer.subCategoryName,
          },
        ],
      },
      include: {
        ...this.constantInclude,
        ...optionalInclude,
      },
    });
  }

  public static async getById(id: number, options?: { userId?: number }) {
    console.log('options', options)
    const optionalInclude: any = {};
    if (options?.userId) {
      optionalInclude['bookmarks'] = {
        where: {
          userId: options.userId,
        },
        select: {
          userId: true,
        },
      };
    }
    return prisma.offer.findUnique({
      where: {
        id: id,
      },
      include: {
        ...this.constantInclude,
        ...optionalInclude,
      },
    });
  }

  public static async getByAuthorId(authorId: number, options?: { userId?: number }) {
    const optionalInclude: any = {};
    if (options?.userId) {
      optionalInclude['bookmarks'] = {
        where: {
          userId: options.userId,
        },
        select: {
          userId: true,
        },
      };
    }
    return prisma.offer.findMany({
      where: {
        authorId: authorId,
      },
      include: {
        ...this.constantInclude,
      },
    });
  }

  public static async search(
    {
      subCategoryName,
      rawText,
      mainCategoryName,
    }: {
      subCategoryName?: string;
      rawText?: string;
      mainCategoryName?: string;
    },
    options?: { userId?: number },
  ) {
    const optionalInclude: any = {};
    if (options?.userId) {
      optionalInclude['bookmarks'] = {
        where: {
          userId: options.userId,
        },
        select: {
          userId: true,
        },
      };
    }
    return prisma.offer.findMany({
      where: {
        OR: [
          rawText
            ? {
                title: {
                  contains: rawText,
                },
              }
            : {},

          subCategoryName
            ? {
                subCategoryName: subCategoryName,
              }
            : {},

          mainCategoryName
            ? {
                subCategory: {
                  mainCategory: {
                    name: mainCategoryName,
                  },
                },
              }
            : {},
        ],
      },
      include: {
        ...this.constantInclude,
        ...optionalInclude,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

export default OfferService;
