import { UserWithPassword } from '@gotroc/types';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class UserService {
  public static getByUsername(username: string): Promise<UserWithPassword | null> {
    return prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  public static getByEmail(email: string): Promise<UserWithPassword | null> {
    return prisma.user.findUnique({
      where: {
        email: email,
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
      }
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
