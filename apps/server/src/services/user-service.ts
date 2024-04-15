import { UserWithPassword } from '@gotroc/types';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class UserService {
  public static update(
    id: number,
    data: {
      firstname: string;
      lastname: string;
      email: string;
    },
  ) {
    return prisma.user.update({
      where: {
        id: id,
      },
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
      },
    });
  }

  public static getByUsername(username: string): Promise<UserWithPassword | null> {
    return prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  /**
   * Get a user by email
   * @param email The email of the user
   * @param not An array of emails to exclude
   * @returns The user or null
   */
  public static getByEmail(email: string, not?: string[]): Promise<UserWithPassword | null> {
    return prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          notIn: not || [],
        },
      },
    });
  }

  public static getByIdentifier(identifier: string): Promise<UserWithPassword | null> {
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
    });
  }

  public static getById(id: number) {
    return prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  public static getAll(): Promise<UserWithPassword[]> {
    return prisma.user.findMany();
  }

  public static add(
    username: string,
    email: string,
    passwordHash: string,
  ): Promise<UserWithPassword> {
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
