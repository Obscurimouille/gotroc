import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class OfferService {
  public static async getAll() {
    return prisma.offer.findMany({
      include: {
        subCategory: true,
        images: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
  }

  public static async getRecommendationsForOffer(offer: { id: number; subCategoryName: string }) {
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
        subCategory: true,
        images: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
  }

  public static async getById(id: number) {
    return prisma.offer.findUnique({
      where: {
        id: id,
      },
      include: {
        subCategory: true,
        images: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
  }

  public static async getByAuthorId(authorId: number) {
    return prisma.offer.findMany({
      where: {
        authorId: authorId,
      },
      include: {
        subCategory: true,
        images: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
  }

  public static async search({
    subCategoryName,
    rawText,
    mainCategoryName,
  }: {
    subCategoryName?: string;
    rawText?: string;
    mainCategoryName?: string;
  }) {
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
        subCategory: true,
        images: {
          orderBy: {
            position: 'asc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

export default OfferService;
