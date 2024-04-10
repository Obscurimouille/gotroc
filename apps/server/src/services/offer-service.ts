import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class OfferService {

  public static async getAll() {
    return prisma.offer.findMany();
  }

}

export default OfferService;