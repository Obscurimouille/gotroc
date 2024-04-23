import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class RatingService {
  public static getAll() {
    return prisma.rating.findMany({});
  }
}

export default RatingService;
