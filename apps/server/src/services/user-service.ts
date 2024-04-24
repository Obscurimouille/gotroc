import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class UserService {
  private static alwaysInclude = {
    isAdmin: true,
    ratings: {
      include: {
        author: true,
      },
    },
  };

  public static async isEmailAvailable(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    return !user;
  }

  public static async isAdmin(userId: number): Promise<boolean> {
    const user = await prisma.admin.findFirst({
      where: {
        id: userId,
      },
    });
    return !!user;
  }

  public static update(
    id: number,
    data: {
      firstname: string;
      lastname: string;
      email: string;
      avatarUUID?: string;
    },
  ) {
    const optionalData: any = {};
    if (data.avatarUUID) optionalData.avatarUUID = data.avatarUUID;

    return prisma.user.update({
      where: {
        id: id,
      },
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        ...optionalData,
      },
    });
  }

  public static getByUsername(username: string) {
    return prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        ...this.alwaysInclude,
      },
    });
  }

  /**
   * Get a user by email
   * @param email The email of the user
   * @param not An array of emails to exclude
   * @returns The user or null
   */
  public static getByEmail(email: string, not?: string[]) {
    return prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          notIn: not || [],
        },
      },
      include: {
        ...this.alwaysInclude,
      },
    });
  }

  public static getByIdentifier(identifier: string) {
    return prisma.user.findFirst({
      where: {
        OR: [
          {
            username: identifier,
          },
          {
            email: identifier,
          },
        ],
      },
      include: {
        ...this.alwaysInclude,
      },
    });
  }

  public static getById(id: number) {
    return prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        ...this.alwaysInclude,
      },
    });
  }

  public static getAll() {
    return prisma.user.findMany({
      include: {
        ...this.alwaysInclude,
      },
    });
  }

  public static add(username: string, email: string, passwordHash: string) {
    return prisma.user.create({
      data: {
        username: username,
        email: email,
        password: passwordHash,
      },
    });
  }
}

export default UserService;
