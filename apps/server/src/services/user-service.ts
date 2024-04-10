import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class UserService {

  public static async getAll() {
    return prisma.user.findMany();
  }

}

export default UserService;