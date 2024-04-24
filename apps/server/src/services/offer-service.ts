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
    author: {
      include: {
        ratings: {
          include: {
            author: true
          },
          orderBy: {
            datetime: 'desc',
          },
        }
      }
    }
  };

  public static async delete(offerId: number) {
    return prisma.offer.delete({
      where: {
        id: offerId,
      },
    });
  }

  public static async validate(offerId: number, status: 'ACCEPTED' | 'REJECTED') {
    return prisma.offer.update({
      where: {
        id: offerId,
      },
      data: {
        status: status,
      },
    });
  }

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

  public static async getPopular(options?: { excludeUserId?: number; limit?: number; }) {
    return prisma.offer.findMany({
      where: {
        authorId: {
          notIn: options?.excludeUserId ? [options.excludeUserId] : [],
        },
        status: 'ACCEPTED',
      },
      include: {
        ...this.constantInclude,
      },
      take: options?.limit,
      orderBy: {
        bookmarks: {
          _count: 'desc',
        },
      },
    });
  }

  public static async getAll(options?: {
    status?: 'PENDING' | 'ACCEPTED' | 'REJECTED';
    limit?: number;
    excludeUserId?: number;
    userId?: number;
  }) {
    const optionalWhere: any = {};
    if (options?.status) {
      optionalWhere['status'] = {
        equals: options.status,
      };
    }
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
        ...optionalWhere,
      },
      include: {
        ...this.constantInclude,
        ...optionalInclude,
      },
      take: options?.limit,
      orderBy: {
        createdAt: 'desc',
      },
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
            status: 'ACCEPTED',
          },
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
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  public static async getById(id: number, options?: { userId?: number }) {
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
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  public static async getBookmarked(userId: number) {
    return prisma.offer.findMany({
      where: {
        bookmarks: {
          some: {
            userId: userId,
          },
        },
        status: 'ACCEPTED',
      },
      include: {
        ...this.constantInclude,
      },
      orderBy: {
        createdAt: 'desc',
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
        status: 'ACCEPTED',
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
