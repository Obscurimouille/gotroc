import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class UserService {
  public static async getAll() {
    return prisma.user.findMany();
  }

  public static async getById(id: number) {
    return prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }
}

export default UserService;
