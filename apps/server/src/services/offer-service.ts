import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class OfferService {
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
          }))
        },
        authorId,
      }
    })
  }

  public static async getAll() {
    return prisma.offer.findMany({
      include: {
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
          select: {
            position: true,
            imageUUID: true,
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
          select: {
            position: true,
            imageUUID: true,
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
          select: {
            position: true,
            imageUUID: true,
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
          select: {
            position: true,
            imageUUID: true,
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
