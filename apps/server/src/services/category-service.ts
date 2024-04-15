import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class CategoryService {
  public static async getAll() {
    return prisma.mainCategory.findMany({
      include: {
        subCategories: {
          orderBy: {
            name: 'asc',
          },
        }
      }
    });
  }
}

class SubCategoryService {
  public static getByName(name: string) {
    return prisma.subCategory.findUnique({
      where: {
        name,
      },
    });
  }
}

export { CategoryService, SubCategoryService };
